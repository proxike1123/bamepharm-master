import React, {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {resetPage, navigateToPage} from '../../actions/nav.action';
import Text from '../../components/common/text';
import {connect} from 'react-redux';
import {sizeWidth, sizeFont} from '../../helpers/size.helper';
import {font, appColor, accountType} from '../../constants/app.constant';
import Toolbar from '../../components/common/toolbar';
import OrderItem from './order-item';
import API from '../../api/api';
import styleBase from 'app/src/styles/base';
import {getSelectedAgency} from '../../helpers/storage.helper';
import EventRegister from '../../helpers/event-register.helper';
import CartIcon from '../../components/common/cart-icon';

class OrderListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: null,
      tabs: [],
      orders: [],
      loading: true,
      loadingRefresh: false,
      ordersRequesting: false,
      selectedAgency: null,
    };

    this.page = 1;
    this.isLoadMore = true;
  }

  componentDidMount = async () => {
    const {navigation} = this.props;
    const {profile} = this.props.profile;
    // this.focusListener = navigation.addListener(
    //   'didFocus',
    //   this.didFocus.bind(this),
    // );
    const selectedAgency = await getSelectedAgency();
    this.setState({selectedAgency});
    if (selectedAgency || profile.type === accountType.agency)
      this.getOrderStatus();

    this.agencySelectEvent = EventRegister.on(
      'selectAgency',
      this.onSelectAgency,
    );
  };

  onSelectAgency = async () => {
    const selectedAgency = await getSelectedAgency();
    this.setState({selectedAgency});
    if (selectedAgency) this.getOrderStatus();
  };

  componentWillUnmount() {
    EventRegister.off(this.agencySelectEvent);
    // this.focusListener.remove();
  }

  // didFocus() {
  //   this.getOrderStatus();
  // }

  getOrderStatus = async () => {
    this.setState({ordersRequesting: true});
    try {
      const {profile} = this.props.profile;
      const statusOrders = await API.getStatusOrders(profile.type);
      if (statusOrders) {
        const selectedAgency = await getSelectedAgency();
        const results = await API.getOrdersByStatus(
          Object.keys(statusOrders)[0],
          10,
          this.page,
          profile.type,
          profile.type === accountType.sale ? selectedAgency.id : undefined,
        );
        const orders = results.data;

        const selectedTab =
          orders.length === 0
            ? Object.keys(statusOrders)[1]
            : Object.keys(statusOrders)[0];
        this.setState({tabs: statusOrders, selectedTab});
        await this.getOrdersByStatus(selectedTab);
      }
    } finally {
      this.setState({ordersRequesting: false});
    }
  };

  getOrdersByStatus = async status => {
    this.setState({ordersRequesting: true});
    try {
      const {profile} = this.props.profile;
      const selectedAgency = await getSelectedAgency();
      const results = await API.getOrdersByStatus(
        status,
        10,
        this.page,
        profile.type,
        profile.type === accountType.sale ? selectedAgency.id : undefined,
      );
      const orders = results.data;
      if (results) {
        this.isLoadMore = !!results.next_page_url;
      }
      if (results && results.data) {
        this.setState({orders});
      }
    } finally {
      this.setState({ordersRequesting: false});
    }
  };

  loadMore = async () => {
    if (!this.isLoadMore) return;
    ++this.page;
    const {profile} = this.props.profile;
    const selectedAgency = await getSelectedAgency();
    let results = await API.getOrdersByStatus(
      this.state.selectedTab,
      10,
      this.page,
      profile.type,
      profile.type === accountType.sale ? selectedAgency.id : undefined,
    );
    if (results) {
      this.isLoadMore = !!results.next_page_url;
    }
    if (results && results.data) {
      this.setState({orders: [...this.state.orders, ...results.data]});
    }
  };

  onRefresh = async () => {
    this.page = 1;
    this.isLoadMore = true;
    this.setState({loading: true, loadingRefresh: true});
    await this.getOrdersByStatus(this.state.selectedTab);
    this.setState({loadingRefresh: false});
  };

  reloadOrders = () => {
    const {selectedTab} = this.state;
    this.page = 1;
    this.isLoadMore = true;
    this.getOrdersByStatus(selectedTab);
  };

  onSelectStatus = status => {
    this.setState({selectedTab: status});
    this.page = 1;
    this.isLoadMore = true;
    this.getOrdersByStatus(status);
  };

  renderLoading = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };

  renderEmpty = () => {
    return (
      <View style={styles.emptyView}>
        <Image
          style={[styles.emptyImage]}
          resizeMode="contain"
          source={require('../../../res/icon/empty.png')}
        />
        <Text
          style={[styleBase.text18, styleBase.textBold, styleBase.textGrey]}>
          Không có đơn hàng nào!
        </Text>
      </View>
    );
  };

  renderTabs = () => {
    const {selectedTab, tabs} = this.state;
    return (
      <View style={styles.tabs}>
        {Object.entries(tabs).map(entry => {
          return (
            <TouchableOpacity
              key={entry[0]}
              onPress={() => {
                this.onSelectStatus(entry[0]);
              }}
              style={styles.tab}>
              <Text
                style={
                  selectedTab === entry[0] ? styles.activeText : styles.text
                }>
                {entry[1]}
              </Text>
              {selectedTab === entry[0] && <View style={styles.line} />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderOrderItem = ({item, index}) => {
    const {tabs, selectedTab} = this.state;
    const {profile} = this.props.profile;
    return (
      <OrderItem
        reloadOrders={this.reloadOrders}
        nextStatusKey={parseInt(selectedTab, 10) + 1}
        nextStatus={
          profile.type === accountType.sale &&
          parseInt(selectedTab, 10) < Object.keys(tabs).length - 1 &&
          tabs[parseInt(selectedTab, 10) + 1]
        }
        showCancel={selectedTab === '1'}
        key={item.id}
        order={item}
      />
    );
  };

  renderSeparator = item => {
    return <View style={[styles.separator]} />;
  };

  renderOrdersList = () => {
    const {orders, loadingRefresh} = this.state;
    return orders.length === 0 ? (
      this.renderEmpty()
    ) : (
      <FlatList
        bounces={false}
        data={orders}
        ItemSeparatorComponent={this.renderSeparator}
        onEndReached={this.loadMore}
        onEndReachedThreshold={16}
        refreshing={loadingRefresh}
        onRefresh={this.onRefresh}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderOrderItem}
      />
    );
  };

  renderOrders = () => {
    const {ordersRequesting} = this.state;
    return ordersRequesting ? this.renderLoading() : this.renderOrdersList();
  };

  render(): ReactNode {
    const {selectedAgency} = this.state;
    const {profile} = this.props.profile;
    return (
      <View style={styles.container}>
        <Toolbar
          right={<CartIcon />}
          center={<Text style={styles.title}>Đơn hàng</Text>}
        />
        {(!!selectedAgency || profile.type === accountType.agency) && (
          <>
            {this.renderTabs()}
            {this.renderOrders()}
          </>
        )}
        {!selectedAgency && profile.type === accountType.sale && (
          <View style={styles.body}>
            <Text style={styles.message}>
              Chưa chọn đại lý cho phiên làm việc
            </Text>
          </View>
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
)(OrderListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.bg,
  },
  message: {
    color: appColor.blur,
    fontSize: sizeFont(18),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: sizeFont(18),
    fontFamily: font.bold,
  },
  tabs: {
    flexDirection: 'row',
    height: sizeWidth(44),
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: appColor.blur,
    fontFamily: font.medium,
  },
  activeText: {
    fontFamily: font.bold,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: sizeWidth(3),
    backgroundColor: appColor.primary,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  emptyView: {
    flex: 1,
    margin: sizeWidth(50),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    height: sizeWidth(50),
    //color: styleBase.textGrey.color,
  },
  separator: {
    width: '100%',
    height: 1,
    marginVertical: 2,
    backgroundColor: '#dedede',
  },
});
