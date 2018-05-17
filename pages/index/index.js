// pages/index/index.js
var app = getApp()
import Util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,
    imgUrls: [{
      img:"https://cloud-minapp-14328.cloud.ifanrusercontent.com/1fImpITKvVlGcfpE.PNG", 
      id: 7
    }, {
      img:"https://cloud-minapp-14328.cloud.ifanrusercontent.com/1fImpIRwFCvIrHJx.PNG",
        id: 8
      }, {
        img:"https://cloud-minapp-14328.cloud.ifanrusercontent.com/1fImpIslQnXbzAiW.PNG",
    id:10}],
    navs:[{
      img:'../../images/icon/qiandao.png',
      name:'每日签到'
    }, {
      img: '../../images/icon/miaosha.png',
      name: '疯狂秒杀'
      }, {
        img: '../../images/icon/ziying.png',
        name: '鲜货直营'
    }, {
        img: '../../images/icon/zhengxiang.png',
      name: '整箱购'
    }],
    navs2: [{
      id:5,
      img: '../../images/icon/milk.jpg',
      name: '牛奶面包'
    }, {
      id: 7,
      img: '../../images/icon/wine.jpg',
      name: '饮料酒水'
    }, {
      id: 4,
      img: '../../images/icon/fruit.jpg',
      name: '优选水果'
    }, {
      id: 0,
      img: '../../images/icon/more.jpg',
      name: '更多'
    }],
    pic:[{
      img:'../../images/index/3-tttj.jpg',
      id:1
    }, {
      img: '../../images/index/3-bgslz.jpg',
      id: 8
    },{
      img: '../../images/index/3-yhbnt.jpg',
      id:6
    }, {
      img: '../../images/index/3-hgzx.jpg',
      id: 7
    }],
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goods = wx.getStorageSync('goods')
    var typeGoods = Util.typeGoods('supermarket', goods)
    this.setData({ goods: typeGoods });
  },
  addGoods(e){
    Util.addGoods(e)
  },
  selectNav2(e){
    var current = e.currentTarget.id
    app.globalData.currentTab = current
    wx.switchTab({
      url: '../supermarket/supermarket', 
    })
  },
  selectmore(){
    app.globalData.currentTab = 0    
    wx.switchTab({
      url: '../supermarket/supermarket',
    })
  }
})