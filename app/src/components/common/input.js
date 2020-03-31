import React, {Component, ReactNode} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import {font, appColor} from '../../constants/app.constant';
import Text from './text';

export default class Input extends Component {
  render(): ReactNode {
    const {
      style,
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      right,
      onBlur,
      label,
      labelStyle,
      placeholderTextColor,
      keyboardType,
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.body}>
          <TextInput
            onBlur={onBlur}
            placeholder={placeholder}
            value={value}
            keyboardType={keyboardType}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            placeholderTextColor={placeholderTextColor || appColor.blur}
            style={styles.input}
          />
          {right}
        </View>
        <View style={styles.line} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(402),
    alignSelf: 'center',
    paddingHorizontal: sizeWidth(12),
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    marginVertical: sizeWidth(8),
  },
  body: {
    flexDirection: 'row',
  },
  line: {
    width: '100%',
    height: 1,
    marginTop: sizeWidth(6),
    backgroundColor: appColor.blur,
  },
  input: {
    fontSize: sizeFont(15),
    flex: 1,
    textAlign: 'left',
    color: '#444444',
    padding: 0,
    fontFamily: font.regular,
  },
  label: {
    fontSize: sizeFont(15),
    alignSelf: 'flex-start',
    marginBottom: sizeWidth(12),
    color: '#444444',
    fontFamily: font.medium,
    fontWeight: '500',
  },
});
