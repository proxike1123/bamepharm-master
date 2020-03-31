import React, {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Picker,
} from 'react-native';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import Text from '../../components/common/text';
import {connect} from 'react-redux';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import {
  saveSelectedAgency,
  getProfile,
  getSelectedAgency,
  removeSelectedAgency,
} from '../../helpers/storage.helper';
import {font, appColor} from '../../constants/app.constant';
import Api from '../../api/api';
import HomeToolbar from './home-toolbar';
import CategoryItem from './category-item';
import ProductList from './product-list';
import LoadingIndicator from '../../components/common/loading-indicator';
import {loadCart} from '../../actions/cart.action';
import MonthList from './month-list';
import {accountType} from 'app/src/constants/app.constant';

import {
  PopupAgencySelection,
  ConfirmOrderPopup,
} from '../../components/popup/index';
import CartButton from 'app/src/components/cart-button/cart';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: null,
      selectedAgency: '',
      loading: true,
      data: {},
      productTypes: [],
      rootCategories: [],
      agencySelectionDisplayed: false,
    };
  }

  componentDidMount = async () => {
    try {
      const profile = await getProfile();
      this.setState(({agencySelectionDisplayed}) => {
        return {
          agencySelectionDisplayed:
            profile.type === accountType.sale && !agencySelectionDisplayed,
        };
      });

      let rootCategories = await Api.rootCategories(profile.type);
      rootCategories = rootCategories.map(it => it[0]);
      this.setState({
        selectedType: rootCategories[0].category_id,
        rootCategories,
      });
      const data = await Api.homeProducts(
        rootCategories[0].category_id,
        profile.type,
      );
      this.setState({
        loading: false,
        data: data[0],
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  changeCategory = async categoryId => {
    this.setState({selectedType: categoryId, data: {}, loading: true});
    const {profile} = this.props.profile;
    try {
      const data = await Api.homeProducts(categoryId, profile.type);
      // const childCategory = await Api.getChildCategory(categoryId);
      // const products = await Api.productByCategory(
      //   childCategory[0].category_id,
      //   profile.type,
      // );
      this.setState({
        loading: false,
        data: data[0],
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  renderProductTypes = () => {
    const {selectedType, rootCategories} = this.state;
    return (
      <View style={styles.tabs}>
        {rootCategories.map(type => (
          <TouchableOpacity
            key={type.category_id}
            onPress={() => this.changeCategory(type.category_id)}
            style={styles.tab}>
            <Text
              style={
                selectedType === type.category_id
                  ? styles.activeText
                  : styles.name
              }>
              {type.name}
            </Text>
            {selectedType === type.category_id && <View style={styles.line} />}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  render(): ReactNode {
    const {profile} = this.props;
    const {data, loading, agencySelectionDisplayed} = this.state;
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <HomeToolbar navigateToPage={this.props.navigateToPage} />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {this.renderProductTypes()}
            <ScrollView bounces={false}>
              {Object.keys(data).map(it => {
                return (
                  <ProductList
                    products={data[it].data}
                    onSeeAll={() =>
                      this.navigateToProductList({
                        name: it,
                        id: data[it].category_id,
                      })
                    }
                    rows={1}
                    title={it}
                    key={it}
                  />
                );
              })}
              <MonthList />
            </ScrollView>
          </>
        )}
        {profile.profile.type === accountType.sale ? (
          <PopupAgencySelection
            onPressConfirm={this.onPressConfirm}
            isVisible={agencySelectionDisplayed}
          />
        ) : null}
        <ConfirmOrderPopup
          onPressOrder={this.onPressOrder}
          onPressReset={this.onPressReset}
          isVisible={false}
          agencyName="Đại Lý A"
        />
      </View>
    );
  }

  onPressConfirm = async selectedAgency => {
    await saveSelectedAgency(selectedAgency);
    this.setState({agencySelectionDisplayed: false});
  };

  onPressOrder = () => {};

  onPressReset = () => {};

  selectCategory = category => {
    this.setState({
      selectedType: category.type,
    });
  };

  navigateToProductList = category => {
    this.props.navigateToPage('ProductByCategory', {category});
  };

  renderCategory = ({item, index}) => {
    const {selectedType} = this.state;

    return (
      <CategoryItem
        onSelectCategory={this.selectCategory}
        selected={selectedType == item.type}
        key={index.toString()}
        item={item}
      />
    );
  };
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  {resetPage, navigateToPage, loadCart},
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
  },
  title: {
    color: 'white',
    fontSize: sizeFont(18),
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  label: {
    fontSize: sizeFont(13),
    color: '#6D6D72',
    paddingHorizontal: sizeWidth(12),
    paddingTop: sizeWidth(14),
    backgroundColor: '#EFEFF3',
    paddingBottom: sizeWidth(10),
  },
  row: {
    paddingHorizontal: sizeWidth(12),
    height: sizeWidth(44),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: sizeFont(15),
    flex: 1,
    fontFamily: font.regular,
  },
  version: {
    fontSize: sizeFont(15),
    color: '#A0B1B7',
    marginLeft: sizeWidth(12),
    fontFamily: font.regular,
  },
  separator: {
    backgroundColor: '#95989A',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: sizeWidth(12),
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    height: sizeWidth(44),
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: appColor.blur,
    fontFamily: font.medium,
    fontWeight: '500',
  },
  activeText: {
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: sizeWidth(3),
    backgroundColor: appColor.primary,
  },
});
