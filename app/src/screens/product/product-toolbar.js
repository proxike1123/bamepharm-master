import {navigateToPage} from 'app/src/actions/nav.action';
import BackIcon from 'app/src/components/common/back-icon';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import styleBase from 'app/src/styles/base';
import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import SearchInput from '../../components/common/search-input';
import Text from '../../components/common/text';
import {appColor} from '../../constants/app.constant';
import {sizeWidth} from '../../helpers/size.helper';

class ProductToolbar extends Component {
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

  navigateToSearch = () => {
    this.props.navigateToPage('SearchProduct');
  };

  navigateToBarcode = () => {
    this.props.navigateToPage('Barcode');
  };

  render() {
    return (
      <LinearGradient
        colors={['#F98649', '#F04E23']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <View style={styles.left}>{<BackIcon />}</View>

        <SearchInput
          placeholder="Tìm kiếm sản phẩm"
          onPress={this.navigateToSearch}
          onIconPress={this.navigateToBarcode}
          autoFocus={false}
          style={styles.search}
        />

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
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {navigateToPage})(ProductToolbar);

const styles = StyleSheet.create({
  container: {
    height: sizeWidth(56) + 20,
    paddingTop: 20,
    backgroundColor: appColor.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: sizeWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    paddingLeft: sizeWidth(12),
    marginRight: 0,
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
    paddingHorizontal: sizeWidth(3),
    height: sizeWidth(16),
    borderRadius: sizeWidth(8),
    backgroundColor: 'white',
  },
});
