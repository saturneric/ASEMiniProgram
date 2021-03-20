import sha1 from './sha1'


// 正在队列上的请求
const pendings = []

let refreshing = false

// 刷新token
const refresh_token = app => {
  return new Promise((resolve, reject) => {
    do_request(app, {
      url: '/auth/token',
      method: 'get'
    }).then(res => {
      // 设置登录信息
      const userInfo = app.globalData.userInfo
      userInfo.token = res.token
      resolve(true)
    }).catch(err => {
      console.log(err)
      // 清空登录信息
      app.globalData.login = false
      app.globalData.userInfo = {}
      app.globalData.loginTime = null
      refreshing = false
      reject()
    }).then(() => {
      // 停止刷新状态
      refreshing = false;
      // 执行所有的缓存的请求
      pendings.forEach(element => {
        do_request(app, element)
      })
    })
  })
}

// 实际操作函数
const do_request = (app, options) => {
  return new Promise((resolve, reject) => {
    const { data, method, url } = options
  
    // 设置请求头
    let header_options = {
      'timestamp': Date.now(),
      'X-Requested-With': 'XMLHttpRequest'
    }
  
    // 检查登录状态
    if(app.globalData.login) {
      const userBaseInfo = app.globalData.userBaseInfo
      // 生成随机特征值
      let random_code = `RandomCode [${userBaseInfo.openid}][${header_options.timestamp}][${app.globalData.appID}]`
      random_code = sha1(random_code)
      // 生成客户端签名
      let signed = `SIGN [${userBaseInfo.postmark}][${random_code}][${userBaseInfo.token}]`
      signed = sha1(signed)
      // 填写头部验证部分
      header_options['signed'] = signed;
      header_options['postmark'] = userBaseInfo.postmark;
    }

    options.url = app.globalData.baseURL + url
  
    if(data && method === 'post') {
      header_options['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    // 调用微信接口进行网络请求
    wx.request({
      header: {
        ...header_options
     },
      ...options,
      success: function(res) {
        const data = res.data
        // 检查返回状态码
        if(data.status >= 200 && data.status < 300) {
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      },
      fail: function(res) {
        reject(res.data)
      }
    })
  })
}

// 对外接口
const request = options => {
  return new Promise((resolve, reject) => {
    const app = getApp()
    // 获得登录时间
    const loginTime = app.globalData.loginTime
    // 检查是否达到刷新周期
    if(loginTime != null && loginTime + 1000 * 60 < Date.now()) {
      app.globalData.loginTime = null
      refreshing = true
      // 执行token刷新
      refresh_token(app)
    }

    // 检查是否正在刷新
    if(refreshing) {
      // 缓存请求
      pendings.push(options)
    } else {
      // 进行请求
      do_request(app, options).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
export default request