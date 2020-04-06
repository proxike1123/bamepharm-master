import React, {Component, ReactNode} from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {
  resetPage,
  navigateBack,
  navigateToPage,
} from '../../actions/nav.action';
import {connect} from 'react-redux';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import Toolbar from '../../components/common/toolbar';
import Text from '../../components/common/text';
import {font, text, appColor, event} from '../../constants/app.constant';
import BackIcon from '../../components/common/back-icon';
import Input from '../../components/common/input';
import validator from 'validator';
import Api from '../../api/api';
import TouchableIcon from '../../components/common/touchable-icon';
import Button from '../../components/common/button';
import Toast from 'react-native-root-toast';

class SecurityScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: text.emptyString,
      newPassword: text.emptyString,
      retypePassword: text.emptyString,
      passwordVisible: false,
      newPasswordVisible: false,
      retypePasswordVisible: false,
      loading: false,
    };
  }

  toggleShowPassword = () => {
    const {passwordVisible} = this.state;
    this.setState({
      passwordVisible: !passwordVisible,
    });
  };

  toggleShowNewPassword = () => {
    const {newPasswordVisible} = this.state;
    this.setState({
      newPasswordVisible: !newPasswordVisible,
    });
  };

  toggleShowRetypePassword = () => {
    const {retypePasswordVisible} = this.state;
    this.setState({
      retypePasswordVisible: !retypePasswordVisible,
    });
  };

  render(): ReactNode {
    const {
      password,
      loading,
      newPassword,
      retypePassword,
      passwordVisible,
      newPasswordVisible,
      retypePasswordVisible,
    } = this.state;
    return (
      <View style={styles.container}>
        <Toolbar
          left={<BackIcon />}
          center={<Text style={styles.title}>Đổi mật khẩu</Text>}
        />
        <ScrollView bounces={false}>
          <Text style={styles.label}>Đổi mật khẩu</Text>
          <Input
            value={password}
            onChangeText={text => this.setState({password: text})}
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            right={
              <TouchableIcon
                style={styles.visible}
                onPress={this.toggleShowPassword}
                iconStyle={styles.eye}
                source={
                  passwordVisible
                    ? require('../../../res/icon/visible.png')
                    : require('../../../res/icon/eye-off.png')
                }
              />
            }
            secureTextEntry={!passwordVisible}
          />
          <Input
            label="Mật khẩu mới"
            value={newPassword}
            onChangeText={text => this.setState({newPassword: text})}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry={!newPasswordVisible}
            right={
              <TouchableIcon
                onPress={this.toggleShowNewPassword}
                style={styles.visible}
                iconStyle={styles.eye}
                source={
                  newPasswordVisible
                    ? require('../../../res/icon/visible.png')
                    : require('../../../res/icon/eye-off.png')
                }
              />
            }
          />
          <Input
            label="Nhập lại mật khẩu mới"
            value={retypePassword}
            onChangeText={text => this.setState({retypePassword: text})}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry={!retypePasswordVisible}
            right={
              <TouchableIcon
                onPress={this.toggleShowRetypePassword}
                style={styles.visible}
                iconStyle={styles.eye}
                source={
                  retypePasswordVisible
                    ? require('../../../res/icon/visible.png')
                    : require('../../../res/icon/eye-off.png')
                }
              />
            }
          />
        </ScrollView>
        <Button
          loading={loading}
          disabled={loading}
          style={styles.button}
          onPress={this.save}
          text="ĐỔI MẬT KHẨU"
        />
      </View>
    );
  }

  save = async () => {
    const {password, newPassword, retypePassword} = this.state;
    if (validator.isEmpty(password)) {
      return Toast.show('Mật khẩu không được để trống!');
    }
    if (validator.isEmpty(newPassword))
      return Toast.show('Mật khẩu mới không được để trống!');
    if (validator.isEmpty(retypePassword))
      return Toast.show('Vui lòng nhập lại mật khẩu mới!');
    if (
      password.length < 6 ||
      password.length > 12 ||
      newPassword.length < 6 ||
      newPassword.length > 12 ||
      retypePassword.length < 6 ||
      retypePassword.length > 12
    ) {
      return Toast.show('Vui lòng nhập ít nhất từ 6 đến 12 kí tự');
    }
    if (newPassword !== retypePassword)
      return Toast.show('Mật khẩu mới và mật khẩu xác nhận không khớp!');
    try {
      const {profile} = this.props.profile;
      this.setState({loading: true});
      let response = await Api.changePassword({
        password_old: password,
        password: newPassword,
        type: profile.type,
      });
      this.setState({loading: false}, () => {
        Toast.show(response.message);
        this.props.navigateBack();
      });
    } catch (err) {
      Toast.show(err.constructor === String ? err : err.message);
      this.setState({loading: false});
    }
  };

  componentDidMount = async () => {};
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  {resetPage, navigateBack, navigateToPage},
)(SecurityScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: 'white',
    fontSize: sizeFont(18),
    fontFamily: font.bold,
  },
  save: {
    color: 'white',
    fontSize: sizeFont(13),
  },
  button: {
    marginBottom: sizeWidth(15),
    marginTop: sizeWidth(5),
    marginHorizontal: sizeWidth(12),
  },
  label: {
    color: '#000000',
    alignSelf: 'center',
    width: sizeWidth(402),
    fontFamily: font.bold,
    paddingVertical: sizeWidth(9),
    paddingHorizontal: sizeWidth(12),
  },
  eye: {
    width: sizeWidth(14),
    tintColor: appColor.blur,
    height: sizeWidth(14),
  },
  visible: {
    marginRight: sizeWidth(6),
  },
});
