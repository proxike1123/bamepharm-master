import React, {Component} from 'react';
import moment from 'moment';
import {StyleSheet, FlatList, View} from 'react-native';
import {sizeWidth} from '../../helpers/size.helper';
import MonthItem from './month-item';
import HeaderProductItem from 'app/src/screens/home/header-product-item';
export default class MonthList extends Component {
  render() {
    let months = [];
    let current = moment();
    for (let numOfMonth = 12; numOfMonth > 0; numOfMonth--) {
      months.push({
        title: `Tháng ${current.get('months') + 1}/${current.get('years')}`,
        month: current.get('months') + 1,
        year: current.get('years'),
      });
      current = current.add('months', -1);
    }

    return (
      <View style={styles.container}>
        <HeaderProductItem hideViewAll title={'Sản phẩm theo tháng'} />
        <FlatList
          contentContainerStyle={styles.body}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={months}
          renderItem={({item}) => <MonthItem item={item} title={item.title} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    marginBottom: sizeWidth(6),
    marginTop: sizeWidth(10),
    fontWeight: '500',
    paddingHorizontal: sizeWidth(12),
  },
  body: {
    paddingHorizontal: sizeWidth(5),
  },
});
