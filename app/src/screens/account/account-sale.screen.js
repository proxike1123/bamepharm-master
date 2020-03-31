import React, {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import firebase from 'react-native-firebase';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import Text from '../../components/common/text';
import {connect} from 'react-redux';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import {font, text, appColor} from '../../constants/app.constant';
import Api from '../../api/api';
import Toolbar from '../../components/common/toolbar';
import TouchableRow from '../../components/common/touchable-row';
import {
  removeToken,
  removeProfile,
  getSelectedAgency,
  saveSelectedAgency,
  removeSelectedAgency,
} from '../../helpers/storage.helper';
import {PopupAgencySelection} from 'app/src/components/popup/index';
import ImagePicker from 'react-native-image-crop-picker';
import {loadCart} from 'app/src/actions/cart.action';
import {appConfig} from '../../config/app.config';
import EventRegister from '../../helpers/event-register.helper';
import {buildImage} from '../../helpers/image-helper';

@connectActionSheet
class AccountSaleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agencySelectionDisplayed: false,
      selectedAgency: null,
      avatar: null,
    };
  }

  componentDidMount = async () => {
    const selectedAgency = await getSelectedAgency();
    this.setState({selectedAgency});
    this.loadAvatar();
  };

  onSelectAgency = async () => {
    this.setState({agencySelectionDisplayed: true});
  };

  onPressConfirm = async selectedAgency => {
    await saveSelectedAgency(selectedAgency);
    EventRegister.emit('selectAgency');
    this.setState({agencySelectionDisplayed: false});
  };

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

    Api.uploadSaleAvatar(data, config)
      .then(data => {
        this.loadAvatar();
      })
      .catch(e => {});
  };

  loadAvatar = async () => {
    const saleInfo = await Api.saleInfo();
    this.setState({avatar: `${appConfig.apiUrl}public${saleInfo.avatar}`});
  };

  navigateToSecurity = () => {
    this.props.navigateToPage('Security');
  };

  navigateToAdmin = () => {
    this.props.navigateToPage('WebViewPreview', {
      title: 'Trang quản trị',
      source: `${appConfig.adminUrl}`,
    });
  };

  render() {
    const {agencySelectionDisplayed, avatar} = this.state;
    const {profile} = this.props.profile;
    return (
      <View style={styles.container}>
        <Toolbar center={<Text style={styles.title}>Tài khoản</Text>} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.image} onPress={this.openImagePicker}>
            {!!avatar && <Image style={styles.avatar} source={{uri: avatar}} />}
          </TouchableOpacity>
          <View style={styles.info}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.address}>Email: {profile.email}</Text>
          </View>
        </View>
        <ScrollView bounces={false}>
          <TouchableRow
            label="Thông tin người dùng"
            onPress={() => {
              this.props.navigateToPage('SaleInfo');
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
            label="Chọn Đại Lý"
            onPress={this.onSelectAgency}
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/icon-info.png')}
              />
            }
          />
          <View style={styles.separator} />
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
            label="Trang quản trị"
            icon={
              <Image
                style={styles.icon}
                source={require('../../../res/icon/account/ic_management.png')}
              />
            }
            onPress={this.navigateToAdmin}
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
        <PopupAgencySelection
          onBackdropPress={() =>
            this.setState({agencySelectionDisplayed: false})
          }
          onPressConfirm={this.onPressConfirm}
          isVisible={agencySelectionDisplayed}
        />
      </View>
    );
  }

  logout = async () => {
    const fcmToken = await firebase.messaging().getToken();
    await Api.logoutSale({device_id: fcmToken});
    await removeToken();
    await removeProfile();
    await removeSelectedAgency();
    this.props.loadCart([]);
    this.props.resetPage('Login');
  };
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  {resetPage, navigateToPage, loadCart},
)(AccountSaleScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
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
  separator: {
    backgroundColor: '#DDDDDD',
    height: 1,
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
    backgroundColor: 'white',
  },
  info: {
    flex: 1,
  },
  image: {
    marginRight: sizeWidth(24),
    width: sizeWidth(104),
    height: sizeWidth(104),
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
  icon: {
    width: sizeWidth(20),
    height: sizeWidth(20),
    marginRight: sizeWidth(16),
  },
});
