import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import Text from '../../components/common/text';
import numeral from 'numeral';
import lodash from 'lodash';
import {font, appColor} from '../../constants/app.constant';
import {navigateToPage} from '../../actions/nav.action';
import {connect} from 'react-redux';
import CacheImage from 'app/src/components/common/cache-image';
import styleBase from 'app/src/styles/base';
import {imageFullpath} from 'app/src/helpers/url.helper';

class CartItem extends Component {
  render() {
    const {item} = this.props;

    let {p_img, p_name, p_price, products} = item;
    return (
      <TouchableOpacity
        onPress={this.props.onEdit}
        style={[styles.container, styleBase.row]}>
        <View>
          <CacheImage uri={imageFullpath(p_img, true)} style={[styles.image]} />
        </View>
        <View style={[styleBase.container, styleBase.m_10_left]}>
          <Text style={[styleBase.textBold, styleBase.text16]}>{p_name}</Text>
          <View
            style={[
              styleBase.row,
              styleBase.alignCenter,
              styleBase.m_5_vertical,
            ]}>
            <Text style={[styles.text]}>{`Số lượng: `}</Text>
            <Text style={[styles.text, styleBase.textMedium]}>
              {this.getQuantity()}
            </Text>
          </View>
          <View style={[styleBase.row, styleBase.alignCenter]}>
            <Text style={[styles.text]}>{`Giá: `}</Text>
            <Text style={[styles.text, styleBase.textMedium]}>
              {numeral(p_price).format('0,0')} VND
            </Text>
          </View>
          <View style={[styles.option, styleBase.row]}>
            <Text style={[styles.edit]} onPress={this.props.onEdit}>
              Sửa
            </Text>
            <Text style={[styles.delete]} onPress={this.props.onDelete}>
              Xóa
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  getQuantity = () => {
    let {products} = this.props.item;
    products = Object.values(products);
    if (!lodash.isArray(products)) return 0;

    return lodash.sumBy(products, 'qty');
  };

  navigateToOrder = () => {
    const {item} = this.props;
    this.props.navigateToPage('Order', {product: item});
  };
}

export default connect(null, {navigateToPage})(CartItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizeWidth(12),
    paddingVertical: sizeWidth(8),
    backgroundColor: 'white',
    marginHorizontal: sizeWidth(10),
    marginVertical: sizeWidth(5),
    borderRadius: sizeWidth(10),
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: sizeWidth(85),
    height: sizeWidth(100),
  },
  name: {
    fontWeight: '500',
  },
  price: {
    color: appColor.primary,
    marginVertical: sizeWidth(4),
  },
  text: {
    fontSize: sizeFont(15),
    fontFamily: font.regular,
    color: '#4A4A4A',
    lineHeight: sizeFont(16),
  },
  option: {
    justifyContent: 'flex-end',
  },
  edit: {
    fontSize: sizeFont(15),
    fontFamily: font.bold,
    fontWeight: 'bold',
    color: '#11B400',
  },
  delete: {
    marginLeft: sizeWidth(20),
    fontSize: sizeFont(15),
    fontFamily: font.bold,
    fontWeight: 'bold',
    color: '#DD0000',
  },
});
