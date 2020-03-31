import React, { Component, ReactNode } from "react";
import { View, StyleSheet, Image, TextInput } from "react-native";
import PropTypes from "prop-types";
import { sizeWidth } from "../../helpers/size.helper";

export default class IconInput extends Component {
  render(): ReactNode {
    const {
      style,
      icon,
      iconStyle,
      placeholder,
      value,
      onChangeText,
      secureTextEntry
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Image
          resizeMode="contain"
          source={icon}
          style={[styles.image, iconStyle]}
        />
        <TextInput
          placeholder={placeholder}
          value={value}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          placeholderTextColor="#5f5d70"
          style={styles.input}
        />
      </View>
    );
  }
}

IconInput.propTypes = {
  icon: PropTypes.any.isRequired,
  iconStyle: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(84),
    flexDirection: "row",
    height: sizeWidth(17.06),
    borderRadius: sizeWidth(0.54),
    backgroundColor: "#fbfaff",
    alignItems: "center",
    paddingHorizontal: sizeWidth(6.13)
  },
  image: {
    width: sizeWidth(3.46),
    height: sizeWidth(3.46)
  },
  input: {
    fontSize: sizeWidth(3.73),
    flex: 1,
    textAlign: "left",
    color: "#5f5d70",
    height: sizeWidth(17.06),
    marginLeft: sizeWidth(4.85)
  }
});
