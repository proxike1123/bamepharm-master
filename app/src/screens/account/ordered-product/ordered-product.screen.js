import {navigateToPage, resetPage} from 'app/src/actions/nav.action';
import Api from 'app/src/api/api';
import BackIcon from 'app/src/components/common/back-icon';
import List from 'app/src/components/common/list_view';
import LoadingIndicator from 'app/src/components/common/loading-indicator';
import Text from 'app/src/components/common/text';
import Toolbar from 'app/src/components/common/toolbar';
import {appColor, font} from 'app/src/constants/app.constant';
import {sizeFont} from 'app/src/helpers/size.helper';
import ProductItem from 'app/src/screens/home/product-item';
import styleBase from 'app/src/styles/base';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

class OrderedProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      loadingRefresh: false,
    };

    this.page = 1;
    this.isLoadMore = true;
  }

  componentDidMount = async () => {
    this.handleFetchOrderedProducts({});
  };

  handleFetchOrderedProducts = async ({page = 1}) => {
    try {
      let response = await Api.getOrderedProducts({page});
      if (response) {
        this.isLoadMore = !!response.next_page_url;
      }
      if (response && response.data) {
        this.setState({data: response.data});
      }
    } catch (e) {}
    this.setState({loading: false});
  };

  loadMore = async () => {
    if (!this.isLoadMore) {
      return;
    }
    ++this.page;
    let response = await Api.getOrderedProducts({
      page: this.page,
    });
    this.setState({
      data: [...this.state.data, ...response.data],
    });
  };

  onRefresh = async () => {
    this.page = 1;
    this.isLoadMore = true;
    this.setState({loading: true, loadingRefresh: true});
    await this.handleFetchOrderedProducts({});
    this.setState({loadingRefresh: false});
  };

  renderItem = (item, index) => {
    return <ProductItem item={item} key={`PRODUCT_${index}`} />;
  };

  render() {
    const {data, loading, loadingRefresh} = this.state;
    return (
      <View style={styles.container}>
        <Toolbar
          left={<BackIcon />}
          center={<Text style={styles.title}>Sản phẩm đã mua</Text>}
        />
        <View style={styles.body}>
          <List
            renderItem={this.renderItem}
            styles={[styleBase.p_10_horizontal, styleBase.p_10_vertical]}
            numColumns={3}
            onEndReachedThreshold={2}
            onEndReach={this.loadMore}
            refreshing={loadingRefresh}
            onRefresh={this.onRefresh}
            dataSources={data}
          />
          {loading && (
            <LoadingIndicator
              style={[styleBase.fullParent, styleBase.fillParent]}
            />
          )}
          {!loading && (!Array.isArray(data) || data.length === 0) && (
            <View
              style={[
                styleBase.fullParent,
                styleBase.fillParent,
                styleBase.center,
              ]}>
              <Text
                style={[
                  styleBase.text16,
                  styleBase.textGray29,
                  styleBase.textMedium,
                ]}>
                Không tìm thấy sản phẩm đã mua nào.
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default connect(null, {resetPage, navigateToPage})(OrderedProductScreen);

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
  body: {
    flex: 1,
  },
});
