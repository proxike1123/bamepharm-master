import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import Input from '../../components/common/input';
import {appColor, font} from '../../constants/app.constant';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import SearchInput from './search-input';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    paddingTop: isIphoneX() ? getStatusBarHeight(true) : 0,
  },
  root: {
    padding: sizeWidth(15),
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
  },
  content: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#4F4F4F',
    fontSize: sizeFont(17),
    fontFamily: font.medium,
    fontWeight: '500',
  },
  search: {
    marginTop: 15,
    marginBottom: 15,
  },
  itemContainer: {
    borderTopColor: '#fafafa',
    borderTopWidth: 1,
    paddingVertical: 15,
  },
  itemText: {
    color: '#4A4A4A',
    fontSize: sizeFont(15),
    fontFamily: font.medium,
    fontWeight: '500',
  },
  selectedItem: {
    color: appColor.primary,
    fontFamily: font.medium,
    fontWeight: '500',
  },
  firstItem: {
    borderTopWidth: 0,
    paddingTop: 5,
  },
  searchInput: {
    backgroundColor: appColor.bg,
    marginBottom: sizeWidth(8),
  },
});

class PopupSelection extends PureComponent {
  constructor(props) {
    super(props);

    const {items} = props;

    this.state = {
      items,
      searchText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const {items, isVisible} = nextProps;
    this.setState({items});
    if (isVisible && !this.props.isVisible) {
      this.setState({searchText: ''});
    }
  }

  renderItem = (item, index) => {
    const {selectedItem, renderItem, onPressItem} = this.props;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onPressItem(item);
        }}
        style={[styles.itemContainer, index === 0 && styles.firstItem]}>
        <Text
          style={[
            styles.itemText,
            item.id === (selectedItem || {}).id && styles.selectedItem,
          ]}>
          {renderItem(item)}
        </Text>
      </TouchableOpacity>
    );
  };

  onKeywordChange = value => {
    this.setState({searchText: value});
  };

  renderContent = () => {
    const {items, searchText} = this.state;
    const {searchTerm} = this.props;
    let renderData = items;
    if (searchText) {
      renderData = (items || []).filter(c => {
        const text = `${searchTerm ? searchTerm(c) : c.name}`.toUpperCase();
        return text.includes(searchText.trim().toUpperCase());
      });
    }
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <SearchInput
          value={searchText}
          onChangeText={this.onKeywordChange}
          hideBarcode
          style={styles.searchInput}
          placeholder="Tìm kiếm đại lý"
        />
        <View style={styles.content}>{renderData.map(this.renderItem)}</View>
      </ScrollView>
    );
  };

  renderHeader = title => (
    <View style={styles.headerContainer}>
      <Input
        style={styles.search}
        placeholder="Tìm kiếm"
        onChangeText={this.onChangeTextSearch}
      />
    </View>
  );

  render() {
    const {title} = this.props;
    return <View style={styles.root}>{this.renderContent()}</View>;
  }
}

PopupSelection.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  selectedItem: PropTypes.object,
  isVisible: PropTypes.bool,
  renderItem: PropTypes.func.isRequired,
  onPressItem: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

PopupSelection.defaultProps = {
  title: '',
  items: [],
  selectedItem: {},
  isVisible: false,
};

export default PopupSelection;
