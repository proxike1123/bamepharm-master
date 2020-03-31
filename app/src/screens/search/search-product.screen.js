import {navigateToPage} from 'app/src/actions/nav.action';
import Api from 'app/src/api/api';
import BackIcon from 'app/src/components/common/back-icon';
import List from 'app/src/components/common/list_view';
import LoadingIndicator from 'app/src/components/common/loading-indicator';
import SearchInput from 'app/src/components/common/search-input';
import {accountType, appColor} from 'app/src/constants/app.constant';
import {sizeWidth} from 'app/src/helpers/size.helper';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import ProductItem from 'app/src/screens/home/product-item';
import styleBase from 'app/src/styles/base';
import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import SearchToolbar from './search-toolbar';
import lodash from 'lodash';

class SearchProductScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: false,
    };

    this.page = 1;
    this.isLoadMore = true;
    this.keyword = '';
    this.timer = null;
  }

  async componentDidMount() {}

  handleSearchProduct = async ({page = 1, initData = []}) => {
    let response;
    let data;

    if (!this.isLoadMore) return;

    try {
      if (this.props.profile.type === accountType.agency) {
        response = await Api.searchProduct({page, keyword: this.keyword});
      } else {
        response = await Api.searchProductSale({page, keyword: this.keyword});
      }

      if (response && response.data) {
        data = response.data;
        let products = [...initData, ...response.data];
        this.setState({products});
      }
    } catch (e) {}

    if (this.state.loading) {
      this.setState({loading: false});
    }

    return data;
  };

  async loadMore() {
    this.page = this.page + 1;

    let response = await this.handleSearchProduct({
      page: this.page,
      initData: this.state.products,
    });
    if (!lodash.isArray(response) || response.length === 0) {
      this.isLoadMore = false;
    }
  }

  handleChangeText = text => {
    this.page = 1;
    this.isLoadMore = true;
    this.keyword = text;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (!text) {
      this.setState({products: []});
    } else {
      this.timer = setTimeout(() => {
        this.setState({loading: true, products: []}, () =>
          this.handleSearchProduct({}),
        );
      }, 250);
    }
  };

  renderItem = (item, index) => {
    return <ProductItem item={item} key={`SEARCH_ITEM_${index}`} />;
  };

  navigateToChat = () => {
    this.props.navigateToPage('Conversation', {
      fromProductDetail: true,
      product: {
        name: this.keyword,
      },
    });
  };

  render() {
    let {products, loading} = this.state;

    return (
      <View style={styles.container}>
        <SearchToolbar
          navigateToPage={this.props.navigateToPage}
          autoFocus={true}
          onChangeText={this.handleChangeText}
        />
        <View style={styles.body}>
          <List
            renderItem={this.renderItem}
            styles={[styleBase.p_10_horizontal, styleBase.p_10_vertical]}
            numColumns={3}
            onEndReachedThreshold={2}
            onEndReach={this.loadMore.bind(this)}
            dataSources={products}
          />
          {loading && (
            <LoadingIndicator
              style={[styleBase.fullParent, styleBase.fillParent]}
            />
          )}
          {!loading &&
            (!Array.isArray(products) || products.length === 0) &&
            !!this.keyword && (
              <View
                style={[
                  styleBase.fullParent,
                  styleBase.fillParent,
                  styleBase.center,
                ]}>
                <Text
                  style={[
                    styleBase.textMedium,
                    styleBase.text16,
                    styleBase.textGray29,
                  ]}>
                  Không tìm thấy sản phẩm nào phù hợp.
                </Text>
                {this.props.profile.type === accountType.agency && (
                  <LinearGradient
                    colors={['#F98649', '#F04E23']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={[
                      styleBase.shadow,
                      styles.chat_button,
                      styleBase.center,
                    ]}>
                    <ButtonWrapper
                      onPress={this.navigateToChat}
                      style={[
                        styleBase.alignCenter,
                        styleBase.row,
                        styles.content,
                        styleBase.h100,
                      ]}>
                      <Image
                        source={require('app/res/icon/icon-chat-white.png')}
                        style={[styles.ic_chat]}
                      />
                      <Text
                        style={[
                          styleBase.textWhite,
                          styleBase.m_10_left,
                          styleBase.textMedium,
                        ]}>
                        Hỗ trợ
                      </Text>
                    </ButtonWrapper>
                  </LinearGradient>
                )}
              </View>
            )}
        </View>
      </View>
    );
  }
}

export default connect(state => ({profile: state.profile.profile}), {
  navigateToPage,
})(SearchProductScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: appColor.primary,
    paddingHorizontal: sizeWidth(10),
    paddingVertical: sizeWidth(10),
  },
  search: {
    paddingLeft: sizeWidth(12),
    marginLeft: sizeWidth(8),
    marginRight: 0,
  },
  body: {
    flex: 1,
  },
  chat_button: {
    marginTop: sizeWidth(30),
    height: sizeWidth(48),
    borderRadius: sizeWidth(30),
    overflow: 'hidden',
    shadowColor: '#444',
  },
  content: {
    paddingHorizontal: sizeWidth(30),
  },
  ic_chat: {
    width: sizeWidth(29),
    height: sizeWidth(27),
  },
});
