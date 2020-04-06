import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import styleBase from 'app/src/styles/base';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import {sizeWidth} from 'app/src/helpers/size.helper';
import {connect} from 'react-redux';
import {navigateToPage} from 'app/src/actions/nav.action';
import LinearGradient from 'react-native-linear-gradient';
import {appColor} from '../../constants/app.constant';

class ChatButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  navigateToCart = () => {
    const {product} = this.props;
    this.props.navigateToPage('Conversation', {
      product,
      fromProductDetail: true,
    });
  };

  render() {
    return (
      <LinearGradient
        colors={[appColor.leftLinear, appColor.rightLinear]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          styleBase.shadow,
          styles.ChatButton,
          styleBase.center,
          this.props.style,
        ]}>
        <ButtonWrapper
          onPress={this.navigateToCart}
          style={[styleBase.fullParent, styleBase.center]}>
          <Image
            source={require('app/res/icon/icon-chat-white.png')}
            style={[styles.ic_chat]}
          />
        </ButtonWrapper>
      </LinearGradient>
    );
  }
}

ChatButton.propTypes = {
  style: PropTypes.any,
};

ChatButton.defaultProps = {};

export default connect(null, {navigateToPage})(ChatButton);

const styles = StyleSheet.create({
  ChatButton: {
    width: sizeWidth(48),
    height: sizeWidth(48),
    marginLeft: sizeWidth(8),
    borderRadius: sizeWidth(24),
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#444',
    zIndex: 999,
  },
  ic_chat: {
    width: sizeWidth(24),
    height: sizeWidth(22),
  },
  badge: {
    position: 'absolute',
    bottom: sizeWidth(8),
    right: sizeWidth(8),
    width: sizeWidth(16),
    height: sizeWidth(16),
    borderRadius: sizeWidth(8),
    backgroundColor: 'white',
  },
  text_badge: {
    color: '#4A4A4A',
  },
});
