import request from '../utils/request.js'

export const login = (appID, code)=>{
  return request({
    url:  '/wx/user/' + appID + '/login',
    method: 'get',
    data: {
      code
    } 
  })
}

export const checkProfile = () => {
  return request({
    url: "/user/profile/uploaded",
    method: "get",
    data: {}
  })
}

export const setProfile = (userInfo) => {
  return request({
    url: "/user/profile/",
    method: "post",
    data: userInfo
  })
}

export const getProfile = () => {
  return request({
    url: "/user/profile/",
    method: "get",
    data: {}
  })
}