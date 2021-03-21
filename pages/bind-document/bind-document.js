// pages/bind-document.js

import {searchDocument} from '../../api/document'

Page({

  /**
   * 页面的初始数据
   */
  data: {

    radioItems: [
      { name: '1', value: '学生', checked: 'true'},
      { name: '2', value: '家长'},
      { name: '3', value: '辅导员'},
    ],
    userRoleType: '1',
    currentValue: '',
    document: null,
    showDocument: false,
    warnToast: false,
    hideWarnToast: true
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

  radioChange(res) {
    console.log(res.detail.value)
    this.setData({
      userRoleType: res.detail.value
    })
  },

  onCurrentInput(res) {
    this.setData({
      currentValue: res.detail.value
    })
  },

  onReset() {
    this.setData({
      document: null,
      showDocument: false
    })
  },

  onBind() {
    
  },

  onConfirm() {

    let documentCode = this.data.currentValue
    let userRoleName;
    switch(this.data.userRoleType) {
      case '1':
        userRoleName = 'Student'
        break;
      case '2':
        userRoleName = 'Parent'
        break;
      case '3':
        userRoleName = 'Supervisor'
        break;
    }
    searchDocument(userRoleName, documentCode).then(res => {
      console.log(res)
      let document = res
      
      // 转换部分字段

      switch(document.gender) {
        case 'M':
          document.gender = '男'
          break;
        case 'F':
          document.gender = '女'
          break;
        case 'U':
          document.gender = '未知'
          break;
      }

      switch(document.role) {
        case 'ROLE_STUDENT':
          document.role = '学生'
          break;
        case 'ROLE_PARENT':
          document.role = '家长'
          break;
        case 'ROLE_SUPERVISOR':
          document.role = '辅导员'
          break;
      }

      this.setData({
        document: document,
        showDocument: true
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        warnToast: true
      });
      setTimeout(() => {
          this.setData({
              hidewarnToast: true
          });
          setTimeout(() => {
              this.setData({
                  warnToast: false,
                  hidewarnToast: false,
              });
          }, 300);
      }, 3000);
    })
  }
})