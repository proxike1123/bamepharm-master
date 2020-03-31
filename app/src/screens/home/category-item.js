import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import Text from "../../components/common/text";
import { font, appColor } from "../../constants/app.constant";

export default class CategoryItem extends Component {
  selectCategory = () => {
    const { onSelectCategory, item } = this.props;
    onSelectCategory(item);
  };

  render() {
    const { item, selected } = this.props;
    return (
      <TouchableOpacity
        onPress={this.selectCategory}
        style={selected ? styles.activeContainer : styles.container}
      >
        <Image
          style={selected ? styles.activeImage : styles.image}
          source={item.icon}
        />
        <Text style={selected ? styles.activeName : styles.name}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: sizeWidth(4),
    margin: sizeWidth(4),
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: sizeWidth(6),
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2
  },
  activeContainer: {
    padding: sizeWidth(4),
    margin: sizeWidth(4),
    backgroundColor: appColor.primary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: sizeWidth(6),
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2
  },
  image: {
    width: sizeWidth(25),
    height: sizeWidth(25),
    marginRight: sizeWidth(6)
  },
  activeImage: {
    width: sizeWidth(25),
    marginRight: sizeWidth(6),
    height: sizeWidth(25),
    tintColor: "white"
  },
  activeName: {
    color: "white"
  },
  name: {}
});
