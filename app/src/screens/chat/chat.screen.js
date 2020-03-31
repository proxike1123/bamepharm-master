import React, {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import Text from '../../components/common/text';
import {connect} from 'react-redux';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import {font, text} from '../../constants/app.constant';
import Api from '../../api/api';
import Toolbar from '../../components/common/toolbar';
import TouchableIcon from '../../components/common/touchable-icon';
import List from 'app/src/components/common/list_view';
import ConversationItem from 'app/src/screens/chat/component/conversation-item';
import styleBase from 'app/src/styles/base';
import {accountType} from 'app/src/constants/app.constant';
import {appConfig} from 'app/src/config/app.config';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agencies: [],
    };
  }

  componentDidMount = async () => {
    const {profile} = this.props;
    if (profile.type === accountType.sale) {
      const agencies = await Api.getAgencies();
      this.setState({agencies});
    }
  };

  renderItem = (agency, index) => {
    return (
      <ConversationItem
        agency={agency}
        key={`CONVERSATION_ITEM_${agency.id}`}
      />
    );
  };

  renderRight = () => {
    const avatar = `${appConfig.apiUrl}public/${this.props.profile.avatar}`;
    return (
      <View style={[styles.avatarContainer, styleBase.m_10_right]}>
        <Image style={[styles.avatar]} source={{uri: avatar}} />
        <View style={[styles.online]} />
      </View>
    );
  };

  render(): ReactNode {
    const {agencies} = this.state;
    return (
      <View style={styles.container}>
        <Toolbar
          center={<Text style={styles.title}>Chat</Text>}
          right={this.renderRight()}
        />
        <List renderItem={this.renderItem} dataSources={agencies} />
      </View>
    );
  }
}

export default connect(state => ({profile: state.profile.profile}), {
  resetPage,
  navigateToPage,
})(ChatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: sizeFont(20),
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  label: {
    fontSize: sizeFont(13),
    color: '#6D6D72',
    paddingHorizontal: sizeWidth(12),
    paddingTop: sizeWidth(14),
    backgroundColor: '#EFEFF3',
    paddingBottom: sizeWidth(10),
  },
  row: {
    paddingHorizontal: sizeWidth(12),
    height: sizeWidth(44),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: sizeFont(15),
    flex: 1,
    fontFamily: font.regular,
  },
  version: {
    fontSize: sizeFont(15),
    color: '#A0B1B7',
    marginLeft: sizeWidth(12),
    fontFamily: font.regular,
  },
  separator: {
    backgroundColor: '#95989A',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: sizeWidth(12),
  },
  avatar: {
    width: sizeWidth(34),
    height: sizeWidth(34),
    borderRadius: sizeWidth(17),
    borderColor: 'white',
    borderWidth: 1.5,
  },
  avatarContainer: {
    width: sizeWidth(34),
    height: sizeWidth(34),
    overflow: 'hidden',
  },
  online: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: sizeWidth(12),
    height: sizeWidth(12),
    borderRadius: sizeWidth(6),
    backgroundColor: '#3ccc27',
  },
});
