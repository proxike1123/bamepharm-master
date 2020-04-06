import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import HTML from 'react-native-render-html';
import Text from '../../components/common/text';
import {appColor, font} from '../../constants/app.constant';
import {sizeFont, sizeWidth} from '../../helpers/size.helper';
import moment from 'moment';
import CacheImage from '../../components/common/cache-image';

class NotificationItem extends PureComponent {
  render() {
    const {item, style, onPress} = this.props;
    const {title, content, created_at, icon, seen_time} = item;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        <CacheImage style={styles.image} uri={icon} />
        <View style={styles.body}>
          <Text
            style={[
              styles.title,
              {fontFamily: !seen_time ? font.bold : font.regular},
            ]}>
            {title}
          </Text>
          {created_at && (
            <View style={styles.timestamp}>
              <Text style={styles.time}>
                {moment(created_at).format('DD/MM/YYYY HH:mm')}
              </Text>
            </View>
          )}
          <View style={styles.htmlContainer}>
            <Text style={[styles.message]} numberOfLines={1}>
              {content}
            </Text>
          </View>
        </View>
        {/* {!seen_time && <View style={styles.dot} />} */}
      </TouchableOpacity>
    );
  }
}

NotificationItem.propTypes = {
  item: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  onMarkRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  item: {},
  style: {} || [],
  imageStyle: {} || [],
  onPress: () => {},
  onMarkRead: () => {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: sizeWidth(20),
    paddingVertical: sizeWidth(10),
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  title: {
    color: appColor.textColor,
    fontSize: sizeFont(15),
  },
  message: {
    color: '#4A4A4A',
    fontSize: sizeFont(12),
    fontFamily: font.regular,
  },
  timestamp: {
    flexDirection: 'row',
    marginTop: sizeWidth(4),
    alignItems: 'center',
  },
  time: {
    fontSize: sizeFont(12),
    fontStyle: 'italic',
    color: appColor.blur,
  },
  clock: {
    marginRight: sizeWidth(5),
  },
  dot: {
    width: sizeWidth(12),
    height: sizeWidth(12),
    borderRadius: 12,
    backgroundColor: appColor.primary,
  },
  htmlContainer: {
    marginTop: sizeWidth(4),
  },
  image: {
    width: sizeWidth(40),
    height: sizeWidth(40),
    marginRight: sizeWidth(12),
  },
});

export default NotificationItem;
