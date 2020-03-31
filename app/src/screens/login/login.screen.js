import React, {Component, ReactNode} from 'react';
import {Image, StyleSheet, View, Text, StatusBar} from 'react-native';
import Toast from 'react-native-root-toast';
import firebase from 'react-native-firebase';
import validator from 'validator';
import {navigateToPage, resetPage} from '../../actions/nav.action';
import {connect} from 'react-redux';
import {sizeWidth} from '../../helpers/size.helper';
import {accountType, font, text} from '../../constants/app.constant';
import Api from '../../api/api';
import {
  saveProfile,
  saveToken,
  saveUsername,
  savePassword,
  getUsername,
  getPassword,
} from '../../helpers/storage.helper';
import {loadedProfile} from '../../actions/profile.action';
import InputView from 'app/src/components/common/input_view';
import ButtonLogin from 'app/src/components/common/button-v2';
import LoadingIndicator from 'app/src/components/common/loading_indicator';
import styleBase from 'app/src/styles/base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getModel} from 'react-native-device-info';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      // email: 'daily001',
      email: '',
      // email: 'sale002@gmail.com',
      // email: text.emptyString,
      // password: 'admin',
      password: '',
      // password: text.emptyString,
      loading: false,
      emailError: '',
      passwordError: '',
    };
  }

  render(): ReactNode {
    const {email, password, emailError, passwordError, loading} = this.state;
    return (
      <View style={[styleBase.container]}>
        <StatusBar hidden translucent />
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={[styles.center]}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              resizeMode="stretch"
              source={require('../../../res/icon/ic_app_login.png')}
            />
            <View style={[styles.contentContainer]}>
              <View style={styles.content}>
                <InputView
                  onChangeText={email => this.setState({email, emailError: ''})}
                  onSubmitEditing={() =>
                    !!this.passwordRef && this.passwordRef.focus()
                  }
                  returnKeyType={'next'}
                  autoCapitalize="none"
                  errorMessage={emailError}
                  value={email}
                />
                <InputView
                  icon={require('app/res/icon/ic_password.png')}
                  value={password}
                  inputRef={ref => (this.passwordRef = ref)}
                  errorMessage={passwordError}
                  returnKeyType={'go'}
                  onSubmitEditing={this.login}
                  autoCapitalize="none"
                  style={[styles.marginVertical]}
                  secureTextEntry={true}
                  onChangeText={password =>
                    this.setState({password, passwordError: ''})
                  }
                  placeholder={'Vui lòng nhập mật khẩu'}
                />
                <ButtonLogin text={'Đăng nhập'} onPress={this.login} />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={[styles.copyright, styleBase.center, styleBase.w100]}>
          <Text
            style={[
              styleBase.text13,
              styleBase.textAppColor,
              styleBase.textMedium,
            ]}>
            Copyright by BQ Shoes 2019-2020
          </Text>
        </View>
        {!!loading && <LoadingIndicator text={'Đăng nhập...'} />}
      </View>
    );
  }

  componentDidMount = async () => {
    const username = await getUsername();
    const password = await getPassword();
    this.setState({
      email: username || text.emptyString,
      password: password || text.emptyString,
    });
  };

  checkValidate = () => {
    let {email, password} = this.state;
    if (!email) {
      this.setState({emailError: 'Vui lòng nhập email'});
      return false;
    } else {
      this.setState({emailError: ''});
    }

    if (!password) {
      this.setState({passwordError: 'Vui lòng nhập mật khẩu'});
      return false;
    } else {
      this.setState({passwordError: ''});
    }

    return true;
  };

  login = async () => {
    const {email, password} = this.state;
    if (!this.checkValidate()) return;
    try {
      this.setState({loading: true});
      let res;
      let profile;
      const fcmToken = await firebase.messaging().getToken();
      const deviceName = await getModel();
      if (!validator.isEmail(email)) {
        res = await Api.loginAgency({
          username: email,
          password,
          device_id: fcmToken,
          device_name: deviceName,
        });
        await saveToken(res.access_token);
        profile = await Api.agencyInfo();
        profile.type = accountType.agency;
        await saveProfile(profile);
        this.props.loadedProfile(profile);
        this.props.resetPage('Main');
      } else {
        res = await Api.loginSale({
          email,
          password,
          device_id: fcmToken,
          device_name: deviceName,
        });
        await saveToken(res.access_token);
        profile = await Api.saleInfo();
        profile.type = accountType.sale;
        await saveProfile(profile);
        this.props.loadedProfile(profile);
        this.props.resetPage('SaleMain');
      }
      await saveUsername(email);
      await savePassword(password);
    } catch (err) {
      Toast.show('Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại');
      this.setState({loading: false});
    }
  };
}

export default connect(null, {resetPage, loadedProfile, navigateToPage})(
  LoginScreen,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: sizeWidth(414),
    height: sizeWidth(414),
    marginBottom: sizeWidth(20),
  },
  signIn: {
    width: sizeWidth(290),
    alignSelf: 'center',
    marginBottom: sizeWidth(20),
  },
  content: {
    marginHorizontal: sizeWidth(12),
  },
  label: {
    color: '#FFFFFF',
  },
  input: {
    fontFamily: font.regular,
    padding: 0,
    margin: 0,
    color: '#1d1d26',
  },
  icon: {
    width: sizeWidth(24),
    height: sizeWidth(24),
  },
  contentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  copyright: {
    position: 'absolute',
    bottom: sizeWidth(15),
    left: 0,
  },
  marginVertical: {
    marginVertical: sizeWidth(17),
  },
  center: {
    paddingBottom: sizeWidth(100),
  },
});
