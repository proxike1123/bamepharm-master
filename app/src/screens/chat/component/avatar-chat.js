import React from 'react';
import {StyleSheet, View} from 'react-native';
import {sizeWidth} from 'app/src/helpers/size.helper';
import CacheImage from '../../../components/common/cache-image';

class AvatarChat extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {avatar} = this.props;
    return (
      <View style={styles.container}>
        <CacheImage style={[styles.avatar]} uri={avatar} />
      </View>
    );
  }
}

AvatarChat.propTypes = {};

AvatarChat.defaultProps = {};

export default AvatarChat;

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(60),
    height: sizeWidth(60),
  },
  avatar: {
    width: sizeWidth(60),
    height: sizeWidth(60),
    borderRadius: sizeWidth(30),
    overflow: 'hidden',
  },
  online: {
    width: sizeWidth(14),
    height: sizeWidth(14),
    borderWidth: sizeWidth(2),
    borderColor: 'white',
    position: 'absolute',
    bottom: sizeWidth(2),
    right: sizeWidth(2),
    backgroundColor: '#3ccc27',
    borderRadius: sizeWidth(7),
  },
});
