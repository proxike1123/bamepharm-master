import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import styleBase from 'app/src/styles/base';
import {sizeFont, sizeWidth} from 'app/src/helpers/size.helper';
import {appColor, font} from 'app/src/constants/app.constant';

class HeaderProductItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {title, hideViewAll, onSeeAll, style} = this.props;

    return (
      <View
        style={[
          styleBase.p_10_vertical,
          styleBase.row,
          styleBase.spaceBetween,
          styleBase.alignCenter,
          styleBase.p_10_horizontal,
          style,
        ]}>
        <View style={[styleBase.h100, styleBase.row, styleBase.alignCenter]}>
          <View style={[styles.line]} />
          <Text style={[styles.title]}>{title.toUpperCase()}</Text>
        </View>
        {!hideViewAll && (
          <View style={[styleBase.row, styleBase.alignCenter]}>
            <Text style={[styles.see_all]} onPress={onSeeAll}>
              Xem tất cả
            </Text>
            <Image
              style={[styles.iconSeeMore]}
              source={require('app/res/icon/ic_forward.png')}
            />
          </View>
        )}
      </View>
    );
  }
}

HeaderProductItem.propTypes = {
  onSeeAll: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.any,
};

HeaderProductItem.defaultProps = {
  onSeeAll: () => {},
  title: '',
};

export default HeaderProductItem;

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    // color: appColor.primary,
    color: '#1C1C1C',
    // fontFamily: font.bold,
    paddingHorizontal: sizeWidth(10),
  },
  see_all: {
    marginRight: sizeWidth(5),
    color: '#4A4A4A',
    fontSize: sizeFont(13),
    fontFamily: font.regular,
  },
  iconSeeMore: {
    width: sizeWidth(8),
    marginTop: sizeWidth(2.5),
    height: sizeWidth(8),
  },
  line: {
    height: '100%',
    width: sizeWidth(2.5),
    backgroundColor: '#1C1C1C',
    // backgroundColor: appColor.primary,
  },
});
