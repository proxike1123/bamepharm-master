import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import styleBase from 'app/src/styles/base';
import {font} from 'app/src/constants/app.constant';
import {sizeFont, sizeWidth} from 'app/src/helpers/size.helper';

class LoadingIndicator extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {style, text, backgroundColor} = this.props;

    return (
      <View
        style={[
          styles.container,
          styleBase.fullParent,
          styleBase.fillParent,
          styleBase.overlay,
          styleBase.center,
          style,
        ]}>
        <View style={[styles.content, styleBase.center, {backgroundColor}]}>
          <ActivityIndicator color={'#999'} size={'large'} />
          {!!text && <Text style={[styles.text]}>{text}</Text>}
        </View>
      </View>
    );
  }
}

LoadingIndicator.propTypes = {
  style: PropTypes.any,
  text: PropTypes.string,
  backgroundColor: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  text: 'Đang tải...',
  backgroundColor: '#fff',
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: sizeWidth(90),
    height: sizeWidth(80),
    borderRadius: sizeWidth(6),
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: font.medium,
    fontWeight: '500',
    fontSize: sizeFont(12),
    color: '#999',
    marginTop: 5,
  },
});
