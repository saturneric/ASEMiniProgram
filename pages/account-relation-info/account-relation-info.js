// pages/account-relation-info/account-relation-info.js
import {checkParents, checkChildren, getParents, getChildren, checkSupervisors, getSupervisors} from '../../api/document'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parentsInfo: [],
    childrenInfo: [],
    supervisorsInfo: [],
    noRecord: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    checkParents().then(res => {
      if(res === true) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    }).then(res => {
      return getParents()
    }).then(res => {
      this.setData({
        parentsInfo: res
      })
    }).catch(err => {
      
    }).then(res => {
      return checkChildren().then(res=>{
        if(res === true) {
          return Promise.resolve(res)
        } else {
          return Promise.reject(res)
        }
      })
    }).then(res => {
      return getChildren().then(res => {
        this.setData({
          childrenInfo: res
        })
      })
    }).catch(err => {

    }).then(res => {
      return checkSupervisors().then(res=>{
        if(res === true) {
          return Promise.resolve(res)
        } else {
          return Promise.reject(res)
        }
      })
    }).then(res => {
      return getSupervisors().then(res => {
        this.setData({
          supervisorsInfo: res
        })
      })
    }).finally(res => {
      if(this.data.supervisorsInfo.length === 0 && this.data.childrenInfo.length === 0 && this.data.parentsInfo.length === 0) {
        this.setData({
          noRecord: true
        })
      }
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

  onClickQuestion() {
    // 跳转
    wx.navigateTo({
      url: '/pages/question/question'  
    })
  }
})