import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import { appColor } from "../../constants/app.constant";

export default class BottomTabIcon extends Component {
  render() {
    const { icon, focused, source } = this.props;
    const tintColorStyle = focused ? styles.active : styles.inactive;
    return (
      <Image
        resizeMode="stretch"
        source={source}
        style={[styles.icon, tintColorStyle]}
      />
    );
  }
}

BottomTabIcon.propTypes = {
  icon: PropTypes.any
};

const styles = StyleSheet.create({
  icon: {
    width: sizeWidth(24),
    height: sizeWidth(24)
  },
  active: {
    tintColor: appColor.primary
  },
  inactive: {
    tintColor: appColor.icon
  }
});
