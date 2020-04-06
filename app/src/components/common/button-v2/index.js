import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import {sizeFont, sizeWidth} from 'app/src/helpers/size.helper';
import {appColor, font} from 'app/src/constants/app.constant';
import styleBase from 'app/src/styles/base';
import LinearGradient from 'react-native-linear-gradient';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {style, onPress, text, isOnlyIcon, source, iconStyle} = this.props;

    return (
      <LinearGradient
        colors={[appColor.leftLinear, appColor.rightLinear]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styleBase.shadow, styles.container, style]}>
        <ButtonWrapper
          style={[styleBase.fullParent, styleBase.center, styles.button]}
          onPress={onPress}>
          {!isOnlyIcon && (
            <Text numberOfLines={1} style={[styles.text]}>
              {text}
            </Text>
          )}
          {isOnlyIcon && (
            <Image style={iconStyle} resizeMode="contain" source={source} />
          )}
        </ButtonWrapper>
      </LinearGradient>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.any,
};

Button.defaultProps = {
  text: '',
  onPress: () => {},
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: sizeWidth(46),
    borderRadius: sizeWidth(23),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: sizeWidth(35),
  },
  text: {
    color: '#FFFFFF',
    fontFamily: font.bold,
    fontSize: sizeFont(14),
  },
});
