import request from '../utils/request.js'

export const createHonor = (honor) => {
  return request({
    url: "/honor",
    method: "post",
    data: {
      ...honor
    }
  })
}

export const getHonors = (openid) => {
  return request({
    url: "/honor/user",
    method: "get",
    data: {
      openid
    }
  })
}