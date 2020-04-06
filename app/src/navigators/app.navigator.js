import {createStackNavigator} from 'react-navigation';
import SplashScreen from '../screens/splash/splash.screen';
import {MainNavigator} from './main.navigator';
import LoginScreen from '../screens/login/login.screen';
import ProductScreen from '../screens/product/product.screen';
import ProductImageScreen from '../screens/product/product-image';
import CartScreen from '../screens/cart/cart.screen';
import OrderScreen from '../screens/order/order.screen';
import {SaleMainNavigator} from './sale-main.navigator';
import ProductByMonthScreen from '../screens/product/product-by-month/product-by-month.screen';
import ProduceByCategoryScreen from '../screens/product/product-by-category/product-by-category.screen';
import ConversationScreen from 'app/src/screens/chat/conversation';
import SecurityScreen from '../screens/security/security.screen';
import ScanBarcodeScreen from '../screens/barcode/scanner-barcode';
import FeedbackScreen from 'app/src/screens/feedback';
import AccountUserInfoScreen from '../screens/account/account-user-info.screen';
import RatingScreen from 'app/src/screens/rating';
import SearchProductScreen from 'app/src/screens/search/search-product.screen';
import AccountStatementsScreen from '../screens/account/account-statements/account-statement.screen';
import LiabilityScreen from '../screens/liability/liability.screen';
import OrderedProductScreen from '../screens/account/ordered-product/ordered-product.screen';
import NotificationDetailScreen from '../screens/notificationDetail/notification-detail.screen';
import SaleInfoScreen from '../screens/account/sale-info.screen';
import OrderDetailScreen from 'app/src/screens/orderDetail/order-detail.screen';
import NotFoundProductScreen from 'app/src/screens/barcode/not-found-product.screen';
import WebViewPreview from 'app/src/components/webview';

const stackNavigatorOptions = {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
  },
};

export const AppNavigator = createStackNavigator(
  {
    Splash: {screen: SplashScreen},
    Order: {screen: OrderScreen},
    Product: {screen: ProductScreen},
    Main: {screen: MainNavigator},
    SaleMain: {screen: SaleMainNavigator},
    Login: {screen: LoginScreen},
    Cart: {screen: CartScreen},
    ProductByMonth: {screen: ProductByMonthScreen},
    Security: {screen: SecurityScreen},
    Conversation: {screen: ConversationScreen},
    AccountUserInfo: {screen: AccountUserInfoScreen},
    Barcode: {screen: ScanBarcodeScreen},
    Feedback: {screen: FeedbackScreen},
    Rating: {screen: RatingScreen},
    ProductByCategory: {screen: ProduceByCategoryScreen},
    SearchProduct: {screen: SearchProductScreen},
    ProduceByCategory: {screen: ProduceByCategoryScreen},
    AccountStatements: {screen: AccountStatementsScreen},
    Liability: {screen: LiabilityScreen},
    OrderedProduct: {screen: OrderedProductScreen},
    NotificationDetail: {screen: NotificationDetailScreen},
    SaleInfo: {screen: SaleInfoScreen},
    OrderDetail: {screen: OrderDetailScreen},
    NotFoundProduct: {screen: NotFoundProductScreen},
    WebViewPreview: {screen: WebViewPreview},
    ProductImage: {screen: ProductImageScreen},
  },
  stackNavigatorOptions,
);
