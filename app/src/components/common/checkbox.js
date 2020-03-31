import React, { Component, ReactNode } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "./text";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";

export default class Checkbox extends Component {
  render(): ReactNode {
    const { label, checked, onCheck } = this.props;
    const icon = checked
      ? require("../../../res/icon/checked.png")
      : require("../../../res/icon/uncheck.png");
    const iconStyle = styles.icon;
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity onPress={onCheck}>
            <Image style={iconStyle} source={icon} />
          </TouchableOpacity>
          <Text style={styles.text}>{label}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: sizeWidth(6)
  },
  body: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  icon: {
    width: sizeWidth(30),
    height: sizeWidth(30)
  },
  text: {
    fontSize: sizeFont(13),
    marginLeft: sizeWidth(8),
    flex: 1
  }
});
