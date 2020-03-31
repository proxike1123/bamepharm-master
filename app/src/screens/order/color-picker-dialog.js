import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { sizeWidth, sizeFont, sizeHeight } from "../../helpers/size.helper";
import Text from "../../components/common/text";
import { font, appColor } from "../../constants/app.constant";
import TouchableIcon from "../../components/common/touchable-icon";
import { ColorPicker } from "react-native-color-picker";

const colors = [
  "#f2d926",
  "#b34dff",
  "#06113f",
  "#ff1a4d",
  "#80ffff",
  "#d62020",
  "#80ff00",
  "#00ff80"
];

export default class ColorPickerDialog extends Component {
  render() {
    const { item, onSelectColor } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>MÀU CÓ SẴN</Text>
        <View style={styles.colors}>
          {colors.map((item, index) => this.renderColor(item, index))}
        </View>
      </View>
    );
  }

  renderColor = (item, index) => {
    const { selectedColor, onSelectColor } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onSelectColor(item)}
        key={index.toString()}
        style={[styles.color, { backgroundColor: item }]}
      >
        {selectedColor == item && (
          <Image
            style={styles.tick}
            source={require("../../../res/icon/check-mark.png")}
          />
        )}
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: sizeWidth(20),
    paddingHorizontal: sizeWidth(12)
  },
  colors: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  color: {
    width: sizeWidth(26),
    height: sizeWidth(26),
    borderRadius: sizeWidth(13),
    margin: sizeWidth(5)
  },
  tick: {},
  picker: {
    width: sizeWidth(237),
    height: sizeHeight(350)
  },
  label: {
    marginVertical: sizeWidth(4),
    fontWeight: "500"
  }
});
