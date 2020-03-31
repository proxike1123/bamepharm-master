import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  NetInfo,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import {AppNavigator} from './navigators/app.navigator';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import EventRegister from './helpers/event-register.helper';
import {event, appColor, accountType} from './constants/app.constant';
import {
  removeToken,
  removeProfile,
  removeSelectedAgency,
  getProfile,
} from './helpers/storage.helper';
import {loadCart} from './actions/cart.action';
import {resetPage} from './actions/nav.action';
import {navigateToPage} from 'app/src/actions/nav.action';
import LinearGradient from 'react-native-linear-gradient';
import {sizeWidth} from 'app/src/helpers/size.helper';
import Api from './api/api';
import {loadedProfile} from './actions/profile.action';
import {updateDidNavigate} from './helpers/notification-navigate.helper';

const AppContainer = createReduxContainer(AppNavigator);
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(AppContainer);

class Main extends Component {
  shouldCloseApp = () => {
    return this.props.nav.index === 0;
  };

  handleBackPress = () => {
    if (this.shouldCloseApp()) {
      return false;
    }
    this.props.dispatch(NavigationActions.back({}));
    return true;
  };

  initFirebase = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.listenFirebaseMessage();
    } else {
      await firebase.messaging().requestPermission();
      this.listenFirebaseMessage();
    }
  };

  listenFirebaseMessage = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(async notification => {
        EventRegister.emit(event.reloadUnread);
        let {_body, _title, _data, _notificationId} = notification;
        this.handleDisplayNotification(
          _notificationId,
          _title,
          _body,
          _data,
          _data.type,
        );
      });
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(async notificationOpen => {
        await this.navigateToNotification();
      });
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      await this.navigateToNotification();
    }
  };

  navigateToNotification = async () => {
    updateDidNavigate(true);
    const profile = await getProfile();
    if (profile) {
      const newProfile =
        profile.type === accountType.agency
          ? await Api.agencyInfo()
          : await Api.saleInfo();
      this.props.loadedProfile({...profile, ...newProfile});
      if (profile.type === accountType.agency) {
        this.props.resetPage('Main');
      } else {
        this.props.resetPage('SaleMain');
      }
      EventRegister.emit(event.reloadUnread);
      this.props.navigateToPage('Notification');
    } else {
      this.props.resetPage('Login');
    }
  };

  handleDisplayNotification = async (
    notificationId,
    title,
    body,
    data,
    type,
  ) => {
    try {
      const channelId = 'local-channel';
      let notificationApp = new firebase.notifications.Notification()
        .setNotificationId(notificationId)
        .setTitle(title)
        .setBody(body)
        .setData(data);

      if (Platform.OS === 'android') {
        let channel = new firebase.notifications.Android.Channel(
          channelId,
          'Thông báo BQ',
          firebase.notifications.Android.Importance.Max,
        ).setDescription('Thông báo BQ');

        await firebase.notifications().android.createChannel(channel);

        notificationApp.android
          .setChannelId(channelId)
          .android.setSmallIcon('ic_launcher')
          .android.setPriority(firebase.notifications.Android.Priority.Max)
          .android.setVibrate(500);
      } else if (Platform.OS === 'ios') {
        notificationApp.ios.setBadge(2);
      }

      await firebase.notifications().displayNotification(notificationApp);
    } catch (e) {}
  };

  componentDidMount = () => {
    this.initFirebase();
    this.forceLogoutEvent = EventRegister.on(event.forceLogout, this.logout);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };

  logout = async () => {
    await removeToken();
    await removeProfile();
    await removeSelectedAgency();
    await this.props.loadCart();
    this.props.resetPage('Login');
  };

  componentWillUnmount = () => {
    EventRegister.off(this.forceLogoutEvent);
    if (this.notificationListener) this.notificationListener();
    if (this.notificationOpenedListener) this.notificationOpenedListener();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  render() {
    const {dispatch, nav} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={Platform.OS === 'ios'}
          translucent
          backgroundColor={'transparent'}
        />
        <SafeAreaView style={styles.top}>
          <LinearGradient
            colors={['#F98649', '#F04E23']}
            start={{x: 0, y: 0}}
            style={styles.overlay}
            end={{x: 1, y: 1}}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.body}>
          <AppWithNavigationState />
        </SafeAreaView>
      </View>
    );
  }
}

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(31, 39, 43)',
  },
  statusBar: {
    height: statusBarHeight,
    backgroundColor: 'rgb(31, 39, 43)',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  top: {},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => ({
    dispatch,
    navigateToPage: (routName, data) =>
      dispatch(navigateToPage(routName, data)),
    resetPage: page => dispatch(resetPage(page)),
    loadCart: () => dispatch(loadCart()),
    loadedProfile: profile => dispatch(loadedProfile(profile)),
  }),
)(Main);
