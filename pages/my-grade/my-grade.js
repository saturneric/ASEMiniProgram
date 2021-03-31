// pages/my-grade/my-grade.js

import {getGrade, getSemesters, getSemesterGrades, getCourseGrades} from '../../api/course'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeInfo: {},
    semestersInfo: [],
    showSemester: false,
    targetSemesterInfo: {},
    targetCoursesInfo: [],
    showIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getGrade().then(res => {
      console.log(res)
      this.setData({
        gradeInfo: res
      })
    }).then(res => {
      return getSemesters().then(res => {
        console.log(res)
        this.setData({
          semestersInfo: res
        })
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onClickBack() {
    this.setData({
      showSemester: false,
      targetCoursesInfo: [],
      targetSemesterInfo: {}
    })
  },

  onClickSemesterItem(e) {
    let index = parseInt(e.currentTarget.dataset['index'])

    getSemesterGrades(this.data.semestersInfo[index].id).then(res => {
      console.log(res)
      this.setData({
        targetSemesterInfo: res
      })
      return Promise.resolve(this.data.semestersInfo[index].id)
    }).then(sem_id => {
      return getCourseGrades(sem_id).then(res => {
        console.log(res)
        this.setData({
          targetCoursesInfo: res
        })
      })
    }).then(res => {
      this.setData({
        showSemester: true,
      })
    })
  }
})