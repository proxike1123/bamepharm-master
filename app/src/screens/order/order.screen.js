import React, {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  resetPage,
  navigateToPage,
  navigateBack,
} from '../../actions/nav.action';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Text from '../../components/common/text';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import Button from '../../components/common/button-v2';
import {font, appColor, text} from '../../constants/app.constant';
import Toolbar from '../../components/common/toolbar';
import BackIcon from '../../components/common/back-icon';
import OrderItem from './order-item';
import numeral from 'numeral';
import lodash from 'lodash';
import CacheImage from '../../components/common/cache-image';
import {imageFullpath} from '../../helpers/url.helper';
import Toast from 'react-native-root-toast';
import {addToCart} from 'app/src/actions/cart.action';
import NumberInput from 'app/src/components/number-input';
import styleBase from 'app/src/styles/base';
import ProductDetailToolbar from 'app/src/screens/product/product-detail-toolbar';

const DURATION_ANIMATED = 550;

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    const {product} = this.props.navigation.state.params;
    const colors = Object.values(product.color) || [];
    const sizes = Object.values(product.size) || [];
    this.state = {
      quantityAll: '0',
      loading: false,
      keyboardShown: false,
      selectedItem: null,
      selectedColor: 0,
      comment: this.getComment(),
      order: (colors || []).map(cl => ({
        color: cl,
        sizes: (sizes || []).map(sz => ({
          size: sz,
          quantity: this.getQuantity(sz, cl),
        })),
      })),
    };

    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.opacity = new Animated.Value(0);
    this.scale = new Animated.Value(0);

    this.positionYButton = {x: 0, y: 0};
  }

  componentDidMount() {
    this.setState({
      animatedXY: new Animated.ValueXY({
        x: this.positionYButton.x,
        y: this.positionYButton.y,
      }),
    });

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({
        keyboardShown: true,
      }),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({
        keyboardShown: false,
      }),
    );
  }

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  getComment = () => {
    const {cart} = this.props.cart;
    if (lodash.isArray(cart)) {
      let cartLocal = cart.slice();

      const {product} = this.props.navigation.state.params;

      if (!cartLocal || !Array.isArray(cartLocal)) return '';
      let pro = cartLocal.find(item => item.id === product.id);

      let products = (!!pro && pro.products) || {};
      const item = Object.values(products)[0];
      return item ? item.comment : '';
    }

    return '';
  };

  getQuantity = (size, color) => {
    const {cart} = this.props.cart;
    if (lodash.isArray(cart)) {
      let cartLocal = cart.slice();

      const {product} = this.props.navigation.state.params;

      if (!cartLocal || !Array.isArray(cartLocal)) return 0;
      let pro = cartLocal.find(item => item.id === product.id);

      let products = (!!pro && pro.products) || {};
      let quantity = Object.values(products).find(
        item => item.size == size && item.color_name == color,
      );
      return (quantity && quantity.qty) || 0;
    }

    return 0;
  };

  handleChangeText = text => {
    this.setState({
      quantityAll: text,
    });
  };

  handleBlur = () => {
    let {order, selectedColor, quantityAll} = this.state;

    if (isNaN(parseInt(quantityAll))) return this.setState({quantityAll: '0'});

    order = (order || []).map((e, i) => {
      if (i === selectedColor) {
        return {
          color: e.color,
          sizes: (e.sizes || []).map(size => {
            return {...size, quantity: parseInt(quantityAll)};
          }),
        };
      }
      return e;
    });

    this.setState({order});
  };

  onItemChange = item => {
    const {order, selectedColor} = this.state;
    this.setState({
      order: (order || []).map((e, i) => {
        if (i === selectedColor) {
          return {
            color: e.color,
            sizes: (e.sizes || []).map(size => {
              if (size.size === item.size) {
                return item;
              }
              return size;
            }),
          };
        }
        return e;
      }),
    });
  };

  renderColor = ({item, index}) => {
    const {selectedColor} = this.state;
    const count = lodash.sumBy(item.sizes, e => e.quantity);
    return (
      <TouchableOpacity
        onPress={() => this.setState({selectedColor: index})}
        style={styles.color}>
        <Text style={selectedColor === index ? styles.activeText : styles.text}>
          {item.color.toUpperCase()} ({count})
        </Text>
      </TouchableOpacity>
    );
  };

  renderColors = () => {
    const {selectedColor, order} = this.state;

    return (
      <View style={styles.top}>
        <FlatList
          data={order}
          bounces={false}
          extraData={selectedColor}
          contentContainerStyle={styles.content}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderColor}
        />
      </View>
    );
  };

  render(): ReactNode {
    const {order, keyboardShown, loading, comment, selectedColor} = this.state;
    const {product} = this.props.navigation.state.params;
    let scale = this.scale.interpolate({
      inputRange: [0, sizeWidth(400)],
      outputRange: [1, 0.4],
    });
    return (
      <View style={styles.container}>
        <ProductDetailToolbar title={'Thêm vào giỏ hàng'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.product}>
              <View onLayout={this.onLayoutImage}>
                <CacheImage
                  style={styles.image}
                  resizeMode="stretch"
                  resizeMethod="resize"
                  uri={imageFullpath(product.product[0].image, true)}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{product.product[0].name}</Text>
                <Text style={styles.price}>
                  {numeral(product.product[0].price).format('0,0')} VNĐ
                </Text>
              </View>
            </View>

            {this.renderColors()}
          </View>
        </TouchableWithoutFeedback>
        <KeyboardAwareScrollView extraHeight={sizeWidth(200)}>
          <View style={styles.line} />
          <View style={styles.header}>
            <Text style={styles.size}>Size</Text>
            <Text style={styles.quantity}>SL</Text>
          </View>
          <View style={[styles.header, styleBase.p_5_vertical]}>
            <Text style={styles.size}> </Text>
            <NumberInput
              onChangeText={this.handleChangeText}
              onBlur={this.handleBlur}
              value={this.state.quantityAll}
            />
          </View>
          {((order[selectedColor] || {}).sizes || []).map((item, index) => (
            <OrderItem
              product={product}
              key={index.toString()}
              item={item}
              onItemChange={this.onItemChange}
              onColorPress={() => this.showColorPicker(item)}
            />
          ))}
          <View style={styles.note}>
            <Text style={styles.label}>Ghi chú</Text>
            <View style={[styles.input_container]}>
              <TextInput
                value={comment}
                placeholder={'Ghi chú dành cho sản phẩm này (có thể để trống)'}
                onChangeText={text => this.setState({comment: text})}
                multiline
                style={styles.input}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {!keyboardShown && (
          <>
            <View style={styles.total}>
              <Text style={styles.final}>TỔNG CỘNG: </Text>
              <Text style={styles.sum}>
                {numeral(
                  product.product[0].price *
                    lodash.sumBy(order, e =>
                      lodash.sumBy(e.sizes, i => i.quantity),
                    ),
                ).format('0,0')}{' '}
                VNĐ
              </Text>
            </View>
            <Button
              loading={loading}
              onPress={this.makeOrder}
              style={styles.button}
              text="THÊM VÀO GIỎ HÀNG"
            />
          </>
        )}
        <Animated.View
          style={[
            styles.animated_image,
            {
              top: this.translateY,
              left: this.translateX,
              opacity: this.opacity,
              transform: [{scale}],
            },
          ]}>
          <CacheImage
            style={styles.image}
            resizeMode="stretch"
            resizeMethod="resize"
            uri={imageFullpath(product.product[0].image, true)}
          />
        </Animated.View>
      </View>
    );
  }

  onLayoutImage = event => {
    this.translateX = new Animated.Value(event.nativeEvent.layout.x);
    this.translateY = new Animated.Value(
      event.nativeEvent.layout.y + sizeWidth(66),
    );
    this.opacity = new Animated.Value(1);

    this.forceUpdate();
  };

  buildProductsToSubmit = () => {
    const {product} = this.props.navigation.state.params;
    const {order, comment} = this.state;
    let products = [];
    let index = 0;
    for (let i = 0; i < order.length; i++) {
      const color = order[i].color;
      for (let j = 0; j < order[i].sizes.length; j++) {
        if (order[i].sizes[j].quantity >= 1) {
          products.push({
            index,
            product_id: product.product[0].id,
            color_name: color,
            comment,
            size: order[i].sizes[j].size,
            qty: order[i].sizes[j].quantity,
          });
          index++;
        }
      }
    }
    if (products.length === 0) {
      return null;
    }
    products = lodash.keyBy(products, 'index');
    return products;
  };

  makeOrder = async () => {
    const {product} = this.props.navigation.state.params;
    const {order, comment} = this.state;

    const total =
      product.product[0].price *
      lodash.sumBy(order, e => lodash.sumBy(e.sizes, i => i.quantity));

    const products = this.buildProductsToSubmit();

    if (!products) {
      return Toast.show('Vui lòng chọn số lượng quý khách muốn đặt.');
    }

    Animated.parallel([
      Animated.timing(this.translateX, {
        toValue: sizeWidth(360),
        duration: DURATION_ANIMATED,
      }),
      Animated.timing(this.translateY, {
        toValue: sizeWidth(0),
        duration: DURATION_ANIMATED,
      }),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: DURATION_ANIMATED,
      }),
      Animated.timing(this.scale, {
        toValue: sizeWidth(400),
        duration: DURATION_ANIMATED,
      }),
    ]).start(async () => {
      try {
        this.setState({
          loading: true,
        });

        const data = {
          total,
          comment,
          sub_images: product.sub_images,
          color: product.color,
          size: product.size,
          id: product.id,
          p_name: product.product[0].name,
          p_price: product.product[0].price,
          p_img: product.product[0].image,
          category_name: product.product[0].category_name,
          products,
        };

        await this.props.addToCart(data);

        Toast.show('Thêm sản phẩm vào giỏ hàng thành công');
        setTimeout(() => {
          this.props.navigateBack();
          this.props.navigateBack();
        }, 300);
      } catch (err) {
        this.setState({
          loading: false,
        });
      }
    });
  };
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, {
  resetPage,
  navigateToPage,
  navigateBack,
  addToCart,
})(OrderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
  },
  total: {
    flexDirection: 'row',
    padding: sizeWidth(12),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: font.bold,
    fontWeight: 'bold',
    fontSize: sizeFont(18),
  },
  final: {
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  sum: {
    fontFamily: font.bold,
    fontWeight: 'bold',
    color: appColor.primary,
  },
  button: {
    width: '90%',
    margin: sizeWidth(4),
  },
  image: {
    width: sizeWidth(100),
    height: sizeWidth(100),
    marginRight: sizeWidth(12),
  },
  info: {
    marginHorizontal: sizeWidth(6),
    flex: 1,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeWidth(12),
    paddingVertical: sizeWidth(12),
  },
  name: {
    fontFamily: font.bold,
    fontWeight: 'bold',
    fontSize: sizeFont(18),
  },
  price: {
    color: appColor.primary,
    marginTop: sizeWidth(4),
    fontFamily: font.bold,
    fontWeight: 'bold',
    fontSize: sizeFont(18),
  },
  add: {
    tintColor: appColor.primary,
    width: sizeWidth(30),
    height: sizeWidth(30),
  },
  line: {
    height: 1,
    backgroundColor: appColor.primary,
    width: sizeWidth(414),
  },
  text: {
    fontSize: sizeFont(16),
  },
  activeText: {
    fontSize: sizeFont(16),
    fontFamily: font.bold,
    fontWeight: 'bold',
    color: appColor.primary,
  },
  size: {
    flex: 1,
  },
  height: {
    width: sizeWidth(65),
    textAlign: 'center',
    alignItems: 'center',
  },
  quantity: {
    width: sizeWidth(65),
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    width: sizeWidth(414),
    padding: sizeWidth(12),
    backgroundColor: 'white',
  },
  note: {
    padding: sizeWidth(12),
  },
  content: {
    paddingHorizontal: sizeWidth(10),
  },
  color: {
    paddingVertical: sizeWidth(6),
    paddingHorizontal: sizeWidth(12),
  },
  label: {
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  input_container: {
    borderWidth: 1,
    marginTop: sizeWidth(5),
    backgroundColor: 'white',
    borderRadius: sizeWidth(10),
    borderColor: '#DDDDDD',
    paddingHorizontal: sizeWidth(5),
    paddingVertical: sizeWidth(5),
  },
  input: {
    textAlignVertical: 'top',
    fontSize: sizeFont(15),
    fontFamily: font.medium,
    fontWeight: '500',
    height: sizeWidth(120),
    paddingVertical: 0,
  },
  animated_image: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: sizeWidth(12),
    zIndex: 9999,
  },
});
