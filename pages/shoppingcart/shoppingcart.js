// pages/shoppingcart/shoppingcart.js
const app = getApp()
import Util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    selected: true,
    selectedAll: true,
    totalPrice: 0,
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function(){
    this.loadOrders();    
  },

  loadOrders() {
    var orders = wx.getStorageSync('orders')
    var addresses = wx.getStorageSync('addresses')
    var orderflag = app.globalData.orderflag
    var address = addresses[orderflag]
    this.setData({
      orders: orders,
      address:address
    })
    var totalPrice = 0;
    for (var i in orders) {
      var order = orders[i];
      totalPrice += order.price * order.count
      totalPrice = this.toFixed(totalPrice)
    }
    this.setData({ totalPrice: totalPrice })
  },
  checkboxChange(e) {
    var ids = e.detail.value;
    if (ids.length == 0) {
      this.setData({ selectedAll: false })
    } else {
      this.setData({ selectedAll: true })
    }
    var orders = wx.getStorageSync('orders')
    var totalPrice = 0;
    var len = orders.length
    for (var i = 0; i < len; i++){
      var order = orders[i];
      for(var j = 0; j< ids.length;j++){
        if(order.id == ids[j]){
          totalPrice += order.price * order.count
          totalPrice = this.toFixed(totalPrice)
        }
      }
    }
    this.setData({ totalPrice: totalPrice })    
  },
  checkAll(e){
    var selected = this.data.selected;
    var result = selected==true?false:true;
    this.setData({selected:result});
    if(result == false){
      this.setData({ totalPrice: 0 }); 
      this.setData({ selectedAll: false });
    } else {
      this.loadOrders();
      this.setData({ selectedAll: true });
    }
  },
  addGoods(e){
    Util.addGoods(e,false)
    this.loadOrders()
  },
  minusGoods(e){
    Util.minusGoods(e)
    this.loadOrders()
  },
  selectAddress(){
    wx.navigateTo({
      url: '../addressChoose/addressChoose',
    })
  },
  formSubmit: function (e) {
    var checkboxGoodsId = e.detail.value.checkboxGoods
    let checkboxGoods = JSON.stringify(checkboxGoodsId)
    let totalPrice = this.data.totalPrice
    wx.navigateTo({
      url: 'getOrder/getOrder?checkboxGoodsId=' + checkboxGoods + "&totalPrice="+totalPrice,
    })
  },
  toFixed(num){ 
    var fixNum = Number(num + 1).toFixed(1);//四舍五入之前加1  
    var fixedNum = Number(fixNum - 1).toFixed(1);//四舍五入之后减1，再四舍五入一下  
    var lastNum = Number(fixedNum);
    return lastNum;//弹出的数字就是正确的四舍五入结果啦  
  }
})