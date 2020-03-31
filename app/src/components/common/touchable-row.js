import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import Text from './text';
import {font} from '../../constants/app.constant';

export default class TouchableRow extends Component {
  render() {
    const {onPress, icon, label} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {icon}
        <Text style={styles.label}>{label}</Text>
        <Image
          style={styles.image}
          source={require('../../../res/icon/arrow-right.png')}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizeWidth(16),
    height: sizeWidth(48),
    backgroundColor: 'white',

    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: sizeFont(15),
    flex: 1,
    fontFamily: font.regular,
  },
  image: {
    width: sizeWidth(7),
    height: sizeWidth(13),
    marginLeft: sizeWidth(12),
  },
});
