import React, {PureComponent, ReactNode} from 'react';
import {Text, StyleSheet} from 'react-native';
import {sizeFont} from '../../helpers/size.helper';
import {font} from '../../constants/app.constant';

const EMPTY = '';

export default class AppText extends PureComponent {
  render(): ReactNode {
    const {style, numberOfLines, onPress} = this.props;
    const children =
      this.props.children !== null && this.props.children !== undefined
        ? this.props.children
        : EMPTY;

    return (
      <Text
        onPress={onPress}
        ellipsizeMode="tail"
        numberOfLines={numberOfLines}
        style={[styles.text, style]}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#444444',
    fontSize: sizeFont(15),
    backgroundColor: 'transparent',
    fontFamily: font.regular,
  },
});
