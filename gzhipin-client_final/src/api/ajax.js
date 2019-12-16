/*
能发送ajax请求的函数模块
函数的返回值是promise对象
 */
import axios from 'axios'
const baseUrl = '';
export default function ajax(url,data={},type='GET') {
  url = baseUrl +url;
  if (type === 'GET'){
    let paramStr = '';
    Object.keys(data).forEach(key=>{
      paramStr+=key+'='+data[key]+'&'
    })
    if(paramStr){
      paramStr = paramStr.substring(0,paramStr.length-1)
    }
    //使用axios发送get请求
    return axios.get(url+'?'+paramStr)
  }else {
    //使用post发送请求
    return axios.post(url,data)
  }
}