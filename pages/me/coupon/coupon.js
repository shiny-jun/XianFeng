// pages/me/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    coupons:[],
    coupon:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let coupons = wx.getStorageSync('coupons')
    this.setData({
      coupons: coupons
    })
    let current = this.data.currentTab
    let coupon = this.changeCoupons(current)
    this.setData({
      coupon: coupon
    })
  },
  switchNav(e){
    let current = e.currentTarget.dataset.current
    this.setData({
      currentTab: current
    })
    let coupon = this.changeCoupons(current)
    this.setData({
      coupon: coupon
    })
  },
  changeCoupons(current){
    let coupons = this.data.coupons
    let result = []
    for (var i in coupons){
      if(coupons[i].type==current){
        result.push(coupons[i])
      }
    }
    return result;
  }
})