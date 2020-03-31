import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {appColor} from '../../constants/app.constant';

export default class LoadingIndicator extends Component {
  render() {
    const {size, color, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator
          size={size || 'large'}
          color={color || appColor.icon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
