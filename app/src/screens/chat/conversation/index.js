import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import ToolbarConversation from 'app/src/screens/chat/conversation/toolbar-coversation';
import {GiftedChat} from 'react-native-gifted-chat';
import styleBase from 'app/src/styles/base';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import Send from 'react-native-gifted-chat/lib/Send';
import {sizeFont} from 'app/src/helpers/size.helper';
import {appColor, accountType} from 'app/src/constants/app.constant';
import firebase from 'react-native-firebase';
import {getConversationKey} from 'app/src/config/app.config';
import Api from '../../../api/api';
import {appConfig} from 'app/src/config/app.config';
import uuid from 'uuid';
import ImagePicker from 'react-native-image-crop-picker';
import {sizeWidth} from '../../../helpers/size.helper';
import TouchableIcon from '../../../components/common/touchable-icon';

@connectActionSheet
class ConversationScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.profile = this.props.profile;
    this.myId = this.profile.id;
    this.partner = this.props.navigation.getParam('partner');
    // this is only for agency account
    this.fromProductDetail =
      this.props.navigation.getParam('fromProductDetail') || false;
    this.conversationKey =
      this.profile.type === accountType.sale
        ? getConversationKey(this.myId, this.partner.id)
        : getConversationKey(this.profile.admin_user_id, this.myId);

    this.state = {
      messages: [],
      name: '',
      avatar: null,
    };

    this.conversationsRef = firebase
      .firestore()
      .collection(`conversation/${this.conversationKey}/messages`);
  }

  componentDidMount() {
    this.unsubscribe = this.conversationsRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const {_changes, _docs} = querySnapshot;

        if (_changes.length === _docs.length) {
          const messages = _docs.map(doc => {
            let message = doc.data();
            message.createdAt = message.createdAt.toDate();
            return message;
          });
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
          }));
        } else if (_changes.length === 1) {
          if (_changes[0]._type === 'added') {
            let message = _changes[0]._document.data();
            message.createdAt = message.createdAt.toDate();
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, message),
            }));
          }
        }
      });

    this.displayPartnerInfo();

    // send auto generated message from agency to sale only
    if (this.fromProductDetail) {
      const message = this.composeMessage();
      message && this.conversationsRef.add(message);
    }
  }

  composeMessage = () => {
    const product = this.props.navigation.getParam('product') || null;
    if (!product) return null;

    return {
      _id: uuid.v4(),
      text: `Tôi đang muốn hỗ trợ về sản phẩm ${product.name}`,
      createdAt: new Date(),
      system: true,
      user: {
        _id: this.myId,
      },
    };
  };

  displayPartnerInfo = async () => {
    if (this.profile.type === accountType.agency) {
      const sale = await Api.getInfoSale();
      this.setState({
        name: sale['name saler'],
        avatar: `${appConfig.apiUrl}public${sale['ava saler']}`,
      });
    } else {
      this.setState({
        name: this.partner.full_name,
        avatar: `${appConfig.apiUrl}public${this.partner.avatar}`,
      });
    }
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSend(messages = []) {
    this.conversationsRef.add(messages[0]);
  }

  renderSend = props => {
    return (
      <Send {...props}>
        <View
          style={[
            styleBase.justifyCenter,
            styleBase.h100,
            styleBase.m_10_right,
            styleBase.p_5_horizontal,
          ]}>
          <Image
            source={require('app/res/icon/send.png')}
            resizeMode={'contain'}
            style={[styles.send]}
          />
        </View>
      </Send>
    );
  };

  pickImage = () => {
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
            multiple: true,
          }).then(async images => {
            const uploadedImages = await this.sendChatImages(images);
            uploadedImages.forEach(image => {
              this.conversationsRef.add(this.composeImageMessage(image));
            });
          });
        }
        if (buttonIndex === 1) {
          ImagePicker.openCamera({
            multiple: true,
          }).then(async images => {
            const uploadedImages = await this.sendChatImages([images]);
            uploadedImages.forEach(image => {
              this.conversationsRef.add(this.composeImageMessage(image));
            });
          });
        }
      },
    );
  };

  sendChatImages = async images => {
    let updateImages = images.map(image => {
      return this.uploadImage(image);
    });
    const response = await Promise.all([...updateImages]);
    return response;
  };

  composeImageMessage = image => {
    return {
      _id: uuid.v4(),
      text: '',
      createdAt: new Date(),
      user: {
        _id: this.myId,
      },
      image: image.url,
    };
  };

  uploadImage = async image => {
    const name =
      Platform.OS === 'ios'
        ? image.filename
        : `my_profile_${Date.now()}.${
            image.mime === 'image/jpeg' ? 'jpg' : 'png'
          }`;

    const file = {
      uri: image.path,
      type: image.mime,
      name: name,
    };

    const data = new FormData();
    data.append('image_chat', file, name);

    const config = {
      'Content-Type': 'multipart/form-data',
    };

    return Api.sendChatImage(data, config, this.profile.type)
      .then(data => {
        return data;
      })
      .catch(e => {});
  };

  renderActions = () => {
    const {profile} = this.props;
    return (
      <View style={styles.row}>
        <TouchableIcon
          onPress={() => {
            this.pickImage();
          }}
          iconStyle={styles.image}
          source={require('../../../../res/icon/picture.png')}
        />
        {/* {profile.type === accountType.sale && (
          <TouchableIcon
            onPress={() => {
              this.pickImage();
            }}
            iconStyle={styles.link}
            source={require('../../../../res/icon/icon-link.png')}
          />
        )} */}
      </View>
    );
  };

  render() {
    const fromProductDetail = this.props.navigation.getParam(
      'fromProductDetail',
    );
    const {profile} = this.props;
    return (
      <View style={[styleBase.container]}>
        <ToolbarConversation
          fromProductDetail={fromProductDetail}
          name={this.state.name}
          isAgency={profile.type === accountType.agency}
          avatar={this.state.avatar}
        />
        <GiftedChat
          renderSend={this.renderSend}
          renderAvatar={null}
          renderActions={this.renderActions}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.myId,
          }}
        />
      </View>
    );
  }
}

export default connect(
  state => ({profile: state.profile.profile}),
  null,
)(ConversationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  action: {
    fontSize: sizeFont(24),
    color: appColor.primary,
  },
  send: {
    width: sizeFont(24),
    height: sizeFont(24),
    tintColor: appColor.primary,
  },
  image: {
    width: sizeWidth(28),
    height: sizeWidth(28),
    margin: sizeWidth(4),
    tintColor: appColor.blur,
  },
  link: {
    width: sizeWidth(24),
    height: sizeWidth(24),
    margin: sizeWidth(4),
    tintColor: appColor.blur,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
