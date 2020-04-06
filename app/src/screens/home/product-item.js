import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {sizeWidth, sizeFont, sizeHeight} from '../../helpers/size.helper';
import Text from '../../components/common/text';
import {font, appColor} from '../../constants/app.constant';
import {navigateToPage} from '../../actions/nav.action';
import numeral from 'numeral';
import {imageFullpath} from '../../helpers/url.helper';
import CacheImage from '../../components/common/cache-image';
import styleBase from 'app/src/styles/base';

class ProductItem extends Component {
  render() {
    const {item, style, isBigSize} = this.props;
    return (
      <TouchableOpacity
        onPress={this.navigateToProduct}
        style={[
          isBigSize ? styles.bigItemContainer : styles.container,
          styleBase.shadow,
          style,
        ]}>
        <CacheImage
          resizeMode="stretch"
          resizeMethod="resize"
          style={styles.image}
          uri={imageFullpath(item.image)}
        />
        {item.new > 0 && (
          <View style={styles.newBadgeContainer}>
            <Image
              source={require('../../../res/icon/new2.png')}
              resizeMode="contain"
              style={styles.newBadgeImage}
            />
          </View>
        )}
        {item.hot > 0 && (
          <View style={styles.hotBadgeContainer}>
            <Image
              source={require('../../../res/icon/hot2.png')}
              resizeMode="contain"
              style={styles.hotBadgeImage}
            />
            {/* <Text style={styles.hotBadgeText}>HOT</Text> */}
          </View>
        )}
        <View style={styles.content}>
          <Text numberOfLines={3} style={styles.name}>
            {item.name}
          </Text>
          <Text style={styles.price}>
            {item.moneypromo
              ? numeral(item.moneypromo).format('0,0')
              : numeral(item.price).format('0,0')}{' '}
            VNĐ
          </Text>
          {/* {item.moneypromo > 0 && (
            <Text style={styles.oldPrice}>
              {numeral(item.price).format('0,0')} VNĐ
            </Text>
          )} */}
        </View>
      </TouchableOpacity>
    );
  }

  navigateToProduct = () => {
    const {item} = this.props;
    this.props.navigateToPage('Product', {product: item});
  };
}

export default connect(null, {navigateToPage})(ProductItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: sizeWidth(120),
    marginVertical: sizeWidth(5),
    marginHorizontal: sizeWidth(5),
    alignItems: 'center',
    borderRadius: sizeWidth(6),
    overflow: 'hidden',
  },
  oldPrice: {
    marginTop: sizeWidth(6),
    textAlign: 'center',
    fontSize: sizeFont(11),
    fontFamily: font.bold,
    color: appColor.blur,
    textDecorationLine: 'line-through',
  },
  bigItemContainer: {
    paddingTop: sizeHeight(40),
    backgroundColor: 'white',
    width: sizeWidth(170),
    marginVertical: sizeWidth(7),
    marginHorizontal: sizeWidth(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: sizeWidth(8),
    overflow: 'hidden',
  },
  name: {
    textAlign: 'center',
    minHeight: 55,
  },
  content: {
    padding: sizeWidth(6),
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: sizeWidth(118),
    height: sizeWidth(90),
  },
  price: {
    marginTop: sizeWidth(6),
    textAlign: 'center',
    fontFamily: font.bold,
  },
  newBadgeContainer: {
    width: 28,
    height: 28,
    position: 'absolute',
    top: 8,
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadgeImage: {
    marginTop: -25,
    marginLeft: 7,
    width: 28,
    height: 28,
  },
  newBadgeText: {
    position: 'absolute',
    fontSize: sizeFont(10),
    fontFamily: font.bold,
    textAlign: 'center',
    color: 'white',
    lineHeight: 28,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    transform: [{rotate: '5deg'}],
  },
  hotBadgeContainer: {
    width: 36,
    height: 36,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotBadgeImage: {
    marginTop: -15,
    marginLeft: -10,
    width: 20,
    height: 20,
  },
  hotBadgeText: {
    position: 'absolute',
    fontSize: sizeFont(10),
    fontFamily: font.bold,
    textAlign: 'center',
    color: 'white',
    lineHeight: 32,
    left: 0,
    right: 0,
    top: 8,
    bottom: 0,
    transform: [{rotate: '-5deg'}],
  },
  hotIcon: {},
});
