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
  },
  body: {
    flex: 1,
  },
  content: {
    paddingHorizontal: sizeWidth(14),
    paddingVertical: sizeWidth(10),
  },
  time: {
    marginBottom: sizeWidth(10),
    fontSize: sizeFont(13),
    color: appColor.blur,
  },
  text: {
    color: appColor.text,
    fontSize: sizeFont(13),
    fontFamily: font.regular,
  },
  label: {
    fontSize: sizeFont(16),
    fontFamily: font.bold,
    marginBottom: sizeWidth(10),
  },
});
