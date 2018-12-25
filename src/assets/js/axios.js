import axios from 'axios';
import errCode from './httpCode';
import {message} from 'antd';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css' 
import qs from 'qs';

import { SessionStorages } from './fun';

// nprogress.inc(0.2)
nprogress.configure({ easing: 'ease', speed: 500 })

// axios.defaults.baseUrl  = 'http:127.0.0.1:3001';
//超时响应
axios.defaults.timeout = 1000 * 30;
axios.defaults.withCredentials = true
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    nprogress.start();
    // 在发送请求之前做些什么
    config.headers.Authorization = SessionStorages.get('_REACTLJXADMINTOKEN') || '';
    config.data = qs.stringify(config.data, {arrayFormat: 'brackets'})
    return config;
  }, function (error) {
    nprogress.done() 
    // 对请求错误做些什么
    return Promise.reject(error);
});

  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    nprogress.done() 
    // 对响应数据做点什么
    if(response.data.code === errCode._TOKENERROR){
        message.error(response.data.message);
        SessionStorages.clear();
        window.location.reload();
    }
    return response;
  }, function (error) {
    nprogress.done() 

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