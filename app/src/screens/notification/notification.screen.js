import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {navigateToPage, resetPage} from '../../actions/nav.action';
import Text from '../../components/common/text';
import {connect} from 'react-redux';
import {sizeFont, sizeWidth} from '../../helpers/size.helper';
import {event, font} from '../../constants/app.constant';
import Api from '../../api/api';
import Toolbar from '../../components/common/toolbar';
import NotificationItem from './notification-item';
import LoadingIndicator from 'app/src/components/common/loading-indicator';
import EventRegister from 'app/src/helpers/event-register.helper';
import CartIcon from '../../components/common/cart-icon';

class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      loading: true,
      loadingRefresh: false,
    };

    this.page = 1;
    this.isLoadMore = true;
  }

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  renderNotification = ({item, index}) => {
    return (
      <NotificationItem
        item={item}
        onPress={() => this.handleMarkRead(item, index)}
      />
    );
  };

  componentDidMount = async () => {
    this.handleFetchNotification();
    this.reloadUnreadEvent = EventRegister.on(
      event.reloadUnread,
      this.handleFetchNotification,
    );
  };

  componentWillUnmount = () => {
    EventRegister.off(this.reloadUnreadEvent);
  };

  handleFetchNotification = async () => {
    try {
      this.page = 1;
      const {profile} = this.props.profile;
      let response = await Api.getListNotification({type: profile.type});

      if (response) {
        this.isLoadMore = !!response.next_page_url;
      }

      if (response && response.data) {
        this.setState({notifications: response.data});
      }
    } catch (e) {}

    this.setState({loading: false});
  };

  loadMore = async () => {
    if (!this.isLoadMore) return;

    ++this.page;
    const {profile} = this.props.profile;
    let response = await Api.getListNotification({
      type: profile.type,
      page: this.page,
    });
    this.setState({
      notifications: [...this.state.notifications, ...response.data],
    });
  };

  onRefresh = async () => {
    this.page = 1;
    this.isLoadMore = true;
    this.setState({loading: true, loadingRefresh: true});
    await this.handleFetchNotification();
    this.setState({loadingRefresh: false});
  };

  handleMarkRead = async (notification, index) => {
    let {notifications} = this.state;
    const {profile} = this.props.profile;
    try {
      if (!notification.seen_time) {
        let response = await Api.markReadNotification(
          notification.id,
          profile.type,
        );

        EventRegister.emit(event.reloadUnread);

        notifications[index].seen_time = new Date();
        this.setState({notifications});
      }

      if (notification && !!notification.id) {
        this.props.navigateToPage('NotificationDetail', {
          notification_id: notification.id,
        });
      }
    } catch (e) {}
  };

  render() {
    const {selectedTab, notifications, loading, loadingRefresh} = this.state;
    return (
      <View style={styles.container}>
        <Toolbar
          right={<CartIcon />}
          center={<Text style={styles.title}>Thông báo</Text>}
        />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={notifications}
            onEndReached={this.loadMore}
            onEndReachedThreshold={16}
            refreshing={loadingRefresh}
            onRefresh={this.onRefresh}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={this.renderNotification}
          />
        )}
      </View>
    );
  }
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  {resetPage, navigateToPage},
)(NotificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: 'bold',
  },
});
