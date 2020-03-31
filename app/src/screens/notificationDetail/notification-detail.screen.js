import Api from 'app/src/api/api';
import LoadingIndicator from 'app/src/components/common/loading-indicator';
import lodash from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import {navigateToPage, resetPage} from '../../actions/nav.action';
import BackIcon from '../../components/common/back-icon';
import Text from '../../components/common/text';
import Toolbar from '../../components/common/toolbar';
import {accountType, appColor, font} from '../../constants/app.constant';
import {sizeFont, sizeWidth} from '../../helpers/size.helper';
import Button from '../../components/common/button';

class NotificationDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.handleFetchNotificationDetail();
  }

  handleFetchNotificationDetail = async () => {
    const {notification_id} = this.props.navigation.state.params;
    if (!notification_id) {
      return;
    }
    let response;

    try {
      if (this.props.profile.type === accountType.agency) {
        response = await Api.getDetailNotification(notification_id);
      } else {
        response = await Api.getDetailNotificationSale(notification_id);
      }

      if (lodash.isArray(response)) {
        this.setState({notification: response[0]});
      }
    } catch (e) {}

    this.setState({loading: false});
  };

  navigateToOrderDetail = () => {
    const {notification} = this.state;
    this.props.navigateToPage('OrderDetail', {orderId: notification.id_order});
  };

  navigateToLink = () => {
    const {notification} = this.state;
    switch (notification.link) {
      case 'shop_owe':
        this.props.navigateToPage('Liability');
        break;
      case 'feedback':
        this.props.navigateToPage('Feedback');
        break;
      case 'rating':
        this.props.navigateToPage('Rating');
        break;
      default:
        break;
    }
  };

  render() {
    let {notification, loading} = this.state;
    return (
      <View style={styles.container}>
        <Toolbar
          left={<BackIcon />}
          center={<Text style={styles.title}>Chi tiết</Text>}
        />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {!!notification && (
              <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.content}>
                  <Text style={styles.label}>{notification.title}</Text>
                  <Text style={styles.time}>
                    {moment(notification.created_at).format('DD/MM/YYYY HH:mm')}
                  </Text>
                  <HTML
                    baseFontStyle={styles.text}
                    ignoredStyles={[
                      'font-family',
                      'font-weight',
                      'letter-spacing',
                      'line-height',
                      'display',
                      'font-size',
                    ]}
                    html={notification.content}
                  />
                  {!!notification.id_order && (
                    <Button
                      style={styles.button}
                      text="XEM ĐƠN HÀNG"
                      onPress={this.navigateToOrderDetail}
                    />
                  )}
                  {!!notification.link && notification.link !== 'n' && (
                    <Button
                      style={styles.button}
                      text="LINK ĐÍNH KÈM"
                      onPress={this.navigateToLink}
                    />
                  )}
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>
    );
  }
}

export default connect(state => ({profile: state.profile.profile}), {
  resetPage,
  navigateToPage,
})(NotificationDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#95989A',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: sizeWidth(15),
  },
  title: {
    color: 'white',
    fontSize: sizeFont(18),
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  button: {
    marginTop: sizeWidth(16),
    width: sizeWidth(200),
    alignSelf: 'center',
  },
  body: {
    flex: 1,
  },
  content: {
    paddingHorizontal: sizeWidth(14),
    paddingVertical: sizeWidth(10),
  },
  time: {
    marginBottom: sizeWidth(18),
    fontSize: sizeFont(15),
    color: appColor.blur,
  },
  text: {
    color: appColor.text,
    fontSize: sizeFont(18),
    fontFamily: font.regular,
  },
  label: {
    fontSize: sizeFont(23),
    fontFamily: font.bold,
    fontWeight: 'bold',
    marginBottom: sizeWidth(10),
  },
});
