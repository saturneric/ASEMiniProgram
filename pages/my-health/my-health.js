// pages/my-health/my-health.js
import {getStepsToday, saveSteps, getStepsMonth, getStepsForParent} from '../../api/step'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDocument:{},
    stepsInfo: {},
    monthStepsInfo: [],
    recordNotFound: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(options.isParent === 'true') {
      getStepsForParent(options.openid).then(res =>{
        console.log(res)
        this.setData({
          stepsInfo: res,
          monthStepsInfo: res.stepList
        })
        if(res.recordCount === 0) {
          this.setData({
            recordNotFound: true
          })
        }
      })
    } else {
      const that = this
      new Promise((resolve, reject) =>{
        wx.getWeRunData({
          success (res) {
            // 拿 encryptedData 到开发者后台解密开放数据
            const encryptedData = res.encryptedData
            // 或拿 cloudID 通过云调用直接获取开放数据
            const cloudID = res.cloudID
            // iv
            const iv = res.iv
  
            saveSteps(encryptedData, iv).then(res => {
              console.log(res)
              that.setData({
                stepsInfo: res,
                monthStepsInfo: res.stepList
              })
              resolve(res)
            })
          }
        })
      }).then(res => {
  
      })
    }
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

  }
})