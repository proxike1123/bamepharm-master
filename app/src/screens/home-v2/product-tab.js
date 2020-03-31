import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import ProductList from 'app/src/screens/home/product-list';
import MonthList from 'app/src/screens/home/month-list';
import {connect} from 'react-redux';
import {navigateToPage} from 'app/src/actions/nav.action';
import LoadingIndicator from 'app/src/components/common/loading-indicator';
import {appColor} from 'app/src/constants/app.constant';
import Api from '../../api/api';

class HomeTabProduct extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      listProduct: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.handleFetchProductByCategory();
  }

  handleFetchProductByCategory = async () => {
    let {profile, categoryId} = this.props;
    if (!categoryId) return this.setState({loading: false, refreshing: false});
    try {
      const response = await Api.homeProducts(categoryId, profile.type);
      this.setState({listProduct: response[0]});
    } catch (e) {}
    this.setState({loading: false, refreshing: false});
  };

  navigateToProductList = category => {
    this.props.navigateToPage('ProductByCategory', {category});
  };

  onRefresh = () => {
    this.setState({refreshing: true}, () => {
      this.handleFetchProductByCategory();
    });
  };

  render() {
    let {listProduct, loading, refreshing} = this.state;
    const {categoryId} = this.props;
    return (
      <View style={styles.container}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {Object.keys(listProduct).map(it => {
              return (
                <ProductList
                  products={listProduct[it].data}
                  onSeeAll={() =>
                    this.navigateToProductList({
                      name: it,
                      categoryRoot: categoryId,
                      id: listProduct[it].category_id,
                    })
                  }
                  rows={1}
                  title={it}
                  key={it}
                />
              );
            })}
            <MonthList />
          </ScrollView>
        )}
      </View>
    );
  }
}

HomeTabProduct.propTypes = {
  categoryId: PropTypes.any,
};

HomeTabProduct.defaultProps = {};

export default connect(state => ({profile: state.profile.profile}), {
  navigateToPage,
})(HomeTabProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
  },
});
