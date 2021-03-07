
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
      // 执行所有的代发请求
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
      
    }

    options.url = app.globalData.baseURL + url
  
    if(data && method === 'post') {
      header_options['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    wx.request({
      header: {
        ...header_options
     },
      ...options,
      success: function(res) {
        const data = res.data
        if(data.status >= 200 && data.status < 300) {
          resolve(data.data)
        } else {
          reject(data.data)
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
      refresh_token(app)
    }

    if(refreshing) {
      pendings.push(options)
    } else {
      do_request(app, options).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
export default request