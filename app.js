// app.js
import request from './utils/request.js'

App({
  onLaunch() {

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    userBaseInfo: null,
    loginTime: null,
    login: false,
    loginCallback: null,
    appID: 'wxb915ee2a665fcb6c',
    baseURL: 'http://localhost:8088'
  }
})
