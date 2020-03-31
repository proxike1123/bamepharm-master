import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { sizeFont } from "../../helpers/size.helper";

export default class WrapText extends Component {
  render() {
    const { children, style, wrapStyle } = this.props;
    const { numberOfLines, ellipsizeMode } = this.props;

    return (
      <View style={[styles.wrap, wrapStyle]}>
        <Text
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          style={[styles.text, style]}
        >
          {children}
        </Text>
      </View>
    );
  }
}

WrapText.propTypes = {
  numberOfLines: PropTypes.number,
  ellipsizeMode: PropTypes.string,
  wrapStyle: PropTypes.any
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row"
  },
  text: {
    flexWrap: "wrap",
    color: "black",
    fontSize: sizeFont(3.8)
  }
});
