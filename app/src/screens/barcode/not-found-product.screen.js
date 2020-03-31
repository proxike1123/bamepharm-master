import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from 'app/src/components/common/toolbar';
import BackIcon from 'app/src/components/common/back-icon';
import styleBase from 'app/src/styles/base';
import {sizeWidth} from 'app/src/helpers/size.helper';
import ChatButton from 'app/src/components/chat-button';
import ButtonWrapper from 'app/src/components/common/button-wrapper';

import LinearGradient from 'react-native-linear-gradient';
import {accountType} from 'app/src/constants/app.constant';
import {navigateToPage} from 'app/src/actions/nav.action';

class NotFoundProductScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  navigateToChat = () => {
    let {barcode} = this.props.navigation.state.params;

    this.props.navigateToPage('Conversation', {
      fromProductDetail: true,
      product: {
        name: `có mã ${barcode}`,
      },
    });
  };

  renderCenter = () => (
    <Text style={[styleBase.text18, styleBase.textWhite, styleBase.textBold]}>
      Quét mã sản phẩm
    </Text>
  );

  render() {
    return (
      <View style={styles.container}>
        <Toolbar left={<BackIcon />} center={this.renderCenter()} />
        <View style={[styleBase.container, styleBase.center]}>
          <Image
            source={require('app/res/icon/empty.png')}
            style={[styles.image_empty]}
          />
          <Text
            style={[
              styleBase.textMedium,
              styleBase.text16,
              styleBase.textGray29,
            ]}>
            Không thấy tìm thấy sản phẩm.
          </Text>
          {this.props.profile.type === accountType.agency && (
            <LinearGradient
              colors={['#F98649', '#F04E23']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={[styleBase.shadow, styles.chat_button, styleBase.center]}>
              <ButtonWrapper
                onPress={this.navigateToChat}
                style={[
                  styleBase.alignCenter,
                  styleBase.row,
                  styles.content,
                  styleBase.h100,
                ]}>
                <Image
                  source={require('app/res/icon/icon-chat-white.png')}
                  style={[styles.ic_chat]}
                />
                <Text
                  style={[
                    styleBase.textWhite,
                    styleBase.m_10_left,
                    styleBase.textMedium,
                  ]}>
                  Hỗ trợ
                </Text>
              </ButtonWrapper>
            </LinearGradient>
          )}
        </View>
      </View>
    );
  }
}

export default connect(state => ({profile: state.profile.profile}), {
  navigateToPage,
})(NotFoundProductScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_empty: {
    width: sizeWidth(128),
    height: sizeWidth(115),
    tintColor: '#919191',
    marginBottom: sizeWidth(20),
  },
  chat_button: {
    marginTop: sizeWidth(30),
    height: sizeWidth(48),
    borderRadius: sizeWidth(30),
    overflow: 'hidden',
    shadowColor: '#444',
  },
  content: {
    paddingHorizontal: sizeWidth(30),
  },
  ic_chat: {
    width: sizeWidth(29),
    height: sizeWidth(27),
  },
});
