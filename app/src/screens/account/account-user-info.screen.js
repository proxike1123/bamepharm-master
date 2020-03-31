import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styleBase from 'app/src/styles/base';
import {sizeWidth} from 'app/src/helpers/size.helper';
import BackIcon from 'app/src/components/common/back-icon';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import {connect} from 'react-redux';
import Toolbar from 'app/src/components/common/toolbar';
import API from 'app/src/api/api';
import {appColor} from 'app/src/constants/app.constant';
import Button from '../../components/common/button';
import Input from '../../components/common/input';
import {loadedProfile} from '../../actions/profile.action';
import Toast from 'react-native-root-toast';

const contentMapping = [
  {
    keyName: 'full_name',
    title: 'Tên chủ đại lý',
    icon: require('../../../res/icon/account/user.png'),
  },
  {
    keyName: 'store_name',
    title: 'Tên cửa hàng',
    icon: require('../../../res/icon/account/shop.png'),
  },
  // {
  //   keyName: 'code_name',
  //   title: 'Bí danh',
  //   icon: require('../../../res/icon/account/code-name.png'),
  // },
  {
    keyName: 'phone',
    title: 'Số điện thoại',
    icon: require('../../../res/icon/account/phone.png'),
  },
  {
    keyName: 'birthday',
    title: 'Ngày sinh',
    icon: require('../../../res/icon/account/birthday.png'),
  },
  {
    keyName: 'address1',
    title: 'Địa chỉ',
    icon: require('../../../res/icon/account/location.png'),
  },
  {
    keyName: 'sale',
    title: 'Nhân viên hỗ trợ',
    icon: require('../../../res/icon/account/support.png'),
  },
];

const updateField = [
  'full_name',
  'store_name',
  'address1',
  'code_name',
  'phone',
  'birthday',
];

class AccountUserInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      update: false,
    };
  }

  async componentDidMount() {
    this.getAgencyInfo();
  }

  async getAgencyInfo() {
    const account = await API.agencyInfo();
    const infoSale = await API.getInfoSale();
    account.sale = infoSale['name saler'];
    this.setState({account, updateAccount: account});
  }

  renderLoading = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };

  renderCenter = () => {
    return (
      <Text style={[styleBase.text18, styleBase.textBold, styleBase.textWhite]}>
        Thông tin người dùng
      </Text>
    );
  };

  renderInfoItems = () => {
    const {account, updateAccount, update} = this.state;
    if (update) {
      return contentMapping
        .filter(item => !update || item.keyName !== 'sale')
        .map(item => {
          const value = updateAccount[item.keyName];
          item.value = value;
          return (
            <InfoItem
              key={item.keyName}
              {...item}
              update={update}
              onChange={this.onChange}
            />
          );
        });
    } else {
      if (!account) {
        return;
      }
      return contentMapping.map(item => {
        const value = account[item.keyName];
        if (value) {
          item.value = value;
          return <InfoItem key={item.keyName} {...item} />;
        }
      });
    }
  };

  renderContent = () => {
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {this.renderInfoItems()}
      </ScrollView>
    );
  };

  onChange = (key, value) => {
    this.setState(state => {
      return {updateAccount: {...state.updateAccount, ...{[key]: value}}};
    });
  };

  onUpdate = () => {
    this.setState({update: true});
  };

  onSave = async () => {
    const {updateAccount} = this.state;
    const updatedAccount = {};
    updateField.forEach(key => {
      updatedAccount[key] = updateAccount[key];
    });

    let invalid = Object.values(updatedAccount).findIndex(item => !item);
    if (invalid !== -1) {
      return Toast.show('Thông tin cập nhật chưa hợp lệ');
    }

    try {
      const response = await API.updateAgencyInfo(updatedAccount);
      this.props.loadedProfile({...this.props.profile, ...updatedAccount});
      if (response.errors) {
        throw 'something wrong';
      }
      Toast.show('Cập nhập thông tin thành công.');
      this.setState({update: false});
      await this.getAgencyInfo();
    } catch (e) {
      this.onCancel();
      this.setState({update: false});
    }
  };

  onCancel = () => {
    this.setState(state => {
      return {updateAccount: state.account, update: false};
    });
  };

  render() {
    const {update} = this.state;
    return (
      <View style={[styleBase.container]}>
        <Toolbar left={<BackIcon />} center={this.renderCenter()} />
        <View style={styles.wrapper}>
          {this.state.account ? this.renderContent() : this.renderLoading()}
        </View>
        {/* <View style={styles.buttonWrapper}>
          {update ? (
            <View style={styles.buttonGroup}>
              <Button
                style={{width: '40%'}}
                text="Hủy"
                onPress={this.onCancel}
              />
              <Button style={{width: '40%'}} text="Lưu" onPress={this.onSave} />
            </View>
          ) : (
            <Button text="Chỉnh sửa" onPress={this.onUpdate} />
          )}
        </View> */}
      </View>
    );
  }
}

export default connect(
  state => ({profile: state.profile.profile}),
  {
    resetPage,
    navigateToPage,
    loadedProfile,
  },
)(AccountUserInfoScreen);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: sizeWidth(12),
    marginTop: 5,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

const InfoItem = ({icon, title, value, update, onChange, keyName}) => {
  return (
    <View style={[infoStyles.row]}>
      <Image style={[infoStyles.icon]} resizeMode="contain" source={icon} />
      {update ? (
        <Input
          value={value}
          onChangeText={text => onChange(keyName, text)}
          label={title}
        />
      ) : (
        <View style={[infoStyles.insight]}>
          <Text
            style={[
              infoStyles.title,
              styleBase.textGrey,
              styleBase.text14,
              styleBase.textMedium,
            ]}>
            {title}
          </Text>
          <Text
            style={[
              infoStyles.value,
              styleBase.text6,
              styleBase.text15,
              styleBase.textMedium,
            ]}>
            {value}
          </Text>
        </View>
      )}
    </View>
  );
};

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  icon: {
    width: sizeWidth(25),
    height: sizeWidth(25),
    marginRight: sizeWidth(15),
  },
  insight: {
    borderBottomColor: styleBase.textPrim.color,
    borderBottomWidth: 0.5,
    width: '100%',
    padding: sizeWidth(12),
  },
  title: {},
  value: {
    marginTop: 5,
  },
});
