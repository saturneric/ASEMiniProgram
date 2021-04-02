// pages/account-doc-info/account-doc-info.js
import {getUserProfileSupervisor} from '../../api/document'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    hasUserDocument: false,
    userInfo: null,
    userDocuement: null,
    admin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.admin === "true") {
      const eventChannel = this.getOpenerEventChannel()
      let that = this
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        console.log(data)
        that.setData({
          hasUserInfo: false,
          userInfo: {}
        })
        that.setUserDocument(data.userDocument)
        if(data.userDocument.connected) {
          getUserProfileSupervisor(data.userDocument.id).then(res => {
            console.log(res)
            that.setData({
              hasUserInfo: true,
              userInfo: res
            })
          })
        }
      })
    } else {
      if(app.globalData.userInfo){

        this.setData({
          hasUserInfo: true,
          userInfo: app.globalData.userInfo
        })
      }
      if(app.globalData.userDocument){
        this.setUserDocument(app.globalData.userDocument)
      }
    }
  },

  setUserDocument(document) {

      let userDocument = document
      switch(userDocument.gender) {
        case 'F':
          userDocument.gender = '女'
          break;
        case 'M':
          userDocument.gender = '男'
          break;
        case 'U':
          userDocument.gender = '未知'
          break;
      }
      switch(userDocument.role) {
        case 'ROLE_STUDENT':
          userDocument.role = '学生'
          break;
        case 'ROLE_PARENT':
          userDocument.role = '家长'
          break;
        case 'ROLE_SUPERVISOR':
          userDocument.role = '辅导员'
          break;
      }
      this.setData({
        hasUserDocument: true,
        userDocument: userDocument
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

  }
})