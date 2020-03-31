import firebase from 'react-native-firebase';
const analytics = firebase.analytics();

export const analyticsEvents = {
  viewScreen: 'view_screen',
};

export default class AnalyticsHelper {
  static setUser(user) {
    analytics.setUserId(user.id + '');
    analytics.setUserProperties({info: JSON.stringify(user)});
  }

  static logEvent(event, params) {
    try {
      analytics.logEvent(event, params);
    } catch (err) {
      console.log(err);
    }
  }
}
