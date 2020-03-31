import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {sizeWidth} from '../../helpers/size.helper';
import {appColor} from '../../constants/app.constant';
import LinearGradient from 'react-native-linear-gradient';

export default class Toolbar extends Component {
  static propTypes = {
    left: PropTypes.object,
    center: PropTypes.object,
    right: PropTypes.object,
  };

  render() {
    const {left, center, right} = this.props;
    return (
      <View>
        <View style={styles.statusBar} />
        <LinearGradient
          colors={['#F98649', '#F04E23']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.container}>
          <View style={styles.left}>{left}</View>
          <View style={styles.center}>{center}</View>
          <View style={styles.right}>{right}</View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColor.primary,
  },
  container: {
    height: sizeWidth(56) + 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: appColor.primary,
    alignItems: 'center',
    elevation: 2,
  },
  left: {
    width: sizeWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: sizeWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
