import ChatButton from '../../components/chat-button';
import PhoneButton from '../../components/phone-button/index';
import Swiper from 'app/src/components/common/react-native-swiper';
import {videoFullpath} from 'app/src/helpers/url.helper';
import ProductVideo from 'app/src/screens/product/product-video';
import styleBase from 'app/src/styles/base';
import lodash from 'lodash';
import numeral from 'numeral';
import React, {Component, ReactNode} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import {navigateToPage, resetPage} from '../../actions/nav.action';
import Api from '../../api/api';
import Button from '../../components/common/button-v2';
import CacheImage from '../../components/common/cache-image';
import LoadingIndicator from '../../components/common/loading-indicator';
import Text from '../../components/common/text';
import {accountType, appColor, font} from '../../constants/app.constant';
import {sizeFont, sizeHeight, sizeWidth} from '../../helpers/size.helper';
import {imageFullpath} from '../../helpers/url.helper';
import ProductToolbar from './product-detail-toolbar';

class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      showVideo: false,
      showImage: false,
      imageUrl: '',
    };
  }

  navigateToOrder = () => {
    const {data} = this.state;
    const {product} = this.props.navigation.state.params;

    if (product && product.id) {
      this.props.navigateToPage('Order', {product: {...data, id: product.id}});
    }
  };

  componentDidMount = async () => {
    try {
      const {profile} = this.props.profile;
      const {product} = this.props.navigation.state.params;
      const data = await Api.productInfo(product.id, profile.type);
      this.setState({
        data,
        loading: false,
      });
    } catch (err) {
      this.setState({loading: false});
    }
  };

  render(): ReactNode {
    const {data, loading} = this.state;
    const {profile} = this.props.profile;
    let product;

    if (
      lodash.isArray(data.product) &&
      data.product.length > 0 &&
      !!data.product[0]
    ) {
      product = data.product[0];
    }

    let images = Object.values(lodash.get(data, 'sub_images', {}));
    if (product && product.image && images.length === 0) {
      images = [product.image, ...images];
    }

    let sliders = lodash.isArray(images)
      ? images.map((it, index) => {
          return (
            <View key={index} style={styles.slide}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigateToPage('ProductImage', {url: it})
                }>
                <CacheImage
                  style={styles.image}
                  uri={imageFullpath(it, true)}
                />
              </TouchableOpacity>
            </View>
          );
        })
      : [];
    if (product && !!product.video) {
      sliders.unshift(
        <TouchableOpacity
          style={[styles.video]}
          onPress={() => this.setState({showVideo: true})}>
          <Video
            ref={ref => (this.video = ref)}
            source={{uri: videoFullpath(product.video, true)}}
            resizeMode={'contain'}
            onError={err => console.log(err)}
            onLoad={() => this.video.seek(0)}
            paused={true}
            style={[styles.video]}
          />
          <View
            style={[
              styleBase.fullParent,
              styleBase.fillParent,
              styleBase.center,
            ]}>
            <Image
              source={require('app/res/icon/play-button.png')}
              style={styles.play}
            />
          </View>
        </TouchableOpacity>,
      );
    }

    return (
      <View style={styles.container}>
        <ProductToolbar title="Thông tin sản phẩm" />
        {loading ? (
          <LoadingIndicator style={[styleBase.fullParent, styleBase.bgWhite]} />
        ) : (
          <>
            <ScrollView contentContainerStyle={[]} bounces={false}>
              <View style={[styles.header]}>
                <View style={[styles.wrap]}>
                  <Swiper
                    style={[styleBase.center]}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                    paginationStyle={{
                      bottom: -sizeWidth(24),
                    }}
                    loop={false}>
                    {sliders}
                  </Swiper>
                </View>
              </View>
              <View
                style={[
                  styleBase.bgWhite,
                  styleBase.shadow,
                  styleBase.m_15_horizontal,
                  styles.content,
                ]}>
                <Text style={styles.name}>
                  {(!!product && product.name) || ''}
                </Text>
                <Text
                  style={[
                    styleBase.text13,
                    styleBase.textRegular,
                    styles.status,
                  ]}>
                  {!!product && product.available ? 'Phải đặt trước' : 'Có sẵn'}
                </Text>
                <Text style={styles.price}>
                  {numeral((!!product && product.price) || 0).format('0,0')} VNĐ
                </Text>
                {!!product && product.retail_price && (
                  <>
                    <Text style={[styleBase.m_5_left, styles.title]}>
                      {'Giá thị trường: '}
                      {numeral((!!product && product.retail_price) || 0).format(
                        '0,0',
                      )}{' '}
                      VNĐ
                    </Text>
                  </>
                )}
                <Text style={[styleBase.m_5_left, styles.title]}>
                  {'Màu sắc: '}
                </Text>
                <View
                  style={[
                    styleBase.container,
                    styles.row,
                    styleBase.row,
                    styleBase.alignCenter,
                  ]}>
                  <View
                    style={[
                      styleBase.container,
                      styleBase.row,
                      styleBase.wrap,
                    ]}>
                    {Object.values(data.color).map((item, index) => (
                      <View style={styles.chipColor}>
                        <Text style={styles.text}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <Text style={[styleBase.m_5_left, styles.title]}>
                  {'Size: '}
                </Text>
                <View
                  style={[styleBase.row, styles.row, styleBase.alignCenter]}>
                  <View
                    style={[
                      styleBase.container,
                      styleBase.row,
                      styleBase.wrap,
                    ]}>
                    {Object.values(data.size).map((item, index) => (
                      <View style={styles.chipSize}>
                        <Text style={styles.text}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                {!!data.product[0].material && (
                  <View
                    style={[styleBase.row, styles.row, styleBase.alignCenter]}>
                    <Text style={[styleBase.m_5_left, styles.title]}>
                      {'Chất liệu: '}
                    </Text>
                    <View
                      style={[
                        styleBase.container,
                        styleBase.row,
                        styleBase.wrap,
                      ]}>
                      <Text style={styles.text}>
                        {(!!product && product.material) || ''}
                      </Text>
                    </View>
                  </View>
                )}
                <View style={styles.html}>
                  <HTML
                    baseFontStyle={{
                      fontFamily: font.regular,
                      color: appColor.text,
                      fontSize: sizeFont(14),
                    }}
                    ignoredStyles={[
                      'font-family',
                      'font-weight',
                      'letter-spacing',
                      'line-height',
                      'display',
                      'font-size',
                    ]}
                    html={(!!product && product.content) || ''}
                    imagesMaxWidth={sizeWidth(402)}
                  />
                  {!!product.video && (
                    <ProductVideo
                      visible={this.state.showVideo}
                      closeModal={() => this.setState({showVideo: false})}
                      video={product.video}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
          </>
        )}
        <View style={styles.bottom}>
          <Button
            onPress={this.navigateToOrder}
            style={styles.button}
            text="THÊM VÀO GIỎ HÀNG"
          />
          {profile.type === accountType.agency && (
            <View style={styles.actions}>
              <PhoneButton product={product} />
              <ChatButton product={product} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  {resetPage, navigateToPage},
)(ProductScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginVertical: sizeWidth(15),
    paddingHorizontal: sizeWidth(10),
    borderRadius: sizeWidth(10),
  },
  row: {
    marginVertical: sizeWidth(5),
  },
  header: {
    height: sizeWidth(264),
  },
  image: {
    height: sizeWidth(302),
    width: sizeWidth(320),
  },
  item: {
    width: sizeWidth(320),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: sizeFont(20),
    fontFamily: font.medium,
    marginTop: sizeWidth(10),
    paddingHorizontal: sizeWidth(5),
    color: '#000',
  },
  retailPrice: {
    fontSize: sizeFont(24),
    fontFamily: font.bold,
    color: appColor.primary,
    paddingHorizontal: sizeWidth(5),
    marginVertical: sizeWidth(5),
  },
  price: {
    fontSize: sizeFont(24),
    fontFamily: font.bold,
    color: appColor.primary,
    paddingHorizontal: sizeWidth(5),
    marginVertical: sizeWidth(5),
  },
  html: {
    marginTop: sizeWidth(6),
    paddingHorizontal: sizeWidth(5),
    marginBottom: sizeHeight(80),
  },
  info: {
    marginVertical: sizeWidth(6),
    paddingHorizontal: sizeWidth(5),
  },
  button: {
    marginVertical: sizeWidth(9),
    marginHorizontal: sizeWidth(16),
    flex: 1,
  },
  pagination: {
    marginBottom: 0,
  },
  wrap: {
    width: '100%',
    height: sizeWidth(242),
  },
  slide: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#D8D8D8',
    width: sizeWidth(6),
    height: sizeWidth(6),
    borderRadius: sizeWidth(3),
    margin: sizeWidth(3),
  },
  activeDot: {
    backgroundColor: appColor.primary,
    width: sizeWidth(12),
    height: sizeWidth(6),
    borderRadius: sizeWidth(3),
    margin: sizeWidth(3),
  },
  status: {
    marginTop: sizeWidth(3),
    fontFamily: font.medium,
    color: '#11B400',
    paddingHorizontal: sizeWidth(5),
  },
  title: {
    fontFamily: font.medium,
  },
  text: {
    fontFamily: font.light,
    fontSize: sizeFont(14),
    color: '#000',
  },
  video: {
    width: '100%',
    height: sizeWidth(242),
    alignSelf: 'center',
    backgroundColor: appColor.bg,
  },
  play: {
    tintColor: 'gray',
    width: sizeWidth(40),
    height: sizeWidth(40),
    borderRadius: sizeWidth(20),
  },
  chipColor: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: sizeWidth(30),
    minHeight: sizeWidth(30),
    margin: sizeWidth(4),
    padding: sizeWidth(4),
    paddingHorizontal: sizeWidth(8),
    // paddingBottom: Platform.OS === 'android' ? sizeWidth(6) : sizeWidth(4),
    borderWidth: 0.5,
    borderColor: appColor.primary,
    borderRadius: 20,
  },
  chipSize: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: sizeWidth(4),
    minWidth: sizeWidth(30),
    minHeight: sizeWidth(30),
    // paddingBottom: Platform.OS === 'android' ? sizeWidth(2) : 0,
    borderWidth: 0.5,
    borderColor: appColor.primary,
    borderRadius: 20,
  },
  bottom: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: sizeWidth(12),
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    marginRight: sizeWidth(16),
    alignItems: 'center',
  },
});
