import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ProductItem from './product-item';
import lodash from 'lodash';
import HeaderProductItem from 'app/src/screens/home/header-product-item';
import {sizeWidth} from 'app/src/helpers/size.helper';
import styleBase from 'app/src/styles/base';

export default class ProductList extends Component {
  render() {
    const {title, products, rows, onSeeAll = () => {}} = this.props;
    return (
      <View style={styles.container}>
        <HeaderProductItem title={title} onSeeAll={onSeeAll} />
        <FlatList
          data={rows === 2 ? lodash.chunk(products, 2) : products}
          horizontal={true}
          style={[styleBase.p_5_horizontal]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderProduct}
        />
      </View>
    );
  }

  renderProduct = ({item, index}) => {
    const {rows} = this.props;
    if (rows === 1) {
      return <ProductItem item={item} />;
    }
    if (rows === 2) {
      return (
        <View>
          <ProductItem item={item[0]} />
          {item[1] && <ProductItem item={item[1]} />}
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {},
});
