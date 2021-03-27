import request from '../utils/request.js'

export const getSupervisorsProfile = () => {
  return request({
    url: "/account/supervisors",
    method: "get",
    data: {
    }
  })
}

export const getChildrenProfile = () => {
  return request({
    url: "/account/children",
    method: "get",
    data: {
    }
  })
}