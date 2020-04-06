import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import styleBase from 'app/src/styles/base';
import AvatarChat from 'app/src/screens/chat/component/avatar-chat';
import {sizeWidth} from 'app/src/helpers/size.helper';
import ButtonWrapper from 'app/src/components/common/button-wrapper';
import {getConversationKey} from '../../../config/app.config';
import {resetPage, navigateToPage} from 'app/src/actions/nav.action';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import moment from 'moment';
import {appConfig} from 'app/src/config/app.config';

class ConversationItem extends React.Component {
  constructor(props) {
    super(props);
    this.saleId = this.props.profile.profile.id;
    this.state = {
      lastMessage: '',
      time: null,
    };
  }

  componentDidMount = async () => {
    this.getLastMessage();
  };

  getLastMessage = async () => {
    const {agency} = this.props;
    const conversationKey = getConversationKey(this.saleId, agency.id);
    this.unsubscribe = await firebase
      .firestore()
      .collection(`conversation/${conversationKey}/messages`)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot(querySnapshot => {
        if (querySnapshot._docs.length === 1) {
          const data = querySnapshot._docs[0].data();
          this.setState({
            lastMessage: data.text,
            time: moment
              .unix(data.createdAt.seconds)
              .format('HH:mm- ddd/DD/MMM'),
          });
        }
      });
  };

  componentWillUnmount = async () => {
    this.unsubscribe();
  };

  onPress = () => {
    this.props.navigateToPage('Conversation', {partner: this.props.agency});
  };

  render() {
    const {agency} = this.props;
    const {lastMessage, time} = this.state;
    return (
      <ButtonWrapper
        style={[styles.container, styleBase.row, styleBase.alignCenter]}
        onPress={this.onPress}>
        <AvatarChat avatar={`${appConfig.apiUrl}public/${agency.avatar}`} />
        <View style={[styleBase.container, styleBase.m_10_left]}>
          <Text
            style={[
              styleBase.text16,
              styleBase.textBold,
              styleBase.textGray29,
            ]}>
            {agency.full_name}
          </Text>
          {!!lastMessage && (
            <View style={[styleBase.row, styleBase.alignCenter]}>
              <Text
                style={[
                  styleBase.container,
                  styleBase.textGrey,
                  styleBase.textRegular,
                  styleBase.text15,
                ]}>
                {lastMessage}
              </Text>
              <Text
                style={[
                  styleBase.textGrey,
                  styleBase.textMedium,
                  styleBase.text14,
                  styleBase.m_10_left,
                ]}>
                {time}
              </Text>
            </View>
          )}
        </View>
      </ButtonWrapper>
    );
  }
}

ConversationItem.propTypes = {
  agency: PropTypes.object,
};

ConversationItem.defaultProps = {};

export default connect(state => ({profile: state.profile}), {
  resetPage,
  navigateToPage,
})(ConversationItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizeWidth(15),
    paddingVertical: sizeWidth(8),
  },
});
