import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import RatingItem from 'app/src/screens/rating/RatingItem';
import Toolbar from 'app/src/components/common/toolbar';
import BackIcon from 'app/src/components/common/back-icon';
import styleBase from 'app/src/styles/base';
import Button from 'app/src/components/common/button-v2';
import {sizeFont, sizeWidth} from 'app/src/helpers/size.helper';
import {font, appColor} from 'app/src/constants/app.constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Api from 'app/src/api/api';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import {navigateBack} from 'app/src/actions/nav.action';
import LoadingIndicator from 'app/src/components/common/loading-indicator';
import Loading from 'app/src/components/common/loading_indicator';
import {sizeHeight} from '../../helpers/size.helper';

class RatingScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sale: '',
      listRating: [],
      comment: '',
      loading: true,
      loadingSubmit: false,
      isRatedThisMonth: false,
    };

    this.ratings = [];
  }

  componentDidMount() {
    this.handleFetchListRating();
    this.getSaleInfo();
  }

  async getSaleInfo() {
    const infoSale = await Api.getInfoSale();
    let sale = infoSale['name saler'];
    this.setState({sale: sale});
  }

  handleFetchListRating = async () => {
    try {
      let response = await Api.getListRating();
      let isRatedThisMonthResponse = await Api.checkRatingInMonth();
      if (response) {
        let listRating = Object.values(response);
        listRating = listRating.filter(item => item.hasOwnProperty('name'));
        this.ratings = listRating.map(item => ({...item, rating: 0}));
        this.setState({
          listRating,
          isRatedThisMonth: isRatedThisMonthResponse.rated,
        });
      }
    } catch (e) {}
    this.setState({loading: false});
  };

  handleChangeText = comment => {
    this.setState({comment});
  };

  handleChangeRating = (item, index, rating) => {
    this.ratings[index].rating = rating;
  };

  handleSubmitRating = async () => {
    let {comment} = this.state;
    this.setState({loadingSubmit: true});
    let notComplete = this.ratings.find(item => item.rating === 0);
    if (notComplete) {
      return Toast.show('Vui lòng đánh giá đầy đủ các tiêu chí.');
    }

    let data = {comment};

    this.ratings.map(item => {
      data[`${item.name}`] = item.rating;
    });

    try {
      let response = await Api.submitRating(data);
      Toast.show('Giày BQ cảm ơn quý khách đã đánh giá.');
      this.props.navigateBack();
    } catch (e) {
      Toast.show(e.constructor === String ? e : e.message);
    }

    this.setState({loadingSubmit: false});
  };

  render() {
    let {
      listRating,
      isRatedThisMonth,
      loading,
      loadingSubmit,
      sale,
    } = this.state;
    return (
      <View style={[styles.container]}>
        <Toolbar
          left={<BackIcon />}
          center={
            <Text
              style={[
                styleBase.text18,
                styleBase.textWhite,
                styleBase.textBold,
              ]}>
              Đánh giá nhân viên
            </Text>
          }
        />
        {loading ? (
          <LoadingIndicator />
        ) : isRatedThisMonth ? (
          <View style={styles.root}>
            <Text style={styles.desc}>
              Quý khách hàng đã đánh giá nhân viên này trong tháng, vui lòng
              phản hồi vào tháng tiếp theo
            </Text>
          </View>
        ) : (
          <KeyboardAwareScrollView
            style={[styleBase.p_15_horizontal, styleBase.p_15_vertical]}>
            <Text style={[styleBase.text15, styles.title]}>
              <Text style={styleBase.textBold}>Nhân viên: </Text>
              <Text>{sale}</Text>
            </Text>
            {Array.isArray(listRating) &&
              listRating.map((item, index) => (
                <RatingItem
                  rating={item}
                  onRating={rating =>
                    this.handleChangeRating(item, index, rating)
                  }
                  key={`RATING_ITEM_${index}`}
                />
              ))}
            <View style={[styles.inputContainer]}>
              <TextInput
                onChangeText={this.handleChangeText}
                multiline={true}
                autoFocus={true}
                placeholder="Vui lòng nhập đánh giá của quý khách. Nội dung đánh giá này sẽ được gửi trực tiếp tới Ban lãnh đạo công ty Giày BQ."
                style={[styles.input]}
                underlineColorAndroid={'transparent'}
              />
            </View>
            <Button
              text={'Đánh giá'}
              onPress={this.handleSubmitRating}
              style={[styles.button]}
            />
          </KeyboardAwareScrollView>
        )}
        {loadingSubmit && <Loading text={''} />}
      </View>
    );
  }
}

export default connect(null, {navigateBack})(RatingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontSize: sizeFont(16),
    paddingHorizontal: sizeWidth(32),
    textAlign: 'center',
  },
  button: {
    width: sizeWidth(160),
    marginTop: sizeWidth(20),
  },
  inputContainer: {
    height: sizeWidth(120),
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: sizeWidth(12),
    paddingHorizontal: sizeWidth(10),
    marginVertical: sizeWidth(15),
  },
  input: {
    textAlignVertical: 'top',
    fontFamily: font.medium,
    paddingVertical: 0,
    fontSize: sizeFont(15),
  },
  title: {
    color: '#333',
    paddingVertical: sizeWidth(5),
    marginBottom: sizeWidth(15),
  },
  note: {
    textAlign: 'left',
    fontSize: sizeFont(12),
    color: appColor.blur,
    fontStyle: 'italic',
  },
});
