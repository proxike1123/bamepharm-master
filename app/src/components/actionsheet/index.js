import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  PanResponder,
  StyleSheet
} from 'react-native';
import styleBase from "app/src/styles/base";

const TIMING_CONFIG = { duration: 200, easing: Easing.inOut(Easing.ease) };

class ActionSheetWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      transformY: new Animated.Value(300)
    };

    this.requestClose = this.requestClose.bind(this);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dy > 30) {
          return true;
        }
        return false;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < 0) return;
        this.setState({
          transformY: new Animated.Value(gestureState.dy)
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.vy >= 0.5 || gestureState.dy >= 50) {
          Animated.timing(this.state.transformY, {
            toValue: 300,
            easing: Easing.linear,
            duration: 200,
            useNativeDriver: true
          }).start(this.props.onRequestClose);
        } else {
          Animated.spring(this.state.transformY, {
            toValue: 0,
            easing: Easing.linear,
            useNativeDriver: true
          }).start();
        }
      },
    });
  }

  requestClose() {
    Animated.timing(this.state.transformY, {
      toValue: 300,
      ...TIMING_CONFIG,
      useNativeDriver: true
    }).start(this.props.onRequestClose);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      Animated.spring(this.state.transformY, {
        toValue: 0,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  }

  render() {
    let opacity = this.state.transformY.interpolate({
      inputRange: [0, 150, 300],
      outputRange: [1, 0.7, 0]
    });

    return <Modal animationType={'none'}
                  visible={this.props.visible}
                  onRequestClose={this.props.onRequestClose}
                  transparent={true}>
      <TouchableWithoutFeedback onPress={this.requestClose}>
        <Animated.View style={[styleBase.fillParent, styleBase.overlay, { opacity }]}/>
      </TouchableWithoutFeedback>
      <Animated.View style={[
        { transform: [{ translateY: this.state.transformY }] }, styles.content]}
                     {...this.panResponder.panHandlers}>
        {this.props.children}
      </Animated.View>
    </Modal>;
  }
}

ActionSheetWrapper.propTypes = {
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
};
ActionSheetWrapper.defaultProps = {
  visible: false,
  onRequestClose: () => {
  }
};

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  }
});

export default ActionSheetWrapper;
