import React, {Component, ReactNode} from 'react';
import {Alert, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {
  navigateBack,
  navigateToPage,
  resetPage,
} from '../../actions/nav.action';
import {connect} from 'react-redux';
import Text from '../../components/common/text';
import {sizeFont, sizeWidth} from '../../helpers/size.helper';
import Button from '../../components/common/button-v2';
import {accountType, appColor, font} from '../../constants/app.constant';
import CartItem from './cart-item';
import Toolbar from '../../components/common/toolbar';
import BackIcon from '../../components/common/back-icon';
import lodash from 'lodash';
import numeral from 'numeral';
import {getSelectedAgency, removeCart} from '../../helpers/storage.helper';
import {loadCart} from '../../actions/cart.action';
import EmptyView from '../../components/common/empty-view';
import Toast from 'react-native-root-toast';
import styleBase from 'app/src/styles/base';
import {removeProduct} from 'app/src/actions/cart.action';
import Api from 'app/src/api/api';
import LoadingIndicator from 'app/src/components/common/loading_indicator';
import HeaderProductItem from 'app/src/screens/home/header-product-item';

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      comment: '',
      loading: false,
    };
  }

  componentDidMount() {
    let {cart} = this.props.cart;

    if (lodash.isArray(cart)) {
      this.setState({cart});
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps && nextProps.cart && lodash.isArray(nextProps.cart.cart)) {
      this.setState({cart: nextProps.cart.cart});
    }
  }

  handleDeleteProduct = (item, index) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn xóa sản phẩm khỏi giỏ hàng?',
      [
        {
          text: 'Hủy bỏ',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => this.handleExecuteDelete(item, index),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  handleExecuteDelete = (item, index) => {
    this.props.removeProduct(item);
  };

  render(): ReactNode {
    const {cart, comment} = this.state;
    if (!cart || !Array.isArray(cart)) return null;
    // Need display product in the cart by category

    const groupByCategory = lodash.groupBy(cart, 'category_name');

    return (
      <View style={styles.container}>
        <Toolbar
          left={<BackIcon />}
          center={
            <Text style={[styles.title, styleBase.textBold]}>Giỏ hàng</Text>
          }
        />
        {cart.length == 0 ? (
          <View>
            <EmptyView message="Bạn chưa có sản phẩm nào trong giỏ hàng" />
            <Button
              onPress={() => {
                this.props.navigateToPage('OrderList');
              }}
              text="Xem đơn hàng"
            />
          </View>
        ) : (
          <ScrollView bounces={false} contentContainerStyle={[styles.content]}>
            {lodash.map(groupByCategory, (value, key) => {
              return (
                <View>
                  <HeaderProductItem title={key} hideViewAll={true} />
                  {value.map((item, index) => (
                    <CartItem
                      key={index.toString()}
                      onEdit={() => {
                        this.props.navigateToPage('Order', {
                          product: {
                            color: item.color,
                            size: item.size,
                            id: item.id,
                            products: item.products,
                            product: [
                              {
                                ...item,
                                name: item.p_name,
                                price: item.p_price,
                                image: item.p_img,
                              },
                            ],
                          },
                        });
                      }}
                      onDelete={() => this.handleDeleteProduct(item, index)}
                      item={item}
                    />
                  ))}
                </View>
              );
            })}
            <View style={styles.note}>
              <Text style={styles.label}>Ghi chú</Text>
              <View style={[styles.input_container]}>
                <TextInput
                  value={comment}
                  placeholder={'Nhập ghi chú...'}
                  onChangeText={text => this.setState({comment: text})}
                  multiline
                  style={styles.input}
                />
              </View>
            </View>
          </ScrollView>
        )}
        <View style={[styles.bottom]}>
          <View
            style={[
              styleBase.row,
              styleBase.alignCenter,
              styleBase.spaceBetween,
              styleBase.p_10_horizontal,
              styleBase.p_5_vertical,
            ]}>
            <Text style={[styles.text, styleBase.text16, styleBase.textMedium]}>
              Tổng tiền:
            </Text>
            <Text style={[styles.text, styleBase.text20, styleBase.textBold]}>
              {numeral(this.totalPrice()).format('0,0')} VNĐ
            </Text>
          </View>
          <Button
            onPress={this.makeOrder}
            style={styles.button}
            text="ĐẶT HÀNG"
          />
        </View>
        {this.state.loading && <LoadingIndicator text={''} />}
      </View>
    );
  }

  totalPrice = () => {
    let {cart} = this.state;
    if (!lodash.isArray(cart)) {
      return 0;
    }

    return cart.reduce((total, item) => (total += item.total), 0);
  };

  handleOrder = async () => {
    let agency = await getSelectedAgency();
    if (this.props.profile.type === accountType.sale && !agency) {
      return Toast.show('Chưa chọn đại lý cho phiên làm việc');
    }
    this.setState({loading: true});
    let products = [];
    this.state.cart.map(item => {
      let productItem = Object.values(item.products).map(item => ({
        product_id: item.product_id,
        color_name: item.color_name,
        comment: item.comment,
        size: item.size,
        qty: item.qty,
      }));

      products = [...products, ...productItem];
    });

    products = products.reduce(
      (map, item, index) => ({...map, [index]: item}),
      {},
    );

    let total = this.totalPrice();

    let data = {
      comment: this.state.comment,
      products,
      total,
    };

    if (this.props.profile.type === accountType.sale && agency && agency.id) {
      data = {...data, agencyid: agency.id};
    }

    try {
      let response;

      if (this.props.profile.type === accountType.sale) {
        response = await Api.createOrderSale(data);
      } else {
        response = await Api.createOrder(data);
      }

      await removeCart();
      this.props.loadCart([]);
      Toast.show(
        'Quý khách đã đặt hàng thành công. Nhân viên công ty sẽ liên hệ để xác nhận đơn hàng trong giây lát.',
      );
      this.props.navigateBack();
    } catch (e) {}

    this.setState({loading: false});
  };

  makeOrder = async () => {
    if (this.state.cart.length == 0) return Toast.show('Giỏ hàng đang trống');

    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đặt hàng không?',
      [
        {
          text: 'Hủy bỏ',
          style: 'cancel',
        },
        {
          text: 'Đặt hàng',
          onPress: this.handleOrder,
        },
      ],
      {
        cancelable: true,
      },
    );
  };
}

export default connect(
  state => ({
    cart: state.cart,
    profile: state.profile.profile,
  }),
  {resetPage, navigateToPage, loadCart, navigateBack, removeProduct},
)(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: sizeFont(18),
  },
  button: {
    width: '90%',
    marginBottom: sizeWidth(10),
    margin: sizeWidth(4),
  },
  price: {
    color: appColor.primary,
    fontWeight: '500',
  },
  line: {
    height: 1,
    backgroundColor: appColor.primary,
    width: sizeWidth(320),
  },
  bottom: {
    width: '100%',
    backgroundColor: 'white',
    borderTopColor: '#e5e5e5',
    borderTopWidth: 0.5,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  content: {
    paddingTop: sizeWidth(5),
    paddingBottom: sizeWidth(110),
  },
  note: {
    padding: sizeWidth(12),
  },
  label: {
    fontFamily: font.bold,
  },
  input_container: {
    borderWidth: 1,
    marginTop: sizeWidth(5),
    backgroundColor: 'white',
    borderRadius: sizeWidth(10),
    borderColor: '#DDDDDD',
    paddingHorizontal: sizeWidth(5),
    paddingVertical: sizeWidth(5),
  },
  input: {
    textAlignVertical: 'top',
    fontSize: sizeFont(15),
    fontFamily: font.medium,
    height: sizeWidth(120),
    paddingVertical: 0,
  },
});
