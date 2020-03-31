import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { sizeWidth } from "app/src/helpers/size.helper";
import styleBase from "app/src/styles/base";

class NumberInput extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let { onChangeText, onBlur } = this.props;

        return (
            <View style={[styles.container, styleBase.justifyCenter]}>
                <TextInput
                    style={[styles.input]}
                    placeholder={'...'}
                    value={this.props.value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    keyboardType={'numeric'}/>
            </View>
        )
    }
}

NumberInput.propTypes = {
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string
};

NumberInput.defaultProps = {
    onChangeText: () => {},
    onBlur: () => {},
    value: '0'
};

export default NumberInput

const styles = StyleSheet.create({
    container: {
        height: sizeWidth(36),
        width: sizeWidth(80),
        borderRadius: sizeWidth(4),
        borderWidth: 1,
        borderColor: '#E5E5E5',
        paddingHorizontal: sizeWidth(10)
    },
    input: {
        paddingVertical: 0,
        textAlign: 'center'
    }
});
