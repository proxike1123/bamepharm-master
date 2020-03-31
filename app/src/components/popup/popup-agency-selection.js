import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Button from 'app/src/components/common/button-v2';
import Modal from 'react-native-modal';
import PopupSelection from '../../components/common/popup-selection';
import {sizeHeight, sizeWidth, sizeFont} from '../../helpers/size.helper';
import {font} from '../../constants/app.constant';
import Api from 'app/src/api/api';
import ActionSheetWrapper from 'app/src/components/actionsheet';

const categories = [
  {id: 1, name: 'one'},
  {id: 2, name: 'two'},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
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
  modalX: {
    margin: 0, // This is the important style you need to set
  },
  headerText: {
    textTransform: 'uppercase',
    fontFamily: font.bold,
    fontWeight: 'bold',
    fontSize: sizeFont(15),
  },
  selection: {
    width: '100%',
    height: sizeWidth(40),
    marginTop: sizeWidth(10),
    paddingHorizontal: sizeWidth(15),
    backgroundColor: '#fafafa',
    borderRadius: sizeWidth(5),
    borderColor: '#c7c7c7',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#4A4A4A',
    fontFamily: font.regular,
    fontSize: sizeFont(15),
  },
  descriptionText: {
    marginTop: sizeHeight(10),
  },
  confirmButton: {marginTop: sizeHeight(50)},
  expand: {
    width: sizeWidth(10),
    marginLeft: sizeWidth(12),
    height: sizeWidth(6),
  },
});

export class PopupAgencySelection extends React.Component {
  state = {
    isShowPopupSelection: false,
    selectedAgency: null,
    agencies: [],
  };

  componentDidMount = async () => {
    //Select agency to work with
    let agencies = await Api.getAgencies();
    this.setState({agencies, selectedAgency: agencies && agencies[0]});
  };

  closePopupSelection = () => {
    this.setState({isShowPopupSelection: false});
  };

  onClickCategory = selectedAgency => {
    this.setState({selectedAgency});
    this.closePopupSelection();
  };

  renderCategoryContent = agency => `${agency.full_name || agency.name}`;
  searchTerm = agency => `${agency.full_name}`;

  render() {
    const {isShowPopupSelection, selectedAgency, agencies} = this.state;
    const {onPressConfirm, isVisible, onBackdropPress} = this.props;

    return (
      <Modal
        visible={isVisible}
        animationType="faded"
        onBackButtonPress={onBackdropPress}
        onBackdropPress={onBackdropPress}
        style={styles.modalX}>
        <TouchableOpacity
          onPress={onBackdropPress}
          style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>
              Chọn đại lý cho phiên làm việc
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (agencies.length > 0)
                  this.setState({isShowPopupSelection: true});
              }}
              style={styles.selection}>
              <Text style={styles.text}>
                {selectedAgency
                  ? `${selectedAgency.full_name || selectedAgency.name}`
                  : 'Chọn đại lý...'}
              </Text>
              <Image
                style={styles.expand}
                resizeMode="stretch"
                resizeMethod="resize"
                source={require('../../../res/icon/arrow-down.png')}
              />
            </TouchableOpacity>
            <Text style={styles.descriptionText}>
              (Bạn có thể chọn lại đại lý khác trong phần thiết lập tài khoản)
            </Text>
            <Button
              onPress={() => {
                onPressConfirm(selectedAgency);
              }}
              style={styles.confirmButton}
              text="Xác nhận"
            />
          </View>
        </TouchableOpacity>
        <ActionSheetWrapper
          visible={isShowPopupSelection}
          onRequestClose={() => this.setState({isShowPopupSelection: false})}>
          <PopupSelection
            title="Chọn Đại Lý"
            items={agencies}
            selectedItem={selectedAgency}
            renderItem={this.renderCategoryContent}
            onClose={this.closePopupSelection}
            onPressItem={this.onClickCategory}
            searchTerm={this.searchTerm}
          />
        </ActionSheetWrapper>
      </Modal>
    );
  }
}

export default PopupAgencySelection;
