import React, { Component, ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./text";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { font } from "../../constants/app.constant";

export default class Switch extends Component {
  constructor(props) {
    super(props);
  }

  render(): ReactNode {
    const { active } = this.props;
    return active ? this.renderActive() : this.renderInactive();
  }

  renderActive = () => {
    const { label, style, disabled } = this.props;
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => this.onChange({ active: false })}
          style={styles.touchable}
        >
          <View style={styles.activeCircle} />
          <Text style={styles.activeText}>On</Text>
        </TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  };

  onChange = ({ active }) => {
    const { onChange } = this.props;
    if (onChange) onChange({ active });
  };

  renderInactive = () => {
    const { label, style, disabled } = this.props;
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => this.onChange({ active: true })}
          style={styles.touchable}
        >
          <Text style={styles.inactiveText}>Off</Text>
          <View style={styles.inactiveCircle} />
        </TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: sizeWidth(3.46)
  },
  activeCircle: {
    width: sizeWidth(2.6),
    height: sizeWidth(2.6),
    borderRadius: sizeWidth(1.3),
    backgroundColor: "rgb(47, 246, 214)"
  },
  inactiveCircle: {
    width: sizeWidth(2.6),
    height: sizeWidth(2.6),
    borderRadius: sizeWidth(1.3),
    backgroundColor: "rgb(107, 112, 115)"
  },
  touchable: {
    borderRadius: sizeWidth(1.3),
    height: sizeWidth(2.6),
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row"
  },
  label: {
    fontSize: sizeFont(1.59),
    marginLeft: sizeWidth(2.13),
    fontFamily: font.medium
  },
  activeText: {
    fontSize: sizeFont(1.22),
    fontFamily: font.bold,
    color: "rgb(47, 246, 214)",
    marginHorizontal: sizeWidth(1.13)
  },
  inactiveText: {
    fontSize: sizeFont(1.22),
    fontFamily: font.bold,
    marginHorizontal: sizeWidth(1.13)
  }
});
