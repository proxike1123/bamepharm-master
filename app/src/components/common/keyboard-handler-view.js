import React, { Component } from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";

export default class KeyboardHandlerView extends Component {
  render() {
    const { behavior, style, children, keyboardVerticalOffset } = this.props;
    if (Platform.OS === "ios") {
      return (
        <KeyboardAvoidingView
          behavior={behavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={style}
        >
          {children}
        </KeyboardAvoidingView>
      );
    } else {
      return <View style={style}>{children}</View>;
    }
  }
}
