import request from '../utils/request.js'

export const getNotificationNow = () => {
  return request({
    url: "/notification/byTimeNow",
    method: "get",
    data: {
      
    }
  })
}