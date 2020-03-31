import React, { Component } from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { sizeWidth } from "../../helpers/size.helper";
import { appColor } from "../../constants/app.constant";

export default class TouchableIcon extends Component {
  render() {
    const {
      onPress,
      disabled,
      onLongPress,
      source,
      iconStyle,
      style
    } = this.props;
    return (
      <TouchableOpacity
        onLongPress={onLongPress}
        disabled={disabled}
        style={[styles.container, style]}
        onPress={onPress}
      >
        <Image
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
          resizeMethod="resize"
          source={source}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: sizeWidth(4)
  },
  icon: {
    width: sizeWidth(20),
    height: sizeWidth(20),
    tintColor: "white"
  }
});
