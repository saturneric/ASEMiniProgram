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