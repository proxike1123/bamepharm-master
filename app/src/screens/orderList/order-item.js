import React, {Component, ReactNode} from 'react';
import {View, Alert, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-root-toast';
import numeral from 'numeral';
import moment from 'moment';
import {font, appColor} from '../../constants/app.constant';
import {sizeWidth} from '../../helpers/size.helper';
import Text from '../../components/common/text';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import {appConfig} from 'app/src/config/app.config';
import Api from '../../api/api';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  confirmCancelOrder = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn huỷ đơn hàng này?',
      [
        {
          text: 'Trở về',
          style: 'cancel',
        },
        {
          text: 'Huỷ đơn hàng',
          onPress: () => this.cancelOrder(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  confirmChangeStatusOrder = async status => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn thay đổi trạng thái đơn hàng này?',
      [
        {
          text: 'Trở về',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => this.changeStatusOrder(status),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  changeStatusOrder = async status => {
    const {order, reloadOrders} = this.props;
    try {
      await Api.changeOrderStatus(order.id, status);
      Toast.show('Quý khách đã thay đổi trạng thái đơn hàng thành công');
      reloadOrders();
    } catch (err) {
      Toast.show(
        'Thay đổi trạng thái đơn hàng thất bại. Vui lòng thực hiện lại sau',
      );
    }
  };

  cancelOrder = async () => {
    const {order, reloadOrders} = this.props;
    const {profile} = this.props.profile;
    try {
      await Api.cancelOrder(order.id, profile.type);
      Toast.show('Quý khách đã huỷ đơn hàng thành công');
      reloadOrders();
    } catch (err) {
      Toast.show('Huỷ đơn hàng thất bại. Vui lòng thực hiện lại sau');
    }
  };

  handleNavigateDetail = async () => {
      const {order} = this.props;
      if (!order || !order.id) return;
      this.props.navigateToPage('OrderDetail', {orderId: order.id});
  };

  render(): ReactNode {
    const {order, nextStatus, nextStatusKey, showCancel} = this.props;
    const image = `${appConfig.apiUrl}public${order.p_img}`;
    return (
      <TouchableOpacity style={[styles.container]}
                        onPress={this.handleNavigateDetail}>
        <View style={styles.header}>
          <Text style={styles.date}>
            Ngày đặt hàng:{' '}
            {moment(order.created_at).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
          <Text style={styles.status}>{order.name}</Text>
          {showCancel && (
            <Text onPress={this.confirmCancelOrder} style={styles.cancel}>
              Huỷ
            </Text>
          )}
          {nextStatus && (
            <Text
              onPress={() => this.confirmChangeStatusOrder(nextStatusKey)}
              style={styles.text}>
              {nextStatus}
            </Text>
          )}
        </View>
        <View style={styles.body}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={{uri: image}}
          />
          <View style={styles.content}>
            <Text style={styles.name}>{order.p_name}</Text>
            <Text style={styles.price}>{`${numeral(order.p_price || 0).format(
              '0,0',
            )}đ`}</Text>
            {/* <Text style={styles.count}>Số lượng: {order.total || 0}</Text> */}
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.label}>Tổng tiền</Text>
          <Text style={styles.total}>{`${numeral(order.total || 0).format(
            '0,0',
          )}đ`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  {resetPage, navigateToPage},
)(OrderItem);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: sizeWidth(9),
    backgroundColor: 'white',
    paddingHorizontal: sizeWidth(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizeWidth(8),
  },
  date: {
    flex: 1,
  },
  status: {
    marginHorizontal: sizeWidth(8),
  },
  cancel: {
    color: appColor.primary,
  },
  text: {
    color: appColor.primary,
    marginLeft: sizeWidth(12),
    fontFamily: font.medium,
  },
  body: {
    flexDirection: 'row',
    paddingVertical: sizeWidth(8),
  },
  image: {
    width: sizeWidth(70),
    height: sizeWidth(70),
    backgroundColor: '#c4c4c4',
    borderRadius: sizeWidth(3),
  },
  content: {
    flex: 1,
    marginLeft: sizeWidth(12),
  },
  name: {},
  price: {
    fontFamily: font.bold,
    marginVertical: sizeWidth(6),
  },
  count: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizeWidth(8),
  },
  label: {
    flex: 1,
  },
  total: {
    color: appColor.primary,
    fontFamily: font.bold,
  },
});
