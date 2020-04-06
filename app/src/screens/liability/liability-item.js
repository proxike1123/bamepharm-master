import React, {PureComponent} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes, {number} from 'prop-types';
import {font, appColor} from '../../constants/app.constant';
import {sizeFont, sizeWidth, sizeHeight} from '../../helpers/size.helper';
import Text from '../../components/common/text';
import numeral from 'numeral';
import moment from 'moment';

class LiabilityItem extends PureComponent {
  render() {
    const {item} = this.props;
    const date = moment(item.month, 'YYYY-MM-DD');
    const start = date.startOf('month').format('DD/MM/YYYY');
    const end = date.endOf('month').format('DD/MM/YYYY');
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.label}>Từ ngày</Text>
          <Text style={styles.date}>{start}</Text>

          <Text style={[styles.label, styles.marginTop]}>Dư nợ đầu kì</Text>
          <Text style={styles.price}>
            {numeral(item.dudauky).format('0,0')} VNĐ
          </Text>

          <Text style={[styles.label, styles.marginTop]}>Phát sinh có</Text>
          <Text style={styles.dept}>
            {numeral(item.phatsinhco).format('0,0')} VNĐ
          </Text>
        </View>
        <Image
          style={styles.path}
          source={require('../../../res/icon/icon-path.png')}
        />
        <View style={styles.column}>
          <Text style={styles.label}>Đến ngày</Text>
          <Text style={styles.date}>{end}</Text>

          <Text style={[styles.label, styles.marginTop]}>Dư nợ cuối kì</Text>
          <Text style={styles.price}>
            {numeral(item.ducuoiky).format('0,0')} VNĐ
          </Text>

          <Text style={[styles.label, styles.marginTop]}>Phát sinh nợ</Text>
          <Text style={styles.dept}>
            {numeral(item.phatsinhno).format('0,0')} VNĐ
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: sizeWidth(16),
    marginVertical: sizeWidth(8),
    backgroundColor: 'white',
    borderRadius: sizeWidth(8),
    elevation: 1,
    padding: sizeWidth(16),
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  label: {
    flex: 1,
    fontSize: sizeFont(12),
    marginBottom: sizeWidth(4),
    color: '#4A4A4A',
  },
  date: {
    flex: 1,
    color: '#000000',
    fontSize: sizeFont(16),
    fontFamily: font.medium,
  },
  price: {
    color: '#F04E23',
    fontSize: sizeFont(16),
    fontFamily: font.bold,
    flex: 1,
  },
  dept: {
    color: '#DD0000',
    fontSize: sizeFont(16),
    fontFamily: font.bold,
    flex: 1,
  },
  path: {
    width: sizeWidth(20),
    height: sizeWidth(14),
    alignSelf: 'center',
    marginRight: sizeWidth(20),
    marginVertical: sizeWidth(4),
  },
  marginTop: {
    marginTop: sizeWidth(16),
  },
});

export default LiabilityItem;
