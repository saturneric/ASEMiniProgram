// pages/students-grade-analyse/students-grade-analyse.js
import {getStudentsGrade, getStudentsGradeBySemesterAndUser} from '../../api/course'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentsGradeInfo: {},
    studentsGradeSemesterInfo: {},
    showSemester: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getStudentsGrade().then(res =>{
      console.log(res)
      this.setData({
        studentsGradeInfo: res
      })
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

  onClickGradeTrend() {
    wx.navigateTo({
      url: '/pages/student-grade-trend/student-grade-trend'
    })
  },

  onClickStudentConerning() {
    wx.navigateTo({
      url: '/pages/student-need-concerning/student-need-concerning'
    })
  },

  onClickShowSemester(e) {
    const targetIndex = e.currentTarget.dataset['index'];
    console.log(targetIndex)
    getStudentsGradeBySemesterAndUser(targetIndex).then(res => {
        console.log(res)
        this.setData({
          studentsGradeSemesterInfo: res,
          showSemester: true
        })
    })
  },

  onClickBack() {
    this.setData({
      showSemester: false
    })
  }
})