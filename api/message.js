import request from '../utils/request.js'

export const getMessageUnread = () => {
  return request({
    url: "/message/unread",
    method: "get",
    data: {
    }
  })
}

export const markMessage = (messageId) => {
  return request({
    url: "/message/mark",
    method: "post",
    data: {
      messageId
    }
  })
}