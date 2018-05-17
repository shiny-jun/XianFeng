//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // 引入 SDK
    require('utils/sdk-v1.4.0.js')

    // 初始化 SDK
    let clientID = '2851f89028cd7615550d'
    wx.BaaS.init(clientID)
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.loadGoods()
    this.loadAddress()
    this.loadCoupon()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
    wx.BaaS.login(false).then(res => {
      // 登录成功
      this.globalData.openid = res.openid          
    }, res => {
      // 登录失败
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  globalData: {
    userInfo: null,
    currentTab:0,
    openid:0,
    orderflag:0
  },
  loadGoods(){
    let tableID = 36271
    let Product = new wx.BaaS.TableObject(tableID)
    var _this = this
    // 不设置查询条件,limit(100)，查找100个数据
    Product.limit(100).find().then(res => {
      var goods = res.data.objects
      wx.setStorageSync('goods', goods)      
      // _this.globalData.goods = goods 
      // return goods;
    }, err => {
      wx.showToast({
        title: '网络出错',
        icon: 'none',
        duration: 1000
      })// err
      return false;
    })
  },
  loadAddress(){
    let tableID = 36210
    let Product = new wx.BaaS.TableObject(tableID)
    var _this = this
    // 不设置查询条件
    Product.find().then(res => {
      let addresses = res.data.objects
      let trueAddress = [];
      var openid = _this.globalData.openid
      console.log(openid)
      for (var i in addresses) {
        if (addresses[i].openid == openid) {
          trueAddress.push(addresses[i])
        }
      }
      wx.setStorageSync('addresses', trueAddress) 
      for (var j in trueAddress) {
        if (trueAddress[j].default === true) {
          var flag = j
        }
      }
      _this.globalData.flag = flag
      _this.globalData.orderflag = flag
    }, err => {
      // err
      wx.showToast({
        title: '网络出错',
        icon: 'none',
        duration: 1000
      })// err
      return false;
    })
  },
  loadCoupon() {
    let tableID = 36206
    let Product = new wx.BaaS.TableObject(tableID)
    var _this = this
    // 不设置查询条件
    Product.find().then(res => {
      let coupons = res.data.objects
      let trueCoupons = [];
      var openid = _this.globalData.openid
      console.log(openid)
      for (var i in coupons) {
        if (coupons[i].openid == openid) {
          trueCoupons.push(coupons[i])
        }
      }
      wx.setStorageSync('coupons', trueCoupons)
    }, err => {
      // err
      wx.showToast({
        title: '网络出错',
        icon: 'none',
        duration: 1000
      })// err
      return false;
    })
  }
})