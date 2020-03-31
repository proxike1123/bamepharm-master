import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Text from '../text';
import {sizeWidth, sizeFont} from '../../../helpers/size.helper';
import {font} from '../../../constants/app.constant';

const verticalGradient = {
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
};

export default class GroupButton extends React.Component {
  onPress = index => {
    Promise.resolve(index).then(newIndex => {
      this.props.goTo(newIndex);
    });

    const {config} = this.props;
    const button = _.find(config, newButton => {
      return newButton.index === index;
    });
    if (button.callBack) {
      button.callBack();
    }
  };

  renderButtons = () => {
    return this.props.config.map(button => {
      const isActive = button.index === this.props.index;
      return (
        <TouchableOpacity
          key={button.index}
          onPress={() => this.onPress(button.index)}
          style={styles.button}>
          {isActive ? (
            <LinearGradient
              style={styles.gradient}
              colors={['#F98649', '#F04E23']}
              start={verticalGradient.start}
              end={verticalGradient.end}>
              <Text style={styles.textActive}>{button.name}</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.textInactive}>{button.name}</Text>
          )}
        </TouchableOpacity>
      );
    });
  };

  render() {
    const {config, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        {config.length > 0 && this.renderButtons()}
      </View>
    );
  }
}

GroupButton.propTypes = {
  config: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  goTo: PropTypes.func,
  style: PropTypes.object,
};

GroupButton.defaultProps = {
  goTo: () => {},
  style: {},
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    margin: sizeWidth(16),
    backgroundColor: 'rgba(255, 241, 204, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(186,12,47,0.17)',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gradient: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  textActive: {
    fontSize: sizeFont(15),
    color: 'white',
    fontFamily: font.bold,
    fontWeight: 'bold',
  },
  textInactive: {
    fontSize: sizeFont(15),
    color: '#4A4A4A',
  },
});
