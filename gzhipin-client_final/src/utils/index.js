/*
包含n个工具函数的模块

注册 laoban-->/laobaninfo
注册大神 -->/dasheninfo
登录laoban -->/laobaninfo 或者laoban
登录大神 -->/dasheninfo 或者 /dashen
 */
export function getRedirectPath(type,header) {
    let path = '';

    //根据type得到path
    path +=type==='laoban' ? '/laoban' :'/dashen'
    //如果没有头像添加info
    if(!header){
        path +='info'
    }
    return path;
}