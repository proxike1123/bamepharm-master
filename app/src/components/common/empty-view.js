import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import { font, appColor } from "../../constants/app.constant";
import Text from "./text";

export default class EmptyView extends Component {
  render() {
    const { size, color, style, message } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Image
          resizeMode="stretch"
          source={require("../../../res/icon/empty.png")}
          style={styles.empty}
        />
        <Text style={styles.message}>{message.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: sizeWidth(24)
  },
  message: {
    fontSize: sizeFont(14),
    fontWeight: "500",
    textAlign: "center"
  },
  empty: {
    width: sizeWidth(100),
    height: sizeWidth(100),
    marginBottom: sizeWidth(16)
  }
});
