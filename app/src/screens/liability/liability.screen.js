import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import Text from '../../components/common/text';
import {connect} from 'react-redux';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import {font, appColor} from '../../constants/app.constant';
import Toolbar from '../../components/common/toolbar';
import LiabilityItem from './liability-item';
import BackIcon from '../../components/common/back-icon';
import Api from '../../api/api';

class LiabilityScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      loadingRefresh: false,
    };

    this.page = 1;
    this.isLoadMore = true;
  }

  renderLiability = ({item}) => {
    return <LiabilityItem item={item} />;
  };

  handleFetchLiability = async () => {
    try {
      let response = await Api.getLiability({});
      if (response) {
        this.isLoadMore = !!response.next_page_url;
      }
      if (response && response.data) {
        this.setState({data: response.data});
      }
    } catch (e) {}
    this.setState({loading: false});
  };

  loadMore = async () => {
    if (!this.isLoadMore) return;
    ++this.page;
    let response = await Api.getLiability({
      page: this.page,
    });
    this.setState({
      data: [...this.state.data, ...response.data],
    });
  };

  onRefresh = async () => {
    this.page = 1;
    this.isLoadMore = true;
    this.setState({loading: true, loadingRefresh: true});
    await this.handleFetchLiability();
    this.setState({loadingRefresh: false});
  };

  componentDidMount = async () => {
    this.handleFetchLiability();
  };

  render() {
    const {data, loadingRefresh} = this.state;
    return (
      <View style={styles.container}>
        <Toolbar
          left={<BackIcon />}
          center={<Text style={styles.title}>Công nợ</Text>}
        />
        <FlatList
          data={data}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderLiability}
          onEndReached={this.loadMore}
          onEndReachedThreshold={16}
          refreshing={loadingRefresh}
          onRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

export default connect(null, {resetPage, navigateToPage})(LiabilityScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
  },
  separator: {
    backgroundColor: '#95989A',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: sizeWidth(15),
  },
  title: {
    color: 'white',
    fontSize: sizeFont(18),
    fontFamily: font.bold,
  },
  list: {
    paddingVertical: sizeWidth(8),
  },
});
