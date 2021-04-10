import request from '../utils/request.js'

export const search = (title) => {
  return request({
    url: "/robot",
    method: "get",
    data: {
      title
    }
  })
}