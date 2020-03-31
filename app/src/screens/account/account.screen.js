import React, {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import firebase from 'react-native-firebase';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import Text from '../../components/common/text';
import {connect} from 'react-redux';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import {font, appColor} from '../../constants/app.constant';
import Api from '../../api/api';
import Toolbar from '../../components/common/toolbar';
import TouchableRow from '../../components/common/touchable-row';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {
  removeToken,
  removeProfile,
  removeCart,
} from '../../helpers/storage.helper';
import ImagePicker from 'react-native-image-crop-picker';
import {appConfig} from 'app/src/config/app.config';
import {loadCart} from 'app/src/actions/cart.action';
import CartIcon from '../../components/common/cart-icon';
import {buildImage} from '../../helpers/image-helper';

@connectActionSheet
class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
    };
  }

  componentDidMount = async () => {
    this.loadAvatar();
  };

  loadAvatar = async () => {
    const agencyInfo = await Api.agencyInfo();
    this.setState({avatar: `${appConfig.apiUrl}public${agencyInfo.avatar}`});
  };

  render(): ReactNode {
    const {profile} = this.props.profile;
    const {avatar} = this.state;
    return (
      <View style={styles.container}>
        <Toolbar
          right={<CartIcon />}
          center={<Text style={styles.title}>Tài khoản</Text>}
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={this.openImagePicker}>
            {!!avatar && <Image style={styles.avatar} source={{uri: avatar}} />}
          </TouchableOpacity>
          <View style={styles.info}>
            <Text style={styles.name}>{profile.full_name}</Text>
            <Text style={styles.address}>Địa chỉ: {profile.address1}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <ScrollView bounces={false}>
          <TouchableRow
            label="Đổi mật khẩu"
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/icon-change-password.png')}
              />
            }
            onPress={this.navigateToSecurity}
          />
          <View style={styles.separator} />
          <TouchableRow
            label="Thông tin người dùng"
            onPress={() => {
              this.props.navigateToPage('AccountUserInfo');
            }}
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/icon-info.png')}
              />
            }
          />
          <View style={styles.separator} />
          <TouchableRow
            label="Đánh giá nhân viên"
            onPress={this.navigateToRating}
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/icon-rate.png')}
              />
            }
          />
          <View style={styles.separator} />
          <TouchableRow
            label="Góp ý đến Lãnh đạo"
            onPress={this.navigateToFeedback}
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/icon-feedback.png')}
              />
            }
          />
          <View style={styles.separator} />
          <TouchableRow
            label="Công nợ"
            onPress={this.navigateToLiability}
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/icon-money.png')}
              />
            }
          />
          <View style={styles.separator} />
          <TouchableRow
            label="Sản phẩm đã mua"
            onPress={this.navigateToOrderedProduct}
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/icon-bought.png')}
              />
            }
          />
          <View style={styles.separator} />
          <TouchableRow
            onPress={this.logout}
            label="Đăng xuất"
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/icon-logout.png')}
              />
            }
          />
          <View style={styles.separator} />
        </ScrollView>
      </View>
    );
  }

  openImagePicker = () => {
    const values = ['Chọn ảnh từ thư viện', 'Chụp ảnh', 'Huỷ'];
    const cancelButtonIndex = values.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options: values,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        if (buttonIndex === 0) {
          ImagePicker.openPicker({
            height: 400,
            width: 400,
            includeBase64: true,
            cropping: true,
            cropperCircleOverlay: true,
          }).then(avatar => {
            const data = buildImage(avatar);
            this.uploadAvatar(data);
          });
        }
        if (buttonIndex === 1) {
          ImagePicker.openCamera({
            width: 400,
            height: 400,
            includeBase64: true,
            cropping: true,
            cropperCircleOverlay: true,
          }).then(avatar => {
            const data = buildImage(avatar);
            this.uploadAvatar(data);
          });
        }
      },
    );
  };

  uploadAvatar = async image => {
    const data = new FormData();
    data.append('avatar', image);

    const config = {
      'Content-Type': 'multipart/form-data',
    };

    Api.uploadAvatar(data, config)
      .then(data => {
        this.loadAvatar();
      })
      .catch(e => {});
  };

  navigateToOrderedProduct = () => {
    this.props.navigateToPage('OrderedProduct');
  };

  navigateToLiability = () => {
    this.props.navigateToPage('Liability');
  };

  navigateToSecurity = () => {
    this.props.navigateToPage('Security');
  };

  navigateToFeedback = () => {
    this.props.navigateToPage('Feedback');
  };

  navigateToRating = () => {
    this.props.navigateToPage('Rating');
  };

  navigateToAccountStatements = () => {
    this.props.navigateToPage('AccountStatements');
  };

  logout = async () => {
    const fcmToken = await firebase.messaging().getToken();
    await Api.logoutAgency({device_id: fcmToken});
    await removeToken();
    await removeProfile();
    await this.props.loadCart([]);
    this.props.resetPage('Login');
  };
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  {resetPage, navigateToPage, loadCart},
)(AccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: sizeFont(18),
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  label: {
    fontSize: sizeFont(13),
    color: '#6D6D72',
    paddingHorizontal: sizeWidth(12),
    paddingTop: sizeWidth(14),
    backgroundColor: '#EFEFF3',
    paddingBottom: sizeWidth(10),
  },
  row: {
    paddingHorizontal: sizeWidth(12),
    height: sizeWidth(44),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: sizeWidth(20),
    height: sizeWidth(20),
    marginRight: sizeWidth(16),
  },
  text: {
    fontSize: sizeFont(15),
    flex: 1,
    fontFamily: font.regular,
  },
  version: {
    fontSize: sizeFont(15),
    color: '#A0B1B7',
    marginLeft: sizeWidth(12),
    fontFamily: font.regular,
  },
  line: {
    backgroundColor: '#DDDDDD',
    height: 1,
  },
  separator: {
    backgroundColor: '#DDDDDD',
    height: 1,
    marginLeft: sizeWidth(52),
  },
  header: {
    flexDirection: 'row',
    padding: sizeWidth(16),
    alignItems: 'center',
  },
  avatar: {
    width: sizeWidth(104),
    height: sizeWidth(104),
    borderRadius: sizeWidth(52),
    borderWidth: 1,
    borderColor: '#D8D8D8',
    marginRight: sizeWidth(24),
    backgroundColor: 'white',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: sizeFont(18),
    marginBottom: sizeWidth(6),
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  address: {
    fontSize: sizeFont(16),
    color: '#4A4A4A',
  },
});
