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

export const createMessageAndSend = (openid, title, context) => {
  return request({
    url: "/message/",
    method: "post",
    data: {
      title,
      context
    }
  }).then(messageId => {
    return request({
      url: "/message/receiver",
      method: "post",
      data: {
        messageId,
        openid
      }
    })
  })
}

