import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import Text from '../../components/common/text';
import {appColor} from '../../constants/app.constant';
import TouchableIcon from '../../components/common/touchable-icon';

export default class OrderItem extends Component {
  render() {
    const {item, onItemChange} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.size}>{item.size}</Text>
          <View style={styles.quantity}>
            <TouchableIcon
              iconStyle={styles.icon}
              onPress={() =>
                onItemChange({
                  ...item,
                  quantity:
                    item.quantity > 0 ? item.quantity - 1 : item.quantity,
                })
              }
              source={require('../../../res/img/minus_2.png')}
            />
            <TextInput
              style={styles.input}
              value={item.quantity.toString()}
              keyboardType="number-pad"
              onChangeText={text =>
                onItemChange({...item, quantity: parseInt(text, 10) || 0})
              }
            />
            <TouchableIcon
              onPress={() =>
                onItemChange({...item, quantity: item.quantity + 1})
              }
              iconStyle={styles.icon}
              source={require('../../../res/img/plus_2.png')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: sizeWidth(4),
    backgroundColor: 'white',
    padding: sizeWidth(12),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: sizeWidth(12),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    width: sizeWidth(40),
    height: sizeWidth(40),
    marginHorizontal: sizeWidth(5),
  },
  height: {
    width: sizeWidth(65),
    alignItems: 'center',
  },
  quantity: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: sizeWidth(15),
    height: sizeWidth(15),
    tintColor: appColor.icon,
  },
  text: {
    height: sizeWidth(20),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  input: {
    height: sizeWidth(20),
    fontSize: sizeFont(14),
    marginHorizontal: sizeWidth(10),
    color: '#444444',
    padding: 0,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  size: {
    flex: 1,
  },
});
