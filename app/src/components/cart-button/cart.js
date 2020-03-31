import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet, Image
} from 'react-native';
import PropTypes from 'prop-types';
import styleBase from "app/src/styles/base";
import ButtonWrapper from "app/src/components/common/button-wrapper";
import { sizeWidth } from "app/src/helpers/size.helper";
import { connect } from 'react-redux';
import { navigateToPage } from "app/src/actions/nav.action";
import LinearGradient from "react-native-linear-gradient";

class CartButton extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    navigateToCart = () => {
        this.props.navigateToPage('Cart');
    };

    getCountProduct = () => {
        let {cart} = this.props.cart;
        if (!cart || !Array.isArray(cart)) return 0;
        return cart.reduce((count, item) => {
            if (item && item.products) {
                count += Object.values(item.products).reduce((qty, e) => qty += e.qty, 0);
            }

            return count;
        }, 0);
    };

    render() {
        return (
            <LinearGradient
                colors={['#F98649', '#F04E23']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[styleBase.shadow, styles.CartButton, styleBase.center, this.props.style]}>
            <ButtonWrapper onPress={this.navigateToCart}
                           style={[styleBase.fullParent, styleBase.center]}>
                <Image source={require('app/res/icon/shopping-bag.png')}
                       style={[styles.ic_CartButton]}/>
                <View style={[styles.badge, styleBase.center]}>
                    <Text style={[styleBase.text11, styles.text_badge, styleBase.textBold]}>
                        {this.getCountProduct()}
                    </Text>
                </View>
            </ButtonWrapper>
            </LinearGradient>
        )
    }
}

CartButton.propTypes = {
    style: PropTypes.any
};

CartButton.defaultProps = {};

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

export default connect(mapStateToProps, { navigateToPage })(CartButton)

const styles = StyleSheet.create({
    CartButton: {
        position: 'absolute',
        bottom: sizeWidth(30),
        right: sizeWidth(16),
        width: sizeWidth(48),
        height: sizeWidth(48),
        borderRadius: sizeWidth(24),
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: '#444',
        zIndex: 999
    },
    ic_CartButton: {
        width: sizeWidth(22),
        height: sizeWidth(24)
    },
    badge: {
        position: 'absolute',
        bottom: sizeWidth(8),
        right: sizeWidth(8),
        width: sizeWidth(16),
        height: sizeWidth(16),
        borderRadius: sizeWidth(8),
        backgroundColor: 'white'
    },
    text_badge: {
        color: '#4A4A4A'
    }
});
