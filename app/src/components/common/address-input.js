import React, { Component, ReactNode } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { font } from "../../constants/app.constant";
import Text from "./text";

export default class AddressInput extends Component {
  render(): ReactNode {
    const {
      style,
      value,
      bodyStyle,
      onChangeText,
      secureTextEntry,
      label,
      valid,
      editable,
      copyable,
      warning
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.body, bodyStyle]}>
          <TextInput
            editable={editable}
            placeholder="0"
            value={value}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            placeholderTextColor="#C7C7CC"
            style={styles.input}
          />
          {copyable && (
            <TouchableOpacity>
              <Image
                source={require("../../../res/icon/copy-content.png")}
                style={styles.copy}
              />
            </TouchableOpacity>
          )}
          {valid && (
            <Image
              source={require("../../../res/icon/check-circle.png")}
              style={styles.tick}
            />
          )}
          {warning && (
            <Image
              source={require("../../../res/icon/warning.png")}
              style={styles.warning}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(290),
    alignSelf: "center",
    backgroundColor: "white",
    marginVertical: sizeWidth(6)
  },
  body: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#A0B1B7",
    height: sizeWidth(34),
    borderRadius: sizeWidth(6),
    paddingHorizontal: sizeWidth(8),
    marginTop: sizeWidth(4)
  },
  tick: {
    width: sizeWidth(15),
    height: sizeWidth(15)
  },
  label: {
    fontFamily: font.medium
  },
  input: {
    fontSize: sizeWidth(12),
    flex: 1,
    textAlign: "left",
    color: "#444444",
    padding: 0,
    fontFamily: font.regular
  },
  copy: {
    width: sizeWidth(15),
    height: sizeWidth(17)
  },
  warning: {
    width: sizeWidth(16),
    height: sizeWidth(16)
  }
});
