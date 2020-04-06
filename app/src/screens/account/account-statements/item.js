import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {sizeWidth, sizeFont, sizeHeight} from '../../../helpers/size.helper';
import Text from '../../../components/common/text';
import {font, appColor} from '../../../constants/app.constant';
import {navigateToPage} from '../../../actions/nav.action';
import {connect} from 'react-redux';
import numeral from 'numeral';

class AccountStatementItem extends Component {
  render() {
    const {item, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>Từ ngày</Text>
            <Text style={styles.label}>Đến ngày</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.dateValue}>{item.from}</Text>
            <Text style={styles.dateValue}>{item.to}</Text>
          </View>
          <View style={styles.rightArrowBox}>
            <Image
              resizeMode="stretch"
              source={require('app/res/icon/right-arrow.png')}
              style={styles.rightArrow}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dư nợ đầu kì</Text>
            <Text style={styles.label}>Dư nợ cuối kì</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.danceMoney}>
              {numeral(item.startValue).format('0,0')} VNĐ
            </Text>
            <Text style={styles.danceMoney}>
              {numeral(item.endValue).format('0,0')} VNĐ
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  navigateToOrder = () => {
    const {item} = this.props;
    this.props.navigateToPage('Order', {product: item});
  };
}

export default connect(
  null,
  {navigateToPage},
)(AccountStatementItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: sizeWidth(15),
    marginVertical: sizeHeight(7),
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 8,
  },
  body: {
    paddingVertical: sizeWidth(15),
    flex: 1,
  },
  rightArrowBox: {
    alignItems: 'center',
  },
  rightArrow: {
    width: sizeWidth(20),
    height: sizeHeight(13),
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    color: appColor.textColor,
    fontSize: sizeFont(12),
    textAlign: 'left',
    flex: 1,
    paddingLeft: sizeWidth(15),
  },
  dateValue: {
    color: '#000000',
    fontSize: sizeFont(16),
    fontFamily: font.bold,
    flex: 1,
    paddingLeft: sizeWidth(15),
  },
  danceMoney: {
    color: appColor.primary,
    fontSize: sizeFont(16),
    fontFamily: font.bold,
    flex: 1,
    paddingLeft: sizeWidth(15),
  },
});
