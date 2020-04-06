import ProductItem from 'app/src/screens/home/product-item';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Api from '../../../api/api';
import {appColor, font} from '../../../constants/app.constant';
import {sizeFont, sizeHeight, sizeWidth} from '../../../helpers/size.helper';
import {getProfile} from '../../../helpers/storage.helper';
import ProductToolbar from '../product-toolbar';

const LIMIT = 10;
class ProduceByCategoryScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    const {category} = props.navigation.state.params;
    this.state = {
      products: [],
      loading: true,
      data: [],
      fetching_from_server: false,
      // For now, we can not get category_id from HomeScreen. We need confirm with API creator and refactor this code later!
      params: {
        page: 1,
        limit: LIMIT,
        month: category.month,
        year: category.year,
        categoryRoot: category.categoryRoot,
        category_id: category.id, // should get category_id here!
      },
      role: null,
    };
  }

  componentDidMount = async () => {
    this.setState({loading: true});
    const {params} = this.state;
    try {
      const profile = await getProfile();
      const response = await Api.productByCategory(params, profile.type);
      this.setState(state => {
        return {
          data: [...state.data, ...response.data],
          role: profile.type,
        };
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  shouldLoadMore = () => {
    const {data} = this.state;
    return data.length % LIMIT === 0;
  };

  loadMoreData = async () => {
    if (!this.shouldLoadMore()) {
      return;
    }
    this.setState({fetching_from_server: true});
    const {params, role} = this.state;
    let requestParams = {
      ...params,
      ...{page: params.page + 1},
    };

    try {
      const response = await Api.productByCategory(requestParams, role);
      if (response.data.length === 0) {
        return;
      }
      this.setState(state => {
        return {
          data: [...state.data, ...response.data],
          params: requestParams,
        };
      });
    } finally {
      this.setState({
        fetching_from_server: false,
      });
    }
  };

  renderItem = (item, index) => {
    return (
      <ProductItem
        style={styles.item}
        item={item.item}
        key={`PRODUCT_ITEM_${index}`}
      />
    );
  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Tải thêm</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {data} = this.state;
    const {category} = this.props.navigation.state.params;
    return (
      <View style={[styles.container]}>
        <ProductToolbar />
        <View style={styles.center}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.bodyContainer}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              contentContainerStyle={styles.list}
              style={styles.flatList}
              keyExtractor={(item, index) => index}
              data={data}
              renderItem={this.renderItem}
              ListFooterComponent={this.renderFooter.bind(this)}
              numColumns={3}
            />
          )}
        </View>
      </View>
    );
  }
}

export default ProduceByCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    marginTop: sizeHeight(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    color: appColor.primary,
    fontSize: sizeFont(16),
    fontFamily: font.bold,
    textTransform: 'uppercase',
  },
  line: {
    width: sizeWidth(48),
    height: 2,
    marginVertical: sizeHeight(10),
    backgroundColor: appColor.primary,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 10,
  },
  flatList: {
    width: '100%',
    paddingHorizontal: sizeWidth(6),
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: appColor.button,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  item: {
    marginHorizontal: sizeWidth(7),
  },
  list: {},
});
