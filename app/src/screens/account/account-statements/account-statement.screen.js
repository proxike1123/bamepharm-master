import React, {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {
  resetPage,
  navigateToPage,
  navigateBack,
} from '../../../actions/nav.action';
import {connect} from 'react-redux';
import Text from '../../../components/common/text';
import {sizeWidth, sizeHeight, sizeFont} from '../../../helpers/size.helper';
import Button from '../../../components/common/button';
import Input from '../../../components/common/input';
import {font, text, appColor} from '../../../constants/app.constant';
import Toolbar from '../../../components/common/toolbar';
import BackIcon from '../../../components/common/back-icon';
import DataRow from '../../../components/common/data-row';
import lodash from 'lodash';
import numeral from 'numeral';
import {loadCart} from '../../../actions/cart.action';
import EmptyView from '../../../components/common/empty-view';
import AccountStatementItem from './item';

const items = [
  {
    from: '01/01/2020',
    to: '01/01/2020',
    startValue: 20000000,
    endValue: 50000000,
  },
  {
    from: '02/02/2020',
    to: '02/02/2020',
    startValue: 20000000,
    endValue: 50000000,
  },
  {
    from: '01/01/2020',
    to: '01/01/2020',
    startValue: 20000000,
    endValue: 50000000,
  },
  {
    from: '02/02/2020',
    to: '02/02/2020',
    startValue: 20000000,
    endValue: 50000000,
  },
  {
    from: '01/01/2020',
    to: '01/01/2020',
    startValue: 20000000,
    endValue: 50000000,
  },
  {
    from: '02/02/2020',
    to: '02/02/2020',
    startValue: 20000000,
    endValue: 50000000,
  },
];

class AccountStatementsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          left={<BackIcon />}
          center={<Text style={styles.title}>Công nợ</Text>}
        />
        <ScrollView bounces={false} style={styles.body}>
          {items.map((item, index) => (
            <AccountStatementItem key={index.toString()} item={item} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    cart: state.cart,
  }),
  {resetPage, navigateToPage, loadCart, navigateBack},
)(AccountStatementsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
  },
  body: {
    marginTop: sizeHeight(8),
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: sizeFont(16),
  },
});
