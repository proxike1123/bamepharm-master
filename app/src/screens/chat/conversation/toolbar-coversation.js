import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import {connect} from 'react-redux';
import Toolbar from 'app/src/components/common/toolbar';
import BackIcon from 'app/src/components/common/back-icon';
import styleBase from 'app/src/styles/base';
import {sizeWidth} from 'app/src/helpers/size.helper';
import {accountType} from '../../../constants/app.constant';
import CacheImage from '../../../components/common/cache-image';
import TouchableIcon from '../../../components/common/touchable-icon';
import Api from '../../../api/api';

class ToolbarConversation extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderRight = () => {
    return (
      <TouchableIcon
        onPress={this.callSale}
        source={require('app/res/icon/phone-icon.png')}
        iconStyle={[styles.chat]}
      />
    );
  };

  callSale = async () => {
    const infoSale = await Api.getInfoSale();
    let phone = infoSale['phone saler'];
    Communications.phonecall(phone, true);
  };

  renderCenter = () => {
    const {name, avatar} = this.props;
    return (
      <View style={styles.center}>
        {!!avatar && (
          <View style={[{marginRight: 10}, styles.avatarContainer]}>
            <CacheImage style={[styles.avatar]} uri={avatar} />
            <View style={styles.dot} />
          </View>
        )}
        <Text
          style={[styleBase.text18, styleBase.textBold, styleBase.textWhite]}>
          {name}
        </Text>
      </View>
    );
  };

  render() {
    const {profile} = this.props.profile;
    const {name, isAgency, fromProductDetail} = this.props;
    return (
      <View style={[this.props.style]}>
        <Toolbar
          left={
            (profile.type === accountType.sale || fromProductDetail) && (
              <BackIcon />
            )
          }
          right={isAgency && this.renderRight()}
          center={!!name && this.renderCenter()}
        />
      </View>
    );
  }
}

ToolbarConversation.propTypes = {
  style: PropTypes.any,
};

ToolbarConversation.defaultProps = {};

export default connect(
  state => ({
    profile: state.profile,
  }),
  null,
)(ToolbarConversation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: sizeWidth(34),
    height: sizeWidth(34),
    borderRadius: sizeWidth(17),
    borderColor: 'white',
    borderWidth: 1.5,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
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
  dot: {
    width: sizeWidth(10),
    height: sizeWidth(10),
    borderRadius: sizeWidth(5),
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderColor: 'white',
    right: 0,
  },
  chat: {
    width: sizeWidth(24),
    height: sizeWidth(22),
  },
});
