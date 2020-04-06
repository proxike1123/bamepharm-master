import {accountType} from 'app/src/constants/app.constant';
import React, {Component} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {
  loadCart,
  navigateToPage,
  resetPage,
} from '../../../actions/cart.action';
import Api from '../../../api/api';
import BackIcon from '../../../components/common/back-icon';
import LoadingIndicator from '../../../components/common/loading-indicator';
import Text from '../../../components/common/text';
import Toolbar from '../../../components/common/toolbar';
import {appColor, font} from '../../../constants/app.constant';
import {sizeFont, sizeWidth} from '../../../helpers/size.helper';
import CategoryItem from '../../home/category-item';
import ProductList from '../../home/product-list';
import ProductToolbar from '../product-detail-toolbar';

class ProductByMonthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: 0,
      loading: true,
      data: null,
      params: this.props.navigation.getParam('month'),
      isSaleAccount: this.props.profile.profile.type === accountType.sale,
    };
  }

  componentDidMount = async () => {
    const {params, isSaleAccount} = this.state;
    const {profile} = this.props;
    try {
      let rootCategories = await Api.rootCategories(profile.profile.type);
      rootCategories = (rootCategories || []).map(it => it[0]);
      const requestParams = {
        month: params.month,
        year: params.year,
        parent_id: rootCategories[0] && rootCategories[0].category_id,
      };
      const data = await Api.productsOfMonth(requestParams, isSaleAccount);
      this.setState({
        loading: false,
        rootCategories,
        selectedType: rootCategories[0] && rootCategories[0].category_id,
        data: data[0],
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  changeCategory = async categoryId => {
    const {params, isSaleAccount} = this.state;
    this.setState({selectedType: categoryId, data: {}, loading: true});
    try {
      const requestParams = {
        month: params.month,
        year: params.year,
        parent_id: categoryId,
      };
      const data = await Api.productsOfMonth(requestParams, isSaleAccount);
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
        {(rootCategories || []).map(type => (
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

  navigateToProductList = category => {
    this.props.navigation.navigate('ProductByCategory', {category});
  };

  render() {
    const {data, loading, selectedType, params} = this.state;
    return (
      <View style={styles.container}>
        <ProductToolbar
          title={`Sản phẩm tháng ${params.month} ${params.year}`}
        />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {this.renderProductTypes()}
            <ScrollView bounces={false}>
              {Object.keys(data || {}).map(it => {
                return (
                  <ProductList
                    products={data[it].data}
                    onSeeAll={() =>
                      this.navigateToProductList({
                        categoryRoot: selectedType,
                        name: it,
                        id: data[it].category_id,
                        ...params,
                      })
                    }
                    rows={1}
                    title={it}
                    key={it}
                  />
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
    );
  }

  selectCategory = category => {
    this.setState({
      selectedType: category.type,
    });
  };

  renderCategory = ({item, index}) => {
    const {selectedType} = this.state;

    return (
      <CategoryItem
        onSelectCategory={this.selectCategory}
        selected={selectedType === item.type}
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
)(ProductByMonthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
  },
  title: {
    color: 'white',
    fontSize: sizeFont(18),
    fontFamily: font.bold,
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
  },
  activeText: {
    fontFamily: font.bold,
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
