import { AxiosRequestHeaders } from 'axios';
import { createContext } from 'react';

const USER_BASE_URL = process.env.userServiceBaseUrl || 'http://localhost:3334/api';
const TAG_BASE_URL = process.env.tagServiceBaseUrl || 'http://localhost:3335/api';
const PROFILE_BASE_URL = process.env.profileServiceBaseUrl || 'http://localhost:3336/api';
const ARTICLE_BASE_URL = process.env.articleServiceBaseUrl || 'http://localhost:3337/api';

interface RoutesConfig {
  userBaseUrl: string;
  tagBaseUrl: string;
  profileBaseUrl: string;
  articleBaseUrl: string;
  headers: AxiosRequestHeaders;
}

const headersConfig: AxiosRequestHeaders = {
  "Content-Type": "application/json",
  Authorization: '',
}

const routesConfig: RoutesConfig = {
  userBaseUrl: `${USER_BASE_URL}`,
  tagBaseUrl: `${TAG_BASE_URL}`,
  profileBaseUrl: `${PROFILE_BASE_URL}`,
  articleBaseUrl: `${ARTICLE_BASE_URL}`,
  headers: headersConfig,
};

export interface IConfigContext {
  routesConfig: RoutesConfig;
  setToken(token:string):void;
  clearToken():void;
}

export const configContextValue: IConfigContext = {
  routesConfig,
  setToken: (token: string) => {
    routesConfig.headers = {
      ...routesConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  },
  clearToken: () => {
    routesConfig.headers = {
      ...routesConfig.headers,
      Authorization: '',
    };
  }
}

const token = localStorage.getItem('access_token');

if (token) {
  configContextValue.setToken(token);
}

export const ConfigContext = createContext({} as IConfigContext);
