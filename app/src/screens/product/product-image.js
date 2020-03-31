import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Dimensions, StyleSheet, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {sizeWidth} from '../../helpers/size.helper';
import {imageFullpath} from '../../helpers/url.helper';
import BackIcon from 'app/src/components/common/back-icon';

export class ProductImageScreen extends Component {
  render() {
    let {url} =
      (!!this.props.navigation && this.props.navigation.state.params) || {};
    console.log(url);
    return (
      <View style={styles.container}>
        <BackIcon style={styles.close} />
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').width}>
          <Image
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width,
            }}
            source={{
              uri: imageFullpath(url, true),
            }}
          />
        </ImageZoom>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductImageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  close: {
    position: 'absolute',
    top: sizeWidth(30),
    left: sizeWidth(10),
    zIndex: 1000,
  },
});
