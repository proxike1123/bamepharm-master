import React from "react";
import PropTypes from "prop-types";
import {Platform, FlatList, InteractionManager} from "react-native";

class List extends React.Component {
    constructor(props) {
        super(props);
        this._scrollRef = null;
        this._backTopTop = null;
        this.currentOffset = 0;
        this.isReached = true;
        this.state = {
            refreshing: false,
            isUpdateList: false
        };

        this.onEndReach = this.onEndReach.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onScroll  = this.onScroll.bind(this);
    }

    async onScroll () {

    }

    getWrappedInstance() {
        return this._scrollRef;
    }

    onUpdateList() {
        InteractionManager.runAfterInteractions(() => {
            this.forceUpdate();
        })
    }

    async onEndReach() {
        try {
            if(this.isReached) {
                this.isReached = false;
                await this.props.onEndReach();
                this.isReached = true
            }
        } catch (e) {
            console.warn("ERROR - ", e.message)
        }
    }

    async onRefresh () {
        try {
            this.setState({refreshing: true});
            await this.props.onRefresh();
            this.setState({refreshing: false});
        } catch (e) {
            console.warn("ERROR - ", e.message)
        }
    }

    render() {
        return (
            <FlatList
                ref={(ref) => {
                    if (this._scrollRef == undefined) {
                        this._scrollRef = ref;
                    }
                }}
                contentContainerStyle={[...this.props.styles]}
                data={this.props.dataSources}
                extraData={this.state}
                scrollEnabled={this.props.scrollEnabled}
                onEndReached={this.onEndReach}
                initialNumToRender={this.props.initialNumToRender}
                getItemLayout={this.props.getItemLayout}
                removeClippedSubviews={this.props.removeClippedSubviews}
                keyExtractor={this.props.keyExtractor}
                ListEmptyComponent={this.props.renderEmpty}
                ItemSeparatorComponent={this.props.separatorComponent}
                disableVirtualization={this.props.disableVirtualization}
                horizontal={this.props.horizontal}
                refreshing={this.state.refreshing}
                showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
                showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
                onRefresh={this.onRefresh}
                keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
                onEndReachedThreshold={this.props.onEndReachedThreshold}
                renderItem={({item, index}) => this.props.renderItem(item, index)}
                numColumns={this.props.numColumns}
                ListHeaderComponent={this.props.renderHeader}
                ListFooterComponent={this.props.renderFooter}
                onScroll={this.props.onScroll}
            />
        )
    }
}

List.propTypes = {
    dataSources: PropTypes.array,
    extraData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    onEndReach: PropTypes.func,
    disableVirtualization: PropTypes.bool,
    onRefresh: PropTypes.func,
    renderItem: PropTypes.func,
    numColumns: PropTypes.number,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    separatorComponent: PropTypes.func,
    horizontal: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    showsHorizontalScrollIndicator: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    keyExtractor: PropTypes.func,
    styles: PropTypes.array,
    initialNumToRender: PropTypes.number,
    getItemLayout: PropTypes.func,
    removeClippedSubviews: PropTypes.bool,
    onEndReachedThreshold: PropTypes.number,
    renderEmpty: PropTypes.func,
    scrollView: PropTypes.any,
    onScroll: PropTypes.func,
    keyboardShouldPersistTaps: PropTypes.string
};

List.defaultProps = {
    dataSources: [],
    disableVirtualization: true,
    removeClippedSubviews: Platform.OS === 'android',
    onEndReachedThreshold: Platform.OS === 'android' ? 0.01 : 0.05,
    extraData: [],
    initialNumToRender: 5,
    styles: [],
    scrollEnabled: true,
    numColumns: 1,
    onRefresh: () => {},
    renderItem: () => {},
    onEndReach: () => {},
    renderHeader: () => null,
    renderFooter: () => null,
    keyExtractor: (item, index) => {
        return `LIST_ITEM_${index}`;
    },
    getItemLayout: (data, index) => (
        {length: 100, offset: 100 * index, index}
    ),
    renderEmpty: () => null,
};

export default List;