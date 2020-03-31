import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import Text from "../../components/common/text";
import { font } from "../../constants/app.constant";

export default class Setting extends Component {
  render() {
    const { onPress, label } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Image
          style={styles.image}
          source={require("../../../res/icon/arrow-right.png")}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizeWidth(12),
    height: sizeWidth(44),
    backgroundColor: "white",

    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    fontSize: sizeFont(15),
    flex: 1,
    fontFamily: font.regular
  },
  image: {
    width: sizeWidth(10),
    height: sizeWidth(22),
    marginLeft: sizeWidth(12)
  }
});
