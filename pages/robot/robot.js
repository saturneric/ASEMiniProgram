// pages/robot/robot.js
import {search} from '../../api/robot'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    searchStudentsList: [],
    targetAnswer: {},
    showAnswer: false
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

  onClickShowDocument(e) {
    let showIndex = e.currentTarget.dataset['index']
    let targetAnswer = this.data.searchStudentsList[showIndex]
    this.setData({
      targetAnswer,
      showAnswer: true
    })
  },

  inputTyping: function (e) {
    let inputVal = e.detail.value
    this.setData({
        inputVal
    });
    if(inputVal.length > 0) {
      search(inputVal).then(res => {
        console.log(res)
        this.setData({
          searchStudentsList: res
        })
      })
    }
  },

  onClickBack() {
    this.setData({
      showAnswer: false,
      targetAnswer: {}
    })
  },

  onClickQuestion() {
    // 跳转
    wx.navigateTo({
      url: '/pages/question/question'  
    })
  }
})