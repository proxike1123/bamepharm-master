import React from 'react';
import {Text, View, StyleSheet, TextInput, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toolbar from 'app/src/components/common/toolbar';
import styleBase from 'app/src/styles/base';
import Api from 'app/src/api/api';
import lodash from 'lodash';
import BackIcon from 'app/src/components/common/back-icon';
import LoadingIndicator from 'app/src/components/common/loading-indicator';
import OrderDetailItem from 'app/src/screens/orderDetail/order-detail-item';
import numeral from 'numeral';
import {sizeWidth} from 'app/src/helpers/size.helper';
import Input from '../../components/common/input';
import {text, appColor, accountType, font} from '../../constants/app.constant';
import TouchableIcon from '../../components/common/touchable-icon';
import validator from 'validator';
import HTML from 'react-native-render-html';
import Toast from 'react-native-root-toast';
import {sizeFont} from '../../helpers/size.helper';
import GroupItem from './group-item';

class OrderDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      order: [],
      comment: text.emptyString,
      loading: true,
      keyboardShown: false,
      history: [],
      orderItem: null,
    };
  }

  componentDidMount() {
    this.handleFetchOrderDetail();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({
        keyboardShown: true,
      }),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({
        keyboardShown: false,
      }),
    );
    this.getHistory();
  }

  getHistory = async () => {
    let {orderId} = this.props.navigation.state.params;
    const {profile} = this.props.profile;
    const history = await Api.getCommentChangeStatus(orderId, profile.type);
    this.setState({
      history,
    });
  };

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  handleFetchOrderDetail = async () => {
    let {orderId} = this.props.navigation.state.params;
    if (!orderId) {
      return;
    }
    const {profile} = this.props.profile;
    try {
      let response = await Api.getOrderDetail(orderId, profile.type);
      const orderRes = await Api.getOrderById(orderId, profile.type);
      if (lodash.isArray(response)) {
        this.setState({order: response, orderItem: orderRes[0]});
      }
    } catch (e) {}

    this.setState({loading: false});
  };

  renderTitle = () => {
    return (
      <Text style={[styleBase.text18, styleBase.textWhite, styleBase.textBold]}>
        Chi tiết đơn hàng
      </Text>
    );
  };

  scrollToBottom = () => {
    if (this.scrollView) {
      this.scrollView.scrollToEnd();
    }
  };

  renderHistoryItem = (history, index) => {
    return (
      <View style={styles.html}>
        <HTML
          baseFontStyle={{
            fontFamily: font.regular,
            color: appColor.text,
            fontSize: sizeFont(14),
          }}
          ignoredStyles={[
            'font-family',
            'font-weight',
            'letter-spacing',
            'line-height',
            'display',
            'font-size',
          ]}
          html={history}
        />
      </View>
    );
  };

  render() {
    let {
      loading,
      keyboardShown,
      orderItem,
      order,
      history,
      comment,
    } = this.state;
    const {profile} = this.props.profile;
    const groups = Object.values(
      lodash.groupBy(order, function(b) {
        return b.product_id;
      }),
    );
    return (
      <View style={styles.container}>
        <Toolbar center={this.renderTitle()} left={<BackIcon />} />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <KeyboardAwareScrollView
            ref={ref => (this.scrollView = ref)}
            contentContainerStyle={[styles.content]}>
            {lodash.isArray(groups) &&
              groups.map((item, index) => (
                <GroupItem key={index.toString()} item={item[0]} list={item} />
              ))}
            <Text style={styles.note}>
              Ghi chú đơn hàng: {lodash.get(orderItem, 'comment')}
            </Text>
            {Array.isArray(history) && (
              <>
                <Text style={styles.history}>LỊCH SỬ THAY ĐỔI</Text>
                {history.map((e, i) => this.renderHistoryItem(e, i))}
              </>
            )}
            {profile.type === accountType.sale && (
              <View style={styles.row}>
                <TextInput
                  value={comment}
                  placeholder={'Nhập ghi chú...'}
                  onChangeText={value => this.setState({comment: value})}
                  multiline
                  style={styles.input}
                />

                <TouchableIcon
                  iconStyle={styles.send}
                  disabled={this.state.sending}
                  onPress={this.sendComment}
                  source={require('../../../res/icon/send.png')}
                />
              </View>
            )}
          </KeyboardAwareScrollView>
        )}
        {!keyboardShown && (
          <View style={[styles.bottom]}>
            <View
              style={[
                styleBase.row,
                styleBase.alignCenter,
                styleBase.spaceBetween,
                styleBase.p_10_horizontal,
                styleBase.p_10_vertical,
              ]}>
              <Text
                style={[
                  styleBase.text16,
                  styleBase.textMedium,
                  styleBase.text16,
                ]}>
                Tổng tiền:
              </Text>
              <Text
                style={[
                  styleBase.textAppColor,
                  styleBase.text20,
                  styleBase.textBold,
                ]}>
                {numeral(
                  lodash.sumBy(order, product => {
                    return product.qty * product.price;
                  }),
                ).format('0,0')}{' '}
                VNĐ
              </Text>
            </View>
          </View>
        )}
        {lodash.isArray(order) && order.length > 3 && (
          <TouchableIcon
            style={styles.down}
            onPress={this.scrollToBottom}
            iconStyle={styles.arrow}
            source={require('../../../res/icon/down-arrow-icon.png')}
          />
        )}
      </View>
    );
  }

  sendComment = async () => {
    const {comment} = this.state;
    let {orderId} = this.props.navigation.state.params;
    const {profile} = this.props.profile;
    if (validator.isEmpty(comment)) {
      return;
    }
    this.setState({
      sending: true,
    });
    try {
      await Api.addCommentToOrder({comment, idOrder: orderId});
      const orderRes = await Api.getOrderById(orderId, profile.type);
      this.setState({
        sending: false,
        orderItem: orderRes[0],
        comment: text.emptyString,
      });
      Toast.show('Cập nhập ghi chú thành công.');
      this.getHistory();
    } catch (err) {
      this.setState({
        sending: false,
      });
      Toast.show('Cập nhập ghi chú thất bại.');
    }
  };
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  null,
)(OrderDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingBottom: sizeWidth(60),
  },
  row: {
    flexDirection: 'row',
    marginTop: sizeWidth(10),
    paddingHorizontal: sizeWidth(12),
  },
  input: {
    flex: 1,
    height: sizeWidth(100),
    marginRight: sizeWidth(12),
    fontFamily: font.medium,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: appColor.blur,
    padding: sizeWidth(12),
    backgroundColor: 'white',
    borderRadius: sizeWidth(5),
    fontSize: sizeFont(15),
    textAlignVertical: 'top',
  },
  send: {
    tintColor: appColor.primary,
  },
  history: {
    paddingHorizontal: sizeWidth(12),
    marginVertical: sizeWidth(8),
    fontFamily: font.medium,
    fontWeight: '500',
    color: appColor.primary,
  },
  text: {
    paddingHorizontal: sizeWidth(12),
    marginVertical: sizeWidth(8),
    fontStyle: 'italic',
  },
  html: {
    paddingHorizontal: sizeWidth(12),
    marginVertical: sizeWidth(5),
  },
  down: {
    position: 'absolute',
    bottom: sizeWidth(64),
    justifyContent: 'center',
    alignItems: 'center',
    width: sizeWidth(44),
    borderRadius: sizeWidth(22),
    height: sizeWidth(44),
    right: sizeWidth(16),
    backgroundColor: appColor.primary,
  },
  arrow: {
    width: sizeWidth(18),
    height: sizeWidth(18),
    tintColor: 'white',
  },
  note: {
    marginVertical: sizeWidth(12),
    marginHorizontal: sizeWidth(12),
  },
});
