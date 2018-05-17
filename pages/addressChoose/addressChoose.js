// pages/addressChoose/addressChoose.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    addresses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var trueAddress = wx.getStorageSync('addresses')
    var flag = app.globalData.orderflag
    this.setData({
      addresses: trueAddress,
      flag: flag
    })
  },
  switchNav: function (e) {
    var id = e.currentTarget.id;
    app.globalData.orderflag = id
    this.setData({ flag: id });
    setTimeout(function(){
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]  //上一个页面
      wx.navigateBack({
        delta: 1
      })
    },500)
    
  },
  newAddress: function () {
    wx.navigateTo({
      url: '../newAddress/newAddress'
    })
  },
  changeAddress(e) {
    var id = e.currentTarget.id;
    var addresses = this.data.addresses;
    console.log(addresses)
    var result = {}
    for (var i in addresses) {
      if (id == i) {
        var result = addresses[i];
        break;
      }
    }
    let address = JSON.stringify(result);
    //传多个参数时中间加个&
    wx.navigateTo({
      url: '../newAddress/newAddress?address=' + address + '&addressIndex=' + id,
    })
  }
})