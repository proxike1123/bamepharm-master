import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import Text from "../../components/common/text";
import numeral from "numeral";
import { font, appColor } from "../../constants/app.constant";
import { navigateToPage } from "../../actions/nav.action";
import { connect } from "react-redux";
import CacheImage from "app/src/components/common/cache-image";
import styleBase from "app/src/styles/base";
import { imageFullpath } from "app/src/helpers/url.helper";

class OrderDetailItem extends Component {
    render() {
        const { item } = this.props;

        let { image, p_name, price, qty, size, color_name } = item;

        return (
            <TouchableOpacity onPress={() => {}}
                              style={[styles.container, styleBase.row]}>
                <View>
                    <CacheImage uri={imageFullpath(image, true)}
                                style={[styles.image]}/>
                </View>
                <View style={[styleBase.container, styleBase.m_10_left]}>
                    <Text style={[styleBase.textBold, styleBase.text16]}>
                        {p_name}
                    </Text>
                    <View style={[styleBase.row, styleBase.alignCenter, styleBase.m_5_vertical]}>
                        <Text style={[styles.text]}>
                            {`Kích cỡ: `}
                        </Text>
                        <Text style={[styles.text]}>
                            {size}
                        </Text>
                    </View>
                    <View style={[styleBase.row, styleBase.alignCenter]}>
                        <Text style={[styles.text]}>
                            {`Màu sắc: `}
                        </Text>
                        <Text style={[styles.text]}>
                            {color_name}
                        </Text>
                    </View>
                    <View style={[styleBase.row, styleBase.alignCenter, styleBase.m_5_vertical]}>
                        <Text style={[styles.text]}>
                            {`Số lượng: `}
                        </Text>
                        <Text style={[styles.text]}>
                            {qty}
                        </Text>
                    </View>
                    <View style={[styleBase.row, styleBase.alignCenter]}>
                        <Text style={[styles.text]}>
                            {`Giá: `}
                        </Text>
                        <Text style={[styles.text, styleBase.textMedium]}>
                            {numeral(price).format('0,0')} VND
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    navigateToOrder = () => {
        const { item } = this.props;
        this.props.navigateToPage("Order", { product: item });
    };
}

export default connect(
    null,
    { navigateToPage }
)(OrderDetailItem);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: sizeWidth(12),
        paddingVertical: sizeWidth(8),
        backgroundColor: "white",
        marginHorizontal: sizeWidth(10),
        marginVertical: sizeWidth(5),
        borderRadius: sizeWidth(10),
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2
    },
    body: {
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: sizeWidth(85),
        height: sizeWidth(100)
    },
    name: {
        fontWeight: "500"
    },
    price: {
        color: appColor.primary,
        marginVertical: sizeWidth(4)
    },
    text: {
        fontSize: sizeFont(15),
        fontFamily: font.regular,
        color: '#4A4A4A',
        lineHeight: sizeFont(16)
    },
    option: {
        justifyContent: 'flex-end'
    },
    edit: {
        fontSize: sizeFont(15),
        fontFamily: font.bold,
        color: '#11B400'
    },
    delete: {
        marginLeft: sizeWidth(20),
        fontSize: sizeFont(15),
        fontFamily: font.bold,
        color: '#DD0000'
    }
});
