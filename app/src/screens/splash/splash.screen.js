import React, {Component, ReactNode} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {resetPage} from '../../actions/nav.action';
import {connect} from 'react-redux';
import {sizeWidth, sizeHeight} from '../../helpers/size.helper';
import {appColor, accountType} from '../../constants/app.constant';
import {
  getProfile,
  removeToken,
  removeProfile,
} from '../../helpers/storage.helper';
import Api from '../../api/api';
import {loadedProfile} from '../../actions/profile.action';
import { getCart } from "app/src/helpers/storage.helper";
import { addToCart } from "app/src/actions/cart.action";
class SplashScreen extends Component {
  render(): ReactNode {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="stretch"
          source={require('app/res/icon/bp_logo.png')}
          style={styles.image}
        />
      </View>
    );
  }

  componentDidMount = async () => {
    const profile = await getProfile();
    const cart = await getCart();
    if (!!cart && Array.isArray(JSON.parse(cart))) {
        JSON.parse(cart).map(item => {
            this.props.addToCart(item);
        });
    }

    setTimeout(async () => {
      try {
        if (profile) {
          const newProfile =
            profile.type === accountType.agency
              ? await Api.agencyInfo()
              : await Api.saleInfo();
          this.props.loadedProfile({...profile, ...newProfile});
          if (profile.type === accountType.agency) {
            this.props.resetPage('Main');
          } else {
            this.props.resetPage('SaleMain');
          }
        } else {
          this.props.resetPage('Login');
        }
      } catch (err) {
        await removeToken();
        await removeProfile();
        this.props.resetPage('Login');
      }
    }, 1000);
  };
}

export default connect(null, {resetPage, loadedProfile, addToCart})(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: sizeWidth(300),
    height: sizeHeight(300),
  },
});
