import React, {PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {sizeHeight, sizeWidth, sizeFont} from '../../helpers/size.helper';
import Modal from 'react-native-modal';
import {font} from '../../constants/app.constant';
import LinearButton from 'app/src/components/common/button-v2';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import styleBase from 'app/src/styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  modalInstance: {
    margin: 0, // This is the important style you need to set
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: sizeHeight(20),
    paddingHorizontal: sizeWidth(20),
  },
  headerText: {
    textTransform: 'uppercase',
    fontFamily: font.bold,
    fontWeight: 'bold',
    fontSize: sizeFont(17),
  },
  agency: {
    justifyContent: 'flex-start',
    paddingHorizontal: sizeWidth(15),
    borderColor: '#c7c7c7',
    flexDirection: 'row',
    borderWidth: 1,
    width: '100%',
    height: sizeWidth(44),
    alignItems: 'center',
    marginTop: sizeWidth(10),
  },
  label: {
    fontFamily: font.bold,
    fontWeight: 'bold',
    fontSize: sizeFont(15),
    paddingRight: sizeWidth(10),
  },
  normalText: {
    fontSize: sizeFont(15),
  },
  description: {
    marginTop: sizeWidth(10),
  },
  bottom: {
    marginTop: sizeWidth(30),
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  resetButtonContainer: {
    overflow: 'hidden',
    borderRadius: sizeWidth(23),
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  resetButton: {
    paddingHorizontal: sizeWidth(35),
    height: sizeWidth(46),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  resetText: {
    fontSize: sizeFont(15),
    textTransform: 'uppercase',
  },
});

export class ConfirmOrderPopup extends PureComponent {
  render() {
    const {isVisible, agencyName, onPressOrder, onPressReset} = this.props;
    if (!isVisible) return null;
    return (
      <Modal
        visible={isVisible}
        animationType="faded"
        style={styles.modalInstance}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>Xác nhận mua hàng</Text>
            <View style={styles.agency}>
              <Text style={styles.label}>Đại Lý:</Text>
              <Text style={styles.normalText}>{agencyName}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.normalText}>
                Quý khách vui lòng kiểm tra lại một lần nữa trước khi đặt hàng.
              </Text>
              <Text style={styles.normalText}>
                Đơn hàng sau khi đặt sẽ có xác nhận từ nhân viên.
              </Text>
            </View>
            <View style={styles.bottom}>
              <View style={styles.resetButtonContainer}>
                <ButtonWrapper
                  style={[styleBase.center, styles.resetButton]}
                  onPress={onPressReset}>
                  <Text style={[styles.resetText]}>Chọn Lại</Text>
                </ButtonWrapper>
              </View>
              <LinearButton
                onPress={onPressOrder}
                style={styles.confirmButton}
                text="ĐẶT HÀNG"
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ConfirmOrderPopup;
