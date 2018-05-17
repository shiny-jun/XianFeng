// pages/me/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    orders: [],
    order: []
  },
  switchNav(e) {
    let current = e.currentTarget.dataset.current
    this.setData({
      currentTab: current
    })
    let orders = this.data.orders
    let order = this.changeOrders(current, orders)
    this.setData({
      order: order
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.current) {
      let current = options.current
      this.setData({
        currentTab: current
      })
    }
    let tableID = 36536
    let Product = new wx.BaaS.TableObject(tableID)
    var _this = this
    // 不设置查询条件
    Product.find().then(res => {
      let orders = res.data.objects
      _this.setData({
        orders: orders
      })
      let current = _this.data.currentTab
      let order = _this.changeOrders(current, orders)
      _this.setData({
        order: order
      })
    }, err => {
      // err
    })
  },
  changeOrders: function (current, orders) {
    if (current == 0) {
      var result = this.getGoodsMes(orders)
      return result;
    } else {
      let result = []
      for (var i in orders) {
        if (orders[i].status == current) {
          result.push(orders[i])
        }
      }   
      var result = this.getGoodsMes(result)
      return result;
    }
  },
  getGoodsMes(orders) {
    let goods = wx.getStorageSync('goods')
    for (var i in orders) {
      var ordersGoods = []
      for (var k in orders[i].order_goods) {
        for (var j in goods) {
          if (orders[i].order_goods[k] == goods[j]._id) {
            ordersGoods.push(goods[j])
          }
        }
      }
      orders[i].goods = ordersGoods
    }
    return orders
  }
})