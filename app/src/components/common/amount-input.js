import React, { Component, ReactNode } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { font } from "../../constants/app.constant";
import Text from "./text";

export default class AmountInput extends Component {
  render(): ReactNode {
    const {
      style,
      value,
      onChangeText,
      secureTextEntry,
      label,
      unit
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.body}>
          <TextInput
            placeholder="0"
            value={value}
            autoCapitalize="none"
            keyboardType="numeric"
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            placeholderTextColor="#C7C7CC"
            style={styles.input}
          />
          <Text style={styles.unit}>{unit}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(290),
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
  unit: {
    fontSize: sizeFont(12),
    marginLeft: sizeWidth(12)
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
  }
});
