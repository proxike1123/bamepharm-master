import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {AirbnbRating, Rating} from 'react-native-ratings';
import styleBase from 'app/src/styles/base';
import {sizeWidth} from 'app/src/helpers/size.helper';
import CacheImage from '../../components/common/cache-image';

class RatingItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {rating, style, onRating} = this.props;
    if (!rating) return null;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.body}>
          <CacheImage style={styles.icon} uri={rating.icon} />
          <Text style={[styleBase.text15, styles.title, styleBase.textBold]}>
            {rating.title}
          </Text>
          <View style={[styles.ratingContainer]}>
          <AirbnbRating
            showRating={false}
            count={5}
            reviewColor={'red'}
            defaultRating={0}
            starStyle={styles.star}
            onFinishRating={onRating}
          />
        </View>
        </View> 
      </View>
    );
  }
}

RatingItem.propTypes = {
  title: PropTypes.string,
  style: PropTypes.any,
  onRating: PropTypes.func,
};

RatingItem.defaultProps = {
  title: '',
  style: {},
  onRating: () => {},
};

export default RatingItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: sizeWidth(15),
  },
  icon: {
    width: sizeWidth(20),
    height: sizeWidth(20),
    marginRight: sizeWidth(12),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    marginTop: sizeWidth(5),
    flex: 1,
    alignItems: 'flex-end',

  },
  star: {
    width: sizeWidth(20),
    height: sizeWidth(20),
  },
  title: {
    color: '#333',
  },
});
