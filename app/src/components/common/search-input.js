import PropTypes from 'prop-types';
import React, {Component, ReactNode} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {font} from '../../constants/app.constant';
import {sizeFont, sizeWidth} from '../../helpers/size.helper';
import Text from './text';
import {appColor} from '../../constants/app.constant';

export default class SearchInput extends Component {
  render(): ReactNode {
    const {
      style,
      placeholder,
      onPress,
      onIconPress,
      value,
      autoFocus,
      onChangeText,
      onSubmitEditing
    } = this.props;
    const Root = onPress ? TouchableOpacity : View;
    return (
      <Root onPress={onPress} style={[styles.container, style]}>
        <View style={styles.body}>
          <Image
            resizeMode="stretch"
            resizeMethod="resize"
            source={require('../../../res/icon/search.png')}
            style={[styles.leftImage, {tintColor: appColor.leftLinear}]}
          />

          {onPress ? (
            <View style={styles.wrap}>
              <Text style={styles.text}>{value || placeholder}</Text>
            </View>
          ) : (
            <TextInput
              placeholder={placeholder}
              value={value}
              autoFocus={autoFocus}
              autoCapitalize="none"
              returnKeyType="search"
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              underlineColorAndroid="transparent"
              placeholderTextColor="#999999"
              style={styles.input}
            />
          )}

          <TouchableOpacity onPress={onIconPress}>
            <Image
              resizeMode="stretch"
              resizeMethod="resize"
              source={require('../../../res/icon/barcode_round.png')}
              style={[styles.image, {tintColor: appColor.rightLinear}]}
            />
          </TouchableOpacity>
        </View>
      </Root>
    );
  }
}

SearchInput.propTypes = {
  autoFocus: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func
};

SearchInput.defaultProps = {
  autoFocus: false,
  onChangeText: () => {},
  onSubmitEditing: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: sizeWidth(40),
    paddingHorizontal: sizeWidth(6),
    backgroundColor: 'white',
    borderRadius: sizeWidth(20),
    marginHorizontal: sizeWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImage: {
    width: sizeWidth(16),
    height: sizeWidth(16),
    marginRight: sizeWidth(12),
    marginLeft: sizeWidth(4),
  },
  image: {
    width: sizeWidth(32),
    height: sizeWidth(32),
  },
  input: {
    fontSize: sizeFont(14),
    flex: 1,
    textAlign: 'left',
    color: '#444444',
    marginRight: sizeWidth(12),
    fontFamily: font.regular,
  },
  wrap: {
    flex: 1,
    marginRight: sizeWidth(12),
    justifyContent: 'center',
  },
  text: {
    fontSize: sizeFont(14),
    color: '#444444',
  },
});
