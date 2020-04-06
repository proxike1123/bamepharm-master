import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {sizeWidth} from '../../helpers/size.helper';
import Text from '../../components/common/text';
import {font} from '../../constants/app.constant';
import {navigateToPage} from '../../actions/nav.action';
import styleBase from 'app/src/styles/base';

const images = {
  1: require('../../../res/icon/months/1.png'),
  2: require('../../../res/icon/months/2.png'),
  3: require('../../../res/icon/months/3.png'),
  4: require('../../../res/icon/months/4.png'),
  5: require('../../../res/icon/months/5.png'),
  6: require('../../../res/icon/months/6.png'),
  7: require('../../../res/icon/months/7.png'),
  8: require('../../../res/icon/months/8.png'),
  9: require('../../../res/icon/months/9.png'),
  10: require('../../../res/icon/months/10.png'),
  11: require('../../../res/icon/months/11.png'),
  12: require('../../../res/icon/months/12.png'),
};
class MonthItem extends Component {
  navigateToProduct = () => {
    const {item} = this.props;
    this.props.navigateToPage('ProductByMonth', {month: item});
  };

  render() {
    const {
      title,
      item: {month},
    } = this.props;
    return (
      <TouchableOpacity
        onPress={this.navigateToProduct}
        style={[styles.container, styleBase.shadow]}>
        <Image
          source={images[month]}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.name}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, {navigateToPage})(MonthItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: sizeWidth(4),
    marginHorizontal: sizeWidth(4),
    paddingHorizontal: sizeWidth(6),
    paddingVertical: sizeWidth(6),
    alignItems: 'center',
    borderRadius: sizeWidth(6),
    overflow: 'hidden',
  },
  name: {
    textAlign: 'center',
    fontFamily: font.bold,
  },
  content: {
    padding: sizeWidth(6),
    paddingTop: 0,
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '90%',
  },
});
