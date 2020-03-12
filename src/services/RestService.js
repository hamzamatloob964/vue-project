import axios from 'axios';
const BASE_URL = 'http://13.125.249.92:9000/api/v1/app-mgt/'
//const BASE_URL = 'http://10.0.0.179:9000/api/v1/app-mgt/'
var Cookies = require('vue-cookies')

const get = (url, options = {}) => {
  return new Promise((resolve, reject) => {

    let token = Cookies.get('adminToken');
    token = 'bearer '+token
    options.headers = {authorization: token};

    axios.get(`${BASE_URL}${url}`, options).then(response => {
      if (response.data) {
        resolve(response.data);
      } else {
        reject();
      }
    }).catch(error => {
      if(error && error.response && error.response.data)
        reject(error.response.data);
      else
        reject("please check internet connection");
    })
  })
}

const post = (url, payload, options={}) => {

  let token = Cookies.get('adminToken');
  token = 'bearer '+token
  options.headers = {authorization: token};

  return new Promise(function (resolve, reject) {
    axios.post(`${BASE_URL}${url}`, payload, options).then(response => {
      resolve(response.data)
    })
    .catch(error => {
      if(error && error.response && error.response.data)
        reject(error.response.data);
      else
        reject("please check internet connection");
    });
  })  
}

const put = (url, payload, options = {}) => {

  let token = Cookies.get('adminToken');
  token = 'bearer '+token
  options.headers = {authorization: token};

  return new Promise(function (resolve, reject) {
    axios.put(`${BASE_URL}${url}`, payload, options).then(response => {
      if (response.data) {
        resolve(response.data);
      }
      else {
        reject();
      }
    }).catch(error => {
      console.log('ERROR>>>', error.response);
      reject(error);
    })
  })
}

const del = (url, options) => {
  let token = Cookies.get('adminToken');
  token = 'bearer '+token
  options.headers = {authorization: token};
  return new Promise(function (resolve, reject) {
    axios.delete(`${BASE_URL}${url}`, options).then(response => {
      if (response.data) {
        resolve(response.data);
      }
      else {
        reject();
      }
    }).catch(error => {
      console.log('ERROR>>>', error.response);
      reject(error);
    })
  })
}

export {
  get,
  post,
  put,
  del
};
