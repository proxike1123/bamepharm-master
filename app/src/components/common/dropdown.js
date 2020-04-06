import React, { Component, ReactNode } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput
} from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { font, appColor } from "../../constants/app.constant";
import Text from "./text";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import lodash from "lodash";

@connectActionSheet
export default class Dropdown extends Component {
  render(): ReactNode {
    const { style, value, label } = this.props;
    return (
      <View style={[styles.container, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TouchableOpacity onPress={this.showOptionPicker} style={styles.body}>
          <Text style={styles.value}>{value}</Text>
          <Image
            style={styles.expand}
            source={require("../../../res/icon/arrow-down.png")}
          />
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  }

  showOptionPicker = () => {
    const { options, path, onValueChange } = this.props;
    if (!options) return;
    let values = path ? options.map(item => lodash.get(item, path)) : options;
    values = [...values, "Hủy"];
    const cancelButtonIndex = options.length;
    this.props.showActionSheetWithOptions(
      {
        options: values,
        cancelButtonIndex
      },
      buttonIndex => {
        if (onValueChange && buttonIndex != options.length)
          onValueChange(options[buttonIndex]);
      }
    );
  };
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flexDirection: "row"
  },
  container: {
    alignSelf: "center",
    width: sizeWidth(302),
    backgroundColor: "white",
    marginVertical: sizeWidth(5)
  },
  value: {
    fontSize: sizeFont(13),
    flex: 1,
    fontFamily: font.regular
  },
  line: {
    width: "100%",
    height: 1,
    marginTop: sizeWidth(6),
    backgroundColor: appColor.blur
  },
  expand: {
    width: sizeWidth(10),
    marginLeft: sizeWidth(12),
    height: sizeWidth(6)
  },
  label: {
    fontFamily: font.bold,
    fontSize: sizeFont(13),
    marginVertical: sizeWidth(10)
  }
});
