import React, {Component, ReactNode} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {sizeWidth, sizeFont, sizeHeight} from '../../helpers/size.helper';
import {font, appColor} from '../../constants/app.constant';
import Text from './text';
import lodash from 'lodash';
import Dialog, {FadeAnimation} from 'react-native-popup-dialog';
import LoadingIndicator from './loading-indicator';

export default class Multichoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }

  render(): ReactNode {
    const {style, value, label, placeholder, path} = this.props;

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity onPress={this.showOptionPicker} style={styles.body}>
          <Text style={styles.value}>
            {value.length > 0
              ? value.map(item => lodash.get(item, path)).join(', ')
              : placeholder}
          </Text>
          <Image
            style={styles.expand}
            resizeMode="stretch"
            resizeMethod="resize"
            source={require('../../../res/icon/arrow-down.png')}
          />
        </TouchableOpacity>
        {this.renderChoiceDialog()}
      </View>
    );
  }

  renderChoiceDialog = () => {
    const {showOptions} = this.state;
    const {options, path, value} = this.props;
    return (
      <Dialog
        visible={showOptions}
        rounded={false}
        useNativeDriver={true}
        dialogStyle={styles.dialog}
        containerStyle={styles.popup}
        width={sizeWidth(320)}
        onTouchOutside={() => {
          this.setState({showOptions: false});
        }}
        dialogAnimation={
          new FadeAnimation({
            toValue: 0,
            animationDuration: 150,
            useNativeDriver: true,
          })
        }>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={options}
          removeClippedSubviews
          initialNumToRender={10}
          getItemLayout={(data, index) => ({
            length: sizeWidth(45),
            offset: sizeWidth(45) * index,
            index,
          })}
          extraData={value}
          renderItem={({item, index}) => {
            const selected = value.find(e => e[path] === item[path]);
            return (
              <View>
                <TouchableOpacity
                  onPress={() => this.selectItem(item)}
                  style={styles.item}>
                  <Text numberOfLines={1} style={styles.text}>
                    {item[path]}
                  </Text>
                  {!!selected && (
                    <Image
                      style={styles.check}
                      source={require('../../../res/icon/check-mark.png')}
                    />
                  )}
                </TouchableOpacity>
                <View style={styles.separator} />
              </View>
            );
          }}
        />
      </Dialog>
    );
  };

  selectItem = item => {
    const {onValueChange, value, path} = this.props;
    const isExist = value.find(e => e[path] === item[path]);
    if (!onValueChange) return;
    if (isExist) {
      onValueChange(value.filter(e => e[path] !== item[path]));
    } else {
      onValueChange([...value, item]);
    }
  };

  showOptionPicker = () => {
    this.setState({showOptions: true});
  };
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: sizeWidth(5),
  },
  value: {
    fontSize: sizeFont(13),
    flex: 1,
    padding: 4,
    backgroundColor: '#EEEEEE',
    fontFamily: font.regular,
  },
  line: {
    width: '100%',
    height: 1,
    marginTop: sizeWidth(6),
    backgroundColor: appColor.blur,
  },
  expand: {
    width: sizeWidth(10),
    marginLeft: sizeWidth(12),
    height: sizeWidth(6),
  },
  label: {
    fontFamily: font.medium,
    fontWeight: '500',
    fontSize: sizeFont(13),
    marginRight: sizeWidth(10),
  },
  item: {
    height: sizeWidth(45),
    flexDirection: 'row',
    paddingHorizontal: sizeWidth(12),
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  popup: {justifyContent: 'flex-end'},
  dialog: {
    maxHeight: sizeHeight(400),
  },
  separator: {
    height: 1,
    backgroundColor: appColor.blur,
  },
  check: {
    tintColor: appColor.blur,
    width: sizeWidth(10),
    height: sizeWidth(10),
    marginRight: sizeWidth(12),
  },
  noResults: {
    color: '#979797',
    fontSize: sizeFont(13),
    fontStyle: 'italic',
  },
});
