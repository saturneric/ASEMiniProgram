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

export const bindDocument = (documentCode) => {
  return request({
    url: "/document/bind",
    method: "post",
    data: {
      documentCode
    }
  })
}

export const checkParents = () => {
  return request({
    url: "/document/parents/check",
    method: "get",
    data: {
    }
  })
}

export const getParents = () => {
  return request({
    url: "/document/parents",
    method: "get",
    data: {
    }
  })
}

export const checkChildren = () => {
  return request({
    url: "/document/children/check",
    method: "get",
    data: {
    }
  })
}

export const getChildren = () => {
  return request({
    url: "/document/children",
    method: "get",
    data: {
    }
  })
}

export const checkSupervisors = () => {
  return request({
    url: "/document/supervisors/check",
    method: "get",
    data: {
    }
  })
}

export const getSupervisors = () => {
  return request({
    url: "/document/supervisors",
    method: "get",
    data: {
    }
  })
}

export const searchStudents = (numbering) => {
  return request({
    url: "/document/students/search",
    method: "get",
    data: {
      numbering
    }
  })
}