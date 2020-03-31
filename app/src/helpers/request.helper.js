import axios from 'axios';
import qs from 'qs';
import {getToken} from './storage.helper';
import {message, event} from '../constants/app.constant';
import lodash from 'lodash';
import EventRegister from './event-register.helper';

const instance = axios.create({
  timeout: 30000,
});

const handleError = (error, isLogin) => {
  if (error.response) {
    console.log(error.response);
    const message = lodash.get(error.response, 'data.error.message');
    if (
      !isLogin &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      EventRegister.emit(event.forceLogout);
    }
  } else if (error.request) {
  } else {
  }
};

export default class RequestHelper {
  static async getHeader(config = {}): void {
    const token = await getToken();
    return {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: token && `Bearer ${token}`,
      ...config,
    };
  }

  static async get(url: string, params: {}): void {
    const header = await this.getHeader();
    return instance
      .get(url, {
        headers: header,
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, {arrayFormat: 'repeat'});
        },
      })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }

  static async post(url: string, data, config, isLogin): void {
    return instance({
      method: 'POST',
      url: url,
      headers: await this.getHeader(config),
      data: data,
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e, isLogin);
        throw e;
      });
  }

  static async put(apiUrl: string, data: {}): void {
    return instance({
      method: 'PUT',
      url: apiUrl,
      headers: await this.getHeader(),
      data: data,
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }

  static async delete(apiUrl: string, data: {}): void {
    return instance({
      method: 'DELETE',
      url: apiUrl,
      headers: await this.getHeader(),
      data: data,
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
}
