import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toolbar from 'app/src/components/common/toolbar';
import styleBase from 'app/src/styles/base';
import lodash from 'lodash';
import BackIcon from 'app/src/components/common/back-icon';
import OrderDetailItem from 'app/src/screens/orderDetail/order-detail-item';
import {sizeWidth} from 'app/src/helpers/size.helper';

class DetailListScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderTitle = () => {
    return (
      <Text style={[styleBase.text18, styleBase.textWhite, styleBase.textBold]}>
        Danh sách sản phẩm
      </Text>
    );
  };

  render() {
    const {list} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Toolbar center={this.renderTitle()} left={<BackIcon />} />
        <KeyboardAwareScrollView
          ref={ref => (this.scrollView = ref)}
          contentContainerStyle={[styles.content]}>
          {lodash.isArray(list) &&
            list.map((item, index) => (
              <OrderDetailItem key={index.toString()} item={item} />
            ))}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  null,
)(DetailListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: sizeWidth(60),
  },
});
