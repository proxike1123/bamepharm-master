import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {sizeWidth} from '../../helpers/size.helper';
import {navigateBack, navigateToPage} from '../../actions/nav.action';
import styleBase from 'app/src/styles/base';
import ButtonWrapper from './button-wrapper';
import Text from './text';

class CartIcon extends Component {
  getCountProduct = () => {
    let {cart} = this.props.cart;
    if (!cart || !Array.isArray(cart)) {
      return 0;
    }
    const total = cart.reduce((count, item) => {
      if (item && item.products) {
        count += Object.values(item.products).reduce(
          (qty, e) => (qty += e.qty),
          0,
        );
      }

      return count;
    }, 0);
    return total <= 99 ? total : '99+';
  };

  render() {
    return (
      <ButtonWrapper onPress={this.navigateToCart} style={[styles.button]}>
        <Image
          source={require('app/res/icon/shopping-bag.png')}
          style={[styles.icon]}
        />
        <View style={[styles.badge, styleBase.center]}>
          <Text style={[styleBase.text11, styleBase.textBold]}>
            {this.getCountProduct()}
          </Text>
        </View>
      </ButtonWrapper>
    );
  }

  navigateToCart = () => {
    this.props.navigateToPage('Cart');
  };
}

export default connect(
  state => ({
    cart: state.cart,
  }),
  {navigateBack, navigateToPage},
)(CartIcon);

const styles = StyleSheet.create({
  button: {
    width: sizeWidth(48),
    height: sizeWidth(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: sizeWidth(22),
    height: sizeWidth(24),
  },
  badge: {
    position: 'absolute',
    bottom: sizeWidth(8),
    right: sizeWidth(8),
    minWidth: sizeWidth(16),
    marginHorizontal: sizeWidth(3),
    height: sizeWidth(16),
    borderRadius: sizeWidth(8),
    backgroundColor: 'white',
  },
});
