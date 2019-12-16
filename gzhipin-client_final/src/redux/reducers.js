/*
包含n个reducer函数: 根据老的state和指定的action返回一个新的state
 */
import {combineReducers}from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER} from "./action-types";
import {getRedirectPath} from "../utils";

const initUser={
  username:'',//用户名
  type:'',//类型
  msg:'',//错误提示信息
  redirectTo:''//需要自动跳转的路由PATH
}

function user(state = initUser,action){
  switch (action.type) {
    case AUTH_SUCCESS://认证成功
          const redirectTo = getRedirectPath(action.data.type,action.data.header)
          return {...action.data,redirectTo}
      // return {...action.data,redirectTo: '/'};
    case ERROR_MSG://错误信息提示
      return {msg: action.data};
    case RECEIVE_USER://接收用户
      return action.data;
    case RESET_USER://重置用户
      return {...initUser,msg:action.data};
    default:
      return state
  }
}

//返回合并后的reducer函数
export default combineReducers({
  user
})