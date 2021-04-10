import request from '../utils/request.js'

export const getGrade = () => {
  return request({
    url: "/course/grade",
    method: "get",
    data: {
      
    }
  })
}

export const getSemesters = () => {
  return request({
    url: "/course/semesters",
    method: "get",
    data: {
      
    }
  })
}

export const getSemesterGrades = (semester_id) => {
  return request({
    url: "/course/grade/semester",
    method: "get",
    data: {
      semesterId: semester_id
    }
  })
}

export const getCourseGrades = (semester_id) => {
  return request({
    url: "/course/grade/courses",
    method: "get",
    data: {
      semesterId: semester_id
    }
  })
}

export const getStudentsGrade = () => {
  return request({
    url: "/course/grade/students",
    method: "get",
    data: {}
  })
}

export const getGradeForParent = (openid) => {
  return request({
    url: "/course/grade/parent",
    method: "get",
    data: {
      openid
    }
  })
}

export const getSemestersForParent = (openid) => {
  return request({
    url: "/course/semesters/parent",
    method: "get",
    data: {
      openid
    }
  })
}

export const getSemesterGradesForParent = (openid, semester_id) => {
  return request({
    url: "/course/grade/semester/parent",
    method: "get",
    data: {
      openid,
      semesterId: semester_id
    }
  })
}

export const getStudentsGradeBySemesterAndUser = (semesterId) => {
  return request({
    url: "/course/grade/students/semester",
    method: "get",
    data: {
      semesterId
    }
  })
}

export const getStudentWeightedAveragesSemesterValues = (openid) => {
  return request({
    url: "/course/students/semesters",
    method: "get",
    data: {
      openid,
    }
  })
}

export const getStudentMaybeInDanger = () => {
  return request({
    url: "/course/students/danger",
    method: "get",
    data: {
    }
  })
}