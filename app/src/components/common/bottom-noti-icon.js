import React, {Component} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {sizeFont, sizeWidth} from '../../helpers/size.helper';
import {accountType, appColor, event} from '../../constants/app.constant';
import styleBase from 'app/src/styles/base';
import {connect} from 'react-redux';
import Api from 'app/src/api/api';
import EventRegister from 'app/src/helpers/event-register.helper';

class BottomNotifyIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unread: 0,
    };
  }

  componentDidMount() {
    this.reloadUnredEvent = EventRegister.on(
      event.reloadUnread,
      this.reloadUnread,
    );
    this.handleFetchNotifyUnread();
  }

  componentWillUnmount() {
    EventRegister.off(this.reloadUnredEvent);
  }

  reloadUnread = () => {
    this.handleFetchNotifyUnread();
  };

  handleFetchNotifyUnread = async () => {
    let response;

    try {
      if (this.props.profile.type === accountType.agency) {
        response = await Api.getUnreadNotificationAgency();
      } else {
        response = await Api.getUnreadNotificationSale();
      }

      this.setState({unread: response});
    } catch (e) {}
  };

  render() {
    let {unread} = this.state;
    const {icon, focused, source} = this.props;
    const tintColorStyle = focused ? styles.active : styles.inactive;
    return (
      <View style={[styles.container]}>
        <Image
          resizeMode="stretch"
          source={source}
          style={[styles.icon, tintColorStyle]}
        />
        {!!unread && (
          <View style={[styles.badge, styleBase.center]}>
            <Text
              style={[
                styleBase.textWhite,
                styleBase.text9,
                styleBase.textBold,
              ]}>
              {unread > 99 ? '99+' : unread}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

BottomNotifyIcon.propTypes = {
  icon: PropTypes.any,
};

export default connect(state => ({profile: state.profile.profile}))(
  BottomNotifyIcon,
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: sizeWidth(24),
    height: sizeWidth(24),
  },
  active: {
    tintColor: appColor.primary,
  },
  inactive: {
    tintColor: appColor.icon,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 13,
    width: sizeWidth(16),
    height: sizeWidth(16),
    borderRadius: sizeWidth(8),
    overflow: 'hidden',
    backgroundColor: appColor.primary,
  },
});
