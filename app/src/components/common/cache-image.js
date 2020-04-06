import React, {Component} from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

export default class CacheImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: false,
    };
  }

  renderPlaceHolder = () => {
    const {style, resizeMode} = this.props;
    const placeholder =
      this.props.placeholder || require('../../../res/icon/default-image.png');
    return (
      <Image
        resizeMode={resizeMode || 'contain'}
        resizeMethod="resize"
        style={style}
        source={placeholder}
      />
    );
  };

  renderImage = () => {
    const {uri, style, resizeMode} = this.props;
    return (
      <Image
        onError={() => this.setState({failed: true})}
        style={style}
        onLoad={this.onLoad}
        source={{
          uri: uri,
        }}
        resizeMode={resizeMode}
      />
    );
  };

  render() {
    const {uri} = this.props;
    const {failed} = this.state;
    if (uri && !failed) {
      return this.renderImage();
    } else {
      return this.renderPlaceHolder();
    }
  }
}

CacheImage.propTypes = {
  uri: PropTypes.string,
  resizeMode: PropTypes.string,
  priority: PropTypes.string,
  placeholder: PropTypes.any,
};
