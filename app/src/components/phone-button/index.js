import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import styleBase from 'app/src/styles/base';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import {sizeWidth} from 'app/src/helpers/size.helper';
import {connect} from 'react-redux';
import {navigateToPage} from 'app/src/actions/nav.action';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
import API from 'app/src/api/api';

class PhoneButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  callSale = async () => {
    const infoSale = await API.getInfoSale();
    console.log(infoSale);
    let phone = infoSale['phone saler'];
    Communications.phonecall(phone, true);
  };

  render() {
    const {phone} = this.props;
    return (
      <LinearGradient
        colors={['#F98649', '#F04E23']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          styleBase.shadow,
          styles.ChatButton,
          styleBase.center,
          this.props.style,
        ]}>
        <ButtonWrapper
          onPress={() => this.callSale()}
          style={[styleBase.fullParent, styleBase.center]}>
          <Image
            source={require('app/res/icon/phone-icon.png')}
            style={[styles.ic_chat]}
          />
        </ButtonWrapper>
      </LinearGradient>
    );
  }
}

PhoneButton.propTypes = {
  style: PropTypes.any,
};

PhoneButton.defaultProps = {};

export default connect(null, {navigateToPage})(PhoneButton);

const styles = StyleSheet.create({
  ChatButton: {
    width: sizeWidth(48),
    height: sizeWidth(48),
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
