import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Toolbar from 'app/src/components/common/toolbar';
import BackIcon from 'app/src/components/common/back-icon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from 'app/src/components/common/button-v2';
import styleBase from 'app/src/styles/base';
import {sizeFont, sizeWidth} from 'app/src/helpers/size.helper';
import {font} from 'app/src/constants/app.constant';
import Toast from 'react-native-root-toast';
import Api from 'app/src/api/api';
import ImagePicker from 'react-native-image-crop-picker';
import {navigateBack} from 'app/src/actions/nav.action';
import {connect} from 'react-redux';
import LoadingIndicator from 'app/src/components/common/loading_indicator';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {appColor} from '../../constants/app.constant';
import CacheImage from '../../components/common/cache-image';
import {buildImage} from '../../helpers/image-helper';

@connectActionSheet
class FeedbackScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      loading: false,
      image: null,
    };
  }

  /**
   * Handler.
   *
   */
  handleChangeText = content => {
    this.setState({content});
  };

  handleSendFeedback = async () => {
    let {content, image} = this.state;
    if (!content.trim()) return Toast.show('Vui lòng nhập nội dung góp ý');

    this.setState({loading: true});
    try {
      let response = await Api.sendFeedback(content, image);
      Toast.show('Giày BQ cảm ơn thông tin quý giá của quý vị');
      this.props.navigateBack();
    } catch (e) {
      Toast.show(e.constructor === String ? e : e.message);
    }

    this.setState({loading: true});
  };

  openImagePicker = () => {
    const values = ['Chọn ảnh từ thư viện', 'Chụp ảnh', 'Huỷ'];
    const cancelButtonIndex = values.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options: values,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        if (buttonIndex === 0) {
          ImagePicker.openPicker({}).then(avatar => {
            const data = buildImage(avatar);
            this.setState({image: data});
          });
        }
        if (buttonIndex === 1) {
          ImagePicker.openCamera({}).then(avatar => {
            const data = buildImage(avatar);
            this.setState({image: data});
          });
        }
      },
    );
  };

  /**
   * Render.
   *
   */
  render() {
    const {image} = this.state;
    console.log(image);
    return (
      <View style={[styles.container]}>
        <Toolbar
          left={<BackIcon />}
          center={
            <Text
              style={[
                styleBase.text18,
                styleBase.textBold,
                styleBase.textWhite,
              ]}>
              Phản hồi về BQ
            </Text>
          }
        />
        <KeyboardAwareScrollView>
          <View style={[styles.inputContainer]}>
            <TextInput
              onChangeText={this.handleChangeText}
              multiline={true}
              autoFocus={true}
              placeholder="Vui lòng nhập nội dung góp ý, phản ánh của quý khách về sản phẩm, dịch vụ và nhân viên hoặc những vấn đề khác. Nội dung này sẽ được gởi trực tiếp tới lãnh đạo cao nhất công ty. "
              style={[styles.input]}
              underlineColorAndroid={'transparent'}
            />
          </View>
          {!!image && <CacheImage style={styles.image} uri={image.uri} />}
          <Text onPress={this.openImagePicker} style={[styles.select]}>
            Chọn hình ảnh
          </Text>
          <Button
            text={'Gửi'}
            style={[styles.button]}
            onPress={this.handleSendFeedback}
          />
        </KeyboardAwareScrollView>
        {this.state.loading && <LoadingIndicator />}
      </View>
    );
  }
}

export default connect(null, {navigateBack})(FeedbackScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    textAlignVertical: 'top',
    fontFamily: font.medium,
    fontWeight: '500',
    paddingVertical: 0,
    fontSize: sizeFont(15),
  },
  inputContainer: {
    height: sizeWidth(200),
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: sizeWidth(15),
    paddingHorizontal: sizeWidth(10),
    paddingVertical: sizeWidth(5),
    margin: sizeWidth(15),
  },
  button: {
    marginTop: sizeWidth(15),
    width: sizeWidth(180),
  },
  select: {
    fontStyle: 'italic',
    paddingHorizontal: sizeWidth(14),
    color: appColor.blur,
  },
  image: {
    width: sizeWidth(280),
    height: sizeWidth(200),
    alignSelf: 'center',
    marginBottom: sizeWidth(12),
  },
});
