import axios from 'axios';
import errCode from './httpCode';
import {message} from 'antd';
import qs from 'qs';

import { SessionStorages } from './fun';
// axios.defaults.baseUrl  = 'http:127.0.0.1:3001';
//超时响应
// axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = SessionStorages.get('_REACTLJXADMINTOKEN') || '';
    config.data = qs.stringify(config.data, {arrayFormat: 'brackets'})
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code === errCode._TOKENERROR){

    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

let http = {
    get:null,
    post:null,
    put:null,
    delete:null,
    all:null
}

http.get = (api,data=[]) => {
    return new Promise((resolve, reject) => {
      axios.get(api,...data).then(res=>{
          resolve(res);
      }).catch(err=>{
          reject(err);
      });
    })
    
}

http.post = (api,data=[]) => {
    return new Promise((resolve, reject) => {
      axios.post(api,...data).then(res=>{
          resolve(res);
      }).catch(err=>{
          reject(err);
      });
    })
    
}

export default http;