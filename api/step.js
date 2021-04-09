import request from '../utils/request.js'

export const saveSteps = (encryptData, iv) => {
  return request({
    url: "/step",
    method: "post",
    data: {
      encryptData,
      iv
    }
  })
}

export const getStepsForParent = (openid) => {
  return request({
    url: "/step/parent",
    method: "get",
    data: {
      openid
    }
  })
}

export const getStepsMonth = () => {
  return request({
    url: "/step/month",
    method: "get",
    data: {}
  })
}

export const getStepsToday = () => {
  return request({
    url: "/step/today",
    method: "get",
    data: {}
  })
}