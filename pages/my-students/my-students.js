// pages/my-student/my-students.js
import {searchStudents} from '../../api/document'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  showInput: function () {
    this.setData({
        inputShowed: true
    });
  }, 

  hideInput: function () {
    this.setData({
        inputVal: "",
        inputShowed: false
    });
  },

  clearInput: function () {
    this.setData({
        inputVal: ""
    });
  },

  inputTyping: function (e) {
    let inputVal = e.detail.value
    this.setData({
        inputVal
    });
    searchStudents(inputVal).then(res => {
      console.log(res)
    })
  }
})