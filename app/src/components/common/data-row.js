import React, { Component, ReactNode } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "./text";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import { appColor } from "../../constants/app.constant";

export default class DataRow extends Component {
  render(): ReactNode {
    const { label, value, valueStyle } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, valueStyle]}>{value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 1,
    width: sizeWidth(320)
  },
  label: {
    flex: 1,
    padding: sizeWidth(8),
    backgroundColor: "#EEEEEE"
  },
  value: {
    flex: 2,
    padding: sizeWidth(8)
  }
});
