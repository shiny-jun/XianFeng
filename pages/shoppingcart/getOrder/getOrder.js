// pages/shoppingcart/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    transportPrice: 0,
    couponPrice: 0,
    address: {},
    getOrder: [],
    couponName: '无',
    checkboxGoodsId: [],
    finishPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let checkboxGoodsId = JSON.parse(options.checkboxGoodsId);
    this.setData({
      checkboxGoodsId: checkboxGoodsId
    })
    console.log(checkboxGoodsId)
    let orders = wx.getStorageSync('orders')
    let getOrder = []
    for (var i in orders) {
      for (var j in checkboxGoodsId) {
        if (orders[i]._id === checkboxGoodsId[j]) {
          getOrder.push(orders[i])
        }
      }
    }
    let totalPrice = Number(options.totalPrice)
    var transportPrice = 0
    if (totalPrice < 30) {
      transportPrice = 7
      this.setData({
        transportPrice: transportPrice
      })
    }
    console.log(transportPrice)
    let couponPrice = 0
    let finishPrice = totalPrice + transportPrice - couponPrice;
    console.log(finishPrice)
    this.setData({
      getOrder: getOrder,
      totalPrice: totalPrice,
      finishPrice: finishPrice
    })
  },
  onShow: function () {
    var addresses = wx.getStorageSync('addresses')
    var orderflag = app.globalData.orderflag
    var address = addresses[orderflag]
    this.setData({
      address: address
    })
  },

  selectAddress() {
    wx.navigateTo({
      url: '../../addressChoose/addressChoose',
    })
  },
  getCoupons() {
    wx.navigateTo({
      url: '../../me/coupon/coupon',
    })
  },
  sumbitOrder() {
    let tableID = 36536
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()
    let address_book_id = this.data.address._id//获取地址id
    let checkboxGoodsId = this.data.checkboxGoodsId//获取商品地址id的数组
    let finishPrice = this.data.finishPrice
    let openid = app.globalData.openid
    // 设置方式一
    let order = {
      address_book_id: address_book_id,
      status: 1,
      payment_method: '微信支付',
      user_id: openid,
      total_cost: finishPrice,
      order_goods: checkboxGoodsId
    }
    let _this = this
    product.set(order).save().then(res => {
      // success
      console.log('hello')
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1000
      })
      // 修改购物车内容orders
      let orders = wx.getStorageSync('orders')
      let checkboxGoodsId = _this.data.checkboxGoodsId
      let newOrder = []
      for (var i in orders) {
        var index = 0
        for (var j in checkboxGoodsId) {
          if (orders[i]._id === checkboxGoodsId[j]) {
            index = 1
          }
        }
        if (index === 0){
          newOrder.push(orders[i])
        }
      }
      wx.setStorageSync('orders', newOrder)
      setTimeout(function () {
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 2]  //上一个页面
        // prevPage.onLoad()//为了返回时界面的subjects刷新
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }, err => {
      // err
      wx.showToast({
        title: '提交失败',
        icon: 'none',
        duration: 1000
      })
    })

  }
})