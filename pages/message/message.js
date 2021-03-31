// pages/message/message.js
import {getMessageUnread, markMessage} from '../../api/message'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messagesInfo: [],
    showMessage: false,
    showIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getMessageUnread().then(res => {
      console.log(res)
      this.setData({
        messagesInfo: res
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

  onClickMessage(e) {
    this.setData({
      showMessage: true,
      showIndex: e.currentTarget.dataset['index']
    })
  },

  showMessagesList(e) {
    this.setData({
      showMessage: false,
      showIndex: 0
    })
  },

  onClickMarkMessage() {
    let messagesInfo = this.data.messagesInfo;
    console.log(messagesInfo[this.data.showIndex].id)
    markMessage(messagesInfo[this.data.showIndex].id).then(res => {
      if(res) {
        messagesInfo[this.data.showIndex].read = true; 
        this.setData({
          messagesInfo
        })
        
      }
    })
  }
})