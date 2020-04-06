import RequestHelper from '../helpers/request.helper';
import lodash from 'lodash';
import {appConfig} from '../config/app.config';
import {accountType} from '../constants/app.constant';
import {getSelectedAgency} from '../helpers/storage.helper';

export default class Api {
  static loginAgency({username, password, device_id, device_name}) {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/agency/login',
      {
        username,
        password,
        device_id,
        device_name,
      },
      null,
      true,
    );
  }

  static loginSale({email, password, device_id, device_name}) {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/admin/login',
      {
        email,
        password,
        device_id,
        device_name,
      },
      null,
      true,
    );
  }

  static logoutSale() {
    return RequestHelper.post(appConfig.apiUrl + 'public/api/admin/logout');
  }

  static logoutAgency() {
    return RequestHelper.post(appConfig.apiUrl + 'public/api/agency/logout');
  }

  static agencyInfo() {
    return RequestHelper.get(appConfig.apiUrl + 'public/api/agency/info');
  }

  static saleInfo() {
    return RequestHelper.get(appConfig.apiUrl + 'public/api/admin/info');
  }

  static async homeProducts(categoryId, role) {
    const agency = await getSelectedAgency();
    const regionId = lodash.get(agency, 'region_id');
    const data = await RequestHelper.get(
      appConfig.apiUrl +
        `public/api/${
          role === accountType.agency
            ? `agency/home/${categoryId}/products`
            : `admin/home/${categoryId}/${regionId}/products`
        }`,
    );
    return data;
  }

  static rootCategories(role) {
    return RequestHelper.get(
      appConfig.apiUrl +
        `public/api/${
          role === accountType.agency ? 'agency' : 'admin'
        }/categoryRoot`,
    );
  }

  static getChildCategory(category_id) {
    return RequestHelper.get(
      appConfig.apiUrl + `public/api/agency/categoryChild/${category_id}`,
    );
  }

  static changePassword({password_old, password, logoutall = false, type}) {
    return RequestHelper.put(
      appConfig.apiUrl +
        `public/api/${
          type === accountType.agency ? 'agency' : 'admin'
        }/changePassword`,
      {
        password_old,
        password,
        logoutall,
      },
    );
  }

  static async productByCategory(params, role) {
    const agency = await getSelectedAgency();
    return RequestHelper.post(
      appConfig.apiUrl +
        `public/api/${
          role === accountType.agency ? 'agency' : 'admin'
        }/productOfCategory`,
      {...params, region_id: lodash.get(agency, 'region_id')},
    );
  }

  static async productsOfMonth(params, isSaleAccount) {
    const agency = await getSelectedAgency();
    const data = await RequestHelper.post(
      appConfig.apiUrl +
        'public/api/' +
        (isSaleAccount ? 'admin' : 'agency') +
        '/productOfMonth',
      {...params, region_id: lodash.get(agency, 'region_id')},
    );
    return data;
  }

  static getOrderedProducts(params) {
    return RequestHelper.post(
      `${appConfig.apiUrl}public/api/agency/productHasOrder`,
      params,
    );
  }

  static productInfo(id, type) {
    return RequestHelper.get(
      appConfig.apiUrl +
        `public/api/${
          type === accountType.agency ? 'agency' : 'admin'
        }/product/${id}`,
    );
  }

  static createOrder(order) {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/agency/order',
      order,
    );
  }

  static createOrderSale(order) {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/admin/order',
      order,
    );
  }

  static getStatusOrders(type) {
    return RequestHelper.get(
      appConfig.apiUrl +
        `public/api/${type === accountType.agency ? 'agency' : 'admin'}/${
          type === accountType.agency ? 'orderStatus' : 'status'
        }`,
    );
  }

  static getOrdersByStatus(status, limit, page, type, agencyid) {
    return RequestHelper.post(
      appConfig.apiUrl +
        `public/api/${
          type === accountType.agency ? 'agency' : 'admin'
        }/orderHistoryByStatus`,
      {orderStatus: status, limit, page, agencyid},
    );
  }

  static async searchProduct({
    keyword = '',
    limit = 10,
    page = 1,
    filter_sort = 'id_desc',
  }) {
    const agency = await getSelectedAgency();
    const data = await RequestHelper.post(
      appConfig.apiUrl + 'public/api/agency/search',
      {
        keyword,
        page,
        limit,
        filter_sort,
        region_id: lodash.get(agency, 'region_id'),
      },
    );
    return data;
  }

  static searchProductSale({
    keyword = '',
    limit = 10,
    page = 1,
    filter_sort = 'id_desc',
  }) {
    return RequestHelper.post(appConfig.apiUrl + 'public/api/admin/search', {
      keyword,
      page,
      limit,
      filter_sort,
    });
  }

  static sendFeedback(content) {
    return RequestHelper.post(appConfig.apiUrl + 'public/api/agency/feedback', {
      content,
    });
  }

  static getListRating() {
    return RequestHelper.get(appConfig.apiUrl + 'public/api/agency/listRating');
  }

  static submitRating(rating) {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/agency/rating',
      rating,
    );
  }

  static getOrderInCart() {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/agency/orderHistoryByStatus',
    );
  }

  static getListNotification({type, page = 1, limit = 10}) {
    return RequestHelper.post(
      appConfig.apiUrl +
        `public/api/${
          type === accountType.agency ? 'agency' : 'admin'
        }/getListNoti`,
      {page, limit},
    );
  }

  static markReadNotification(notify_id, type) {
    return RequestHelper.get(
      appConfig.apiUrl +
        `public/api/${
          type === accountType.agency ? 'agency' : 'admin'
        }/isRead/${notify_id}`,
    );
  }

  static async getAgencies() {
    const data = await RequestHelper.post(
      `${appConfig.apiUrl}public/api/admin/agency`,
    );
    console.log(data);
    return data;
  }

  static scanBarcode(barcode) {
    return RequestHelper.get(
      `${appConfig.apiUrl}public/api/agency/getProductBarcode/${barcode}`,
    );
  }

  static async scanBarcodeSale(barcode) {
    const agency = await getSelectedAgency();
    const regionId = lodash.get(agency, 'region_id');
    const data = await RequestHelper.get(
      `${appConfig.apiUrl}public/api/admin/getProductBarcode/${barcode}/${regionId}`,
    );
    return data;
  }

  static getInfoSale() {
    return RequestHelper.get(`${appConfig.apiUrl}public/api/agency/infoSale`);
  }

  static updateAgencyInfo(updatedInfo) {
    return RequestHelper.put(
      `${appConfig.apiUrl}public/api/agency/info`,
      updatedInfo,
    );
  }

  static uploadAvatar(data, config) {
    return RequestHelper.post(
      `${appConfig.apiUrl}public/api/agency/avatar`,
      data,
      config,
    );
  }

  static uploadSaleAvatar(data, config) {
    return RequestHelper.post(
      `${appConfig.apiUrl}public/api/admin/avatar`,
      data,
      config,
    );
  }

  static sendChatImage(data, config, type) {
    return RequestHelper.post(
      `${appConfig.apiUrl}public/api/${
        type === accountType.agency ? 'agency' : 'admin'
      }/image_chat`,
      data,
      config,
    );
  }

  static cancelOrder(orderId, type) {
    return RequestHelper.put(
      `${appConfig.apiUrl}public/api/${
        type === accountType.agency ? 'agency' : 'admin'
      }/cancelOrder/${orderId}`,
    );
  }

  static changeOrderStatus(idOrder, status) {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/admin/changeStatus',
      {idOrder, status},
    );
  }

  static getLiability({page = 1, limit = 10}) {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/agency/liabilities',
      {page, limit},
    );
  }

  static updateSaleInfo(updatedInfo) {
    return RequestHelper.put(
      `${appConfig.apiUrl}public/api/admin/info`,
      updatedInfo,
    );
  }

  static getOrderDetail(orderId, type) {
    return RequestHelper.get(
      appConfig.apiUrl +
        `public/api/${
          type === accountType.agency ? 'agency' : 'admin'
        }/orderHistoryDetail/${orderId}`,
    );
  }

  static getUnreadNotificationAgency() {
    return RequestHelper.get(appConfig.apiUrl + 'public/api/agency/unreadNoti');
  }

  static getUnreadNotificationSale() {
    return RequestHelper.get(appConfig.apiUrl + 'public/api/admin/unreadNoti');
  }

  static getDetailNotification(notification_id) {
    return RequestHelper.get(
      appConfig.apiUrl + `public/api/agency/getDetailNoti/${notification_id}`,
    );
  }

  static getDetailNotificationSale(notification_id) {
    return RequestHelper.get(
      appConfig.apiUrl + `public/api/admin/getDetailNoti/${notification_id}`,
    );
  }

  static addCommentToOrder({idOrder, comment}) {
    return RequestHelper.post(
      appConfig.apiUrl + 'public/api/admin/addCommnetToOrder',
      {idOrder, comment},
    );
  }

  static checkRatingInMonth() {
    return RequestHelper.get(
      appConfig.apiUrl + 'public/api/agency/checkRatingInMonth',
    );
  }

  static getCommentChangeStatus(idOrder, type) {
    return RequestHelper.get(
      appConfig.apiUrl +
        `public/api/${
          type === accountType.agency ? 'agency' : 'admin'
        }/getCommentChangeStatus/${idOrder}`,
    );
  }
}
