import { v4 as uuidv4 } from 'uuid';
export const getUUID = ()=>{
    // 先从本地存储获取uuid，（看一下本地存储有没有
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if(!uuid_token){
       uuid_token =  uuidv4();
    //    本地存储存一次
    localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}