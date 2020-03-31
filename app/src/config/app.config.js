export const appConfig = {
  // apiUrl: 'http://irtech.com.vn/giaybq/',
  // adminUrl: 'http://irtech.com.vn/giaybq/public/bq_admin',
  apiUrl: 'http://app001.giaybq.vn:8088/',
  adminUrl: 'http://app.giaybq.vn/public/bq_admin',
};

export const getConversationKey = (saleId, agencyId) => {
  return `agency${agencyId}-conversation`;
};
