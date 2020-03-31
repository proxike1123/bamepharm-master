import {appConfig} from '../config/app.config';

export const imageFullpath = (url, withSlash) => {
  return `${appConfig.apiUrl}public${withSlash ? '' : '/'}${url}`;
};

export const videoFullpath = (url, withSlash) => {
  return `${appConfig.apiUrl}public${withSlash ? '' : '/'}${url}`;
};
