import {navigateToPage} from 'app/src/actions/nav.action';
import BackIcon from 'app/src/components/common/back-icon';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import styleBase from 'app/src/styles/base';
import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import Text from '../../components/common/text';
import Toolbar from '../../components/common/toolbar';
import {font} from '../../constants/app.constant';
import {sizeFont, sizeWidth} from '../../helpers/size.helper';

class ProductDetailToolbar extends Component {
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

  navigateToCart = () => {
    this.props.navigateToPage('Cart');
  };

  render() {
    return (
      <Toolbar
        left={<BackIcon />}
        center={<Text style={styles.title}>{this.props.title}</Text>}
        right={
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
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {navigateToPage})(ProductDetailToolbar);

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: sizeFont(18),
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
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
