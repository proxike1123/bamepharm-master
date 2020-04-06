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
import {navigateBack} from 'app/src/actions/nav.action';
import {connect} from 'react-redux';
import LoadingIndicator from 'app/src/components/common/loading_indicator';

class FeedbackScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      loading: false,
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
    let {content} = this.state;
    if (!content.trim()) return Toast.show('Vui lòng nhập nội dung góp ý');

    this.setState({loading: true});
    try {
      let response = await Api.sendFeedback(content);
      Toast.show('Giày BQ cảm ơn thông tin quý giá của quý vị');
      this.props.navigateBack();
    } catch (e) {
      Toast.show(e.constructor === String ? e : e.message);
    }

    this.setState({loading: true});
  };

  /**
   * Render.
   *
   */
  render() {
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
});
