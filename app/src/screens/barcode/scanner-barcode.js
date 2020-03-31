import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styleBase from 'app/src/styles/base';
import Toolbar from 'app/src/components/common/toolbar';
import BackIcon from 'app/src/components/common/back-icon';
import {sizeWidth} from '../../helpers/size.helper';
import Api from 'app/src/api/api';
import {connect} from 'react-redux';
import {navigateToPage} from 'app/src/actions/nav.action';
import {accountType} from 'app/src/constants/app.constant';

class ScannerBarcodeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSuccess = async data => {
    if (data && data.data) {
      let response;
      try {
        if (this.props.profile.type === accountType.agency) {
          response = await Api.scanBarcode(data.data);
        } else {
          response = await Api.scanBarcodeSale(data.data);
        }

        if (response && response.product && Array.isArray(response.product)) {
          this.props.navigateToPage('Product', {product: response.product[0]});
        }
      } catch (e) {
        this.props.navigateToPage('NotFoundProduct', {barcode: data.data});
      }
    }
  };

  renderRectangle = () => {
    return (
      <View style={styles.rectangle}>
        <Image
          style={styles.topLeft}
          source={require('../../../res/icon/top-left.png')}
        />
        <Image
          style={styles.topRight}
          source={require('../../../res/icon/top-right.png')}
        />
        <Image
          style={styles.bottomLeft}
          source={require('../../../res/icon/bottom-left.png')}
        />
        <Image
          style={styles.bottomRight}
          source={require('../../../res/icon/bottom-right.png')}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={[styleBase.container]}>
        <Toolbar
          left={<BackIcon />}
          center={
            <Text
              style={[
                styleBase.text20,
                styleBase.textWhite,
                styleBase.textBold,
              ]}>
              Quét mã
            </Text>
          }
        />
        <View style={styles.body}>
          <QRCodeScanner
            onRead={this.onSuccess}
            reactivate={true}
            reactivateTimeout={5000}
            cameraStyle={[styles.camera]}
            topViewStyle={[styles.zeros]}
            bottomViewStyle={[styles.zeros]}
            containerStyle={[styleBase.container]}
          />
          <View style={styles.overlay}>{this.renderRectangle()}</View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({profile: state.profile.profile}), {
  navigateToPage,
})(ScannerBarcodeScreen);

const styles = StyleSheet.create({
  zeros: {
    height: 0,
    width: 0,
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  rectangle: {
    width: sizeWidth(203),
    height: sizeWidth(203),
  },
  topLeft: {
    width: sizeWidth(32),
    height: sizeWidth(32),
    top: 0,
    left: 0,
    position: 'absolute',
  },
  topRight: {
    width: sizeWidth(32),
    height: sizeWidth(32),
    top: 0,
    right: 0,
    position: 'absolute',
  },
  bottomLeft: {
    width: sizeWidth(32),
    height: sizeWidth(32),
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  bottomRight: {
    width: sizeWidth(32),
    height: sizeWidth(32),
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
  body: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
