import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styleBase from 'app/src/styles/base';
import {sizeWidth} from 'app/src/helpers/size.helper';
import BackIcon from 'app/src/components/common/back-icon';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import {connect} from 'react-redux';
import Toolbar from 'app/src/components/common/toolbar';
import API from 'app/src/api/api';
import Button from '../../components/common/button';
import Input from '../../components/common/input';
import {loadedProfile} from '../../actions/profile.action';
import Toast from 'react-native-root-toast';

const contentMapping = [
  {
    keyName: 'name',
    title: 'Tên người dùng',
    icon: require('../../../res/icon/account/user.png'),
    isAbleUpdate: true,
  },
  {
    keyName: 'email',
    title: 'Email',
    icon: require('../../../res/icon/account/code-name.png'),
    isAbleUpdate: false,
  },
];

const updateField = ['name'];

class SaleInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      update: false,
    };
  }

  async componentDidMount() {
    this.getSaleInfo();
  }

  async getSaleInfo() {
    const account = await API.saleInfo();

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
      if (!updateAccount) {
        return;
      }
      return contentMapping.map(item => {
        const value = updateAccount[item.keyName];
        item.value = value;
        return (
          <InfoItem
            key={item.keyName}
            {...item}
            update={item.isAbleUpdate}
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
      const response = await API.updateSaleInfo(updatedAccount);
      this.props.loadedProfile({...this.props.profile, ...updatedAccount});
      if (response.errors) {
        throw 'something wrong';
      }
      this.setState({update: false});
      await this.getSaleInfo();
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
        <View style={styles.buttonWrapper}>
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
        </View>
      </View>
    );
  }
}

export default connect(state => ({profile: state.profile.profile}), {
  resetPage,
  navigateToPage,
  loadedProfile,
})(SaleInfoScreen);

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
