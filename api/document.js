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

export const searchDocument = (userRole, documentCode) => {
  return request({
    url: "/document/search",
    method: "get",
    data: {
      userRole, 
      documentCode
    }
  })
}