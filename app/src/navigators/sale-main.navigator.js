import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import BottomTabIcon from '../components/common/bottom-tab-icon';
import HomeScreen from '../screens/home-v2/home.screen';
import ChatScreen from '../screens/chat/chat.screen';
import OrderListScreen from '../screens/orderList/order-list.screen';
import NotificationScreen from '../screens/notification/notification.screen';
import AccountSaleScreen from '../screens/account/account-sale.screen';

import {sizeWidth, sizeFont} from '../helpers/size.helper';
import {appColor, font} from '../constants/app.constant';
import BottomNotifyIcon from 'app/src/components/common/bottom-noti-icon';

export const SaleMainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <BottomTabIcon
            focused={focused}
            source={require('../../res/icon/ic_home.png')}
          />
        ),
        tabBarLabel: 'Sản phẩm',
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <BottomTabIcon
            focused={focused}
            source={require('../../res/icon/icon-chat.png')}
          />
        ),
        tabBarLabel: 'Nhắn tin',
      },
    },
    OrderList: {
      screen: OrderListScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <BottomTabIcon
            focused={focused}
            source={require('../../res/icon/ic_order.png')}
          />
        ),
        tabBarLabel: 'Đơn hàng',
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <BottomNotifyIcon
            focused={focused}
            source={require('../../res/icon/icon-bell.png')}
          />
        ),
        tabBarLabel: 'Thông báo',
      },
    },
    Account: {
      screen: AccountSaleScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <BottomTabIcon
            focused={focused}
            source={require('../../res/icon/icon-account.png')}
          />
        ),
        tabBarLabel: 'Tài khoản',
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    backBehavior: 'none',
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      activeTintColor: appColor.primary,
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      tabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelStyle: {
        fontSize: sizeFont(12),
        fontFamily: font.regular,
      },
      style: {
        borderTopWidth: 0,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        height: sizeWidth(56),
      },
      iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
);
