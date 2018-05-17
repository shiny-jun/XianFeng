// pages/supermarket/supermarket.js
var app = getApp();
// import Rxb from 'rxbData.js'
import Util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Navs:[{
      name:'热销榜',
      type:'supermarket'
    }, {
      name: '天天特价',
      type: 'sale'
    },{
      name: '巧克力',
      type:'chocolate'
    }, {
      name: '汤圆',
      type: 'riceDumpling'
    }, {
      name: '优选水果',
      type: 'fruit'
    }, {
      name: '牛奶面包',
      type: 'milk'
    }, {
      name: '卤肉熟食',
      type: 'cooked'
    }, {
      name: '饮料酒水',
      type: 'drink'
    }, {
      name: '休闲零食',
      type: 'snake'
    }, {
      name: '方便速食',
      type: 'fastFood'
    }, {
      name: '生活用品',
      type: 'life'
    }, {
      name: '粮油调味',
      type: 'flavour'
    }, {
      name: '冰淇淋',
      type: 'icecream'
    }],
    currentTab:0,
    allGoods:[],
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var goods = wx.getStorageSync('goods')
    this.setData({ allGoods: goods });
    var typeGoods = Util.typeGoods('supermarket', goods)
    this.setData({ goods: typeGoods });
  },
  onShow: function(){
    var current = app.globalData.currentTab
    this.setData({
      currentTab: current
    }) 
    var goods = wx.getStorageSync('goods')
    var typeGoods = Util.typeGoods(this.data.Navs[current].type, goods)
    this.setData({ goods: typeGoods });
    // app.globalData.currentTab = 0
  },
  switchNav(e){
    var id = e.currentTarget.id;
    if(this.data.currentTab == id){
      return false;
    } else {
      this.setData({
        currentTab:id
      })
    }
    var type = this.data.Navs[id].type
    var goods = this.data.allGoods
    var typeGoods = Util.typeGoods(type, goods)
    this.setData({ goods: typeGoods });
  },
  addGoods(e){
    Util.addGoods(e)
  }
})