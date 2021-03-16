import request from '../utils/request.js'

export const getDocument = openid => {
  return request({
    url: "/document",
    method: "get",
    data: {
      openid
    }
  })
}