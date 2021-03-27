// index.js

import {getDocument} from '../../api/document'
import {login, checkProfile, setProfile, getProfile} from '../../api/user'
import {getSupervisorsProfile, getChildrenProfile} from '../../api/account'

// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    userDocument: {},
    hasUserInfo: false,
    canIUse: true,
    loading: true,
    unrecoverable: false,
    refresh: false,
    unrecoverableInfo: '',
    childrenInfo: [],
    supervisorsInfo: []
    
  },
  handleLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          login(app.globalData.appID, res.code).then(res => {
            console.log(res)          
            if(res.userBanned) {
              return Promise.reject("用户被封禁")
            } else {
              app.globalData.login = true
              // 设置登录时间
              app.globalData.loginTime = Date.now()
              // 设置登录信息
              const userBaseInfo = {}
              userBaseInfo.openid = res.openid
              userBaseInfo.postmark = res.postmark
              userBaseInfo.token = res.token
  
              app.globalData.userBaseInfo = userBaseInfo
              return Promise.resolve(userBaseInfo)
            }
          }).catch(err => {
            if(err === "用户被封禁") {
              this.setData({
                loading: false,
                unrecoverable: true
              })
            }
          }).then((res) => {
              // 获得并设置用户个人账号信息
              return this.handleUserInfo()
          })
        }
      })
    })
  },
  handleUserInfo() {
    let that = this
    return new Promise((resolve, reject) => {
      resolve(checkProfile())
    }).then((uploaded) => {
      if(!uploaded) {
        console.log(app.globalData.userInfo)
        if(app.globalData.userInfo) {
          // 上传账户基本信息到服务器
          return setProfile(app.globalData.userInfo).then((res) => {
            that.data.hasUserInfo = true
            return Promise.resolve(res)
          }).catch(err => {
            return Promise.reject(err)
          })
        } else {
          // 获取账户基本信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    new Promise((resolve, reject) => {
                      // 可以将 res 发送给后台解码出 unionId
                      const userInfo = res.userInfo
                      resolve(userInfo)
                    }).then((res) => {
                      // 上传账户基本信息到服务器
                      return setProfile(res).then((res) => {
                        return Promise.resolve(res)
                      }).catch(err => {
                        console.log(err)
                      })
                    }).then(() => {
                      that.data.hasUserInfo = true
                      that.onLoad()
                    })
                  }
                })
              } else {
                wx.navigateTo({
                  url: '../get-user-info/get-user-info',
                  events: {
                    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                    acceptDataFromOpenedPage: function(data) {
                      console.log(data)
                      // 是否在跳转回来时刷新该页面
                      if(data === "refresh") {
                        this.setData({
                          refresh: true
                        })
                      }
                    },
                    someEvent: function(data) {
                      console.log(data)
                    }
                  },
                })
              }
            }
          })
        }

      } else {
        return new Promise((resolve, reject) => {
          return getProfile().then(res => {
            // 设置账户基本信息
            app.globalData.userInfo = res
            that.data.hasUserInfo = true
            resolve(res)
          })
        })
      }
    }).then(userInfo => {
      console.log(userInfo)
      
      // 检查账户基本信息是否设置到位
      if(!this.data.hasUserInfo) {
        return Promise.reject(this.data.hasUserInfo)
      }

      app.globalData.userInfo = userInfo
      this.setData({
        userInfo,
        hasUserInfo: true
      })

      return Promise.resolve(this.data.hasUserInfo)

    }).then((res) => {
      // 获取与用户关联的档案
      return getDocument(app.globalData.userBaseInfo.openid).then(res => {
        console.log(res)
        if(res === null) {
          wx.navigateTo({
            url: '../bind-document/bind-document'
          })
        } else {
          app.globalData.userDocument = res
          this.setData({
            userDocument: app.globalData.userDocument
          })
        }
      })
    }).then(res => {
      return getChildrenProfile()
    }).then(res => {
      this.setData({
        childrenInfo: res
      })
    }).then(res => {
      return getSupervisorsProfile()
    }).then(res => {
      this.setData({
        supervisorsInfo: res
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        loading: false,
        unrecoverable: true
      })
      console.log("账户基本信息未设置")
    }).finally(() => {
      this.setData({
        loading: false
      })
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    new Promise((resolve, reject) => {
      return this.handleLogin()
    });
    
  },
  onShow() {
    if(this.data.refresh)
    this.onLoad()
  },
  getLoginStatus(e) {
    if(e.userBanned === true) {
      this.setData({
        loading: false,
        unrecoverable: true
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindAccountDocInfo() {
    // 跳转
    wx.navigateTo({
      url: '/pages/account-doc-info/account-doc-info'  
    })
  },
  bindAccountRelationInfo() {
    // 跳转
    wx.navigateTo({
      url: '/pages/account-relation-info/account-relation-info'  
    })
  },
  bindMyGrade() {
    // 跳转
    wx.navigateTo({
      url: '/pages/my-grade/my-grade'  
    })
  },
  bindChildSupervisor() {
    // 跳转
    wx.navigateTo({
      url: '/pages/child-supervisor/child-supervisor'  
    })
  },
  bindAnnouncement() {
    // 跳转
    wx.navigateTo({
      url: '/pages/announcement/announcement'  
    })
  },
  bindMessage() {
    // 跳转
    wx.navigateTo({
      url: '/pages/message/message'  
    })
  },
  bindMyStudents() {
    // 跳转
    wx.navigateTo({
      url: '/pages/my-students/my-students'  
    })
  },
  bindStudentsGradeAnalyse() {
    // 跳转
    wx.navigateTo({
      url: '/pages/students-grade-analyse/students-grade-analyse'  
    })
  },
  bindMyHealth() {
    // 跳转
    wx.navigateTo({
      url: '/pages/my-health/my-health'  
    })
  },
  bindMyHonors() {
    // 跳转
    wx.navigateTo({
      url: '/pages/my-honors/my-honors'  
    })
  },
})
