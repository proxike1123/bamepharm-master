import React, {Component} from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {sizeWidth} from '../../helpers/size.helper';
import {navigateBack} from '../../actions/nav.action';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class BackIcon extends Component {
  render() {
    const {style, iconStyle, source} = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => {
          if (!!this.props.goBack) {
            return this.props.goBack();
          }

          this.props.navigateBack();
        }}>
        <Image
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
          source={source || require('../../../res/icon/back.png')}
        />
      </TouchableOpacity>
    );
  }
}

BackIcon.propTypes = {
  goBack: PropTypes.func
};

export default connect(null, {navigateBack})(BackIcon);

const styles = StyleSheet.create({
  container: {
    padding: sizeWidth(4),
  },
  icon: {
    width: sizeWidth(21),
    height: sizeWidth(21),
    tintColor: 'white',
  },
});
