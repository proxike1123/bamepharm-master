import React, { Component, ReactNode } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "./text";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";

export default class ColorPicker extends Component {
  render(): ReactNode {
    return (
      <TouchableOpacity style={styles.container}>
        {this.renderColor()}
        {this.renderColor()}
        {this.renderColor()}
        {this.renderColor()}
        {this.renderColor()}
        {this.renderColor()}
      </TouchableOpacity>
    );
  }

  renderColor = () => {
    return (
      <TouchableOpacity style={styles.color}>
        <Image
          style={styles.checked}
          resizeMode="stretch"
          source={require("../../../res/icon/checked.png")}
        />
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    marginVertical: sizeWidth(6),
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  color: {
    width: sizeWidth(26),
    height: sizeWidth(26),
    borderRadius: sizeWidth(13),
    backgroundColor: "blue",
    marginHorizontal: sizeWidth(2),
    justifyContent: "center",
    alignItems: "center"
  },
  checked: {
    width: sizeWidth(13),
    height: sizeWidth(13),
    tintColor: "white"
  }
});
