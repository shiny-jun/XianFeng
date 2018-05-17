// pages/newAddress/newAddress.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['全部', '全部', '全部'],
    customItem: '全部',
    address:{},
    sex:true,
    change:null,
    switchChecked: false
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    var address = e.detail.value;
    var state = this.data.region[0];
    var city = this.data.region[1];
    var area = this.data.region[2];
    address.state = state;
    address.city = city;    
    address.area = area;
    address.openid = app.globalData.openid
    let tableID = 36210
    var addresses = wx.getStorageSync('addresses')
    var flag = app.globalData.flag
    var switchChecked = this.data.switchChecked
    if (!switchChecked && address.default){
      let recordID = addresses[flag]._id
      let Product = new wx.BaaS.TableObject(tableID)
      let product = Product.getWithoutData(recordID)
      product.set('default',false)
      product.update().then(res => {
      
      }, err => {

      })
    }
    var changeIndex = this.data.change
    if (changeIndex) {
      let recordID = addresses[changeIndex]._id
      let Product = new wx.BaaS.TableObject(tableID)
      let product = Product.getWithoutData(recordID)
      product.set(address)
      product.update().then(res => {
        app.loadAddress()//刷新本地addresses
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function(){
          var pages = getCurrentPages()
          var prevPage = pages[pages.length - 2]  //上一个页面
          prevPage.onLoad()//为了返回时界面的subjects刷新
          wx.navigateBack({
            delta: 1
          })
        },1000)
        
      }, err => {
        // err
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 1000
        })
      })
    } else {
      let Product = new wx.BaaS.TableObject(tableID)
      let product = Product.create()
      product.set(address).save().then(res => {
        app.loadAddress()//刷新本地addresses
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 2]  //上一个页面
        prevPage.onLoad()//为了返回时界面的subjects刷新
        wx.navigateBack({
          delta: 1
        })// success
      }, err => {
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 1000
        })// err
      })
    }
  },
  onLoad:function(e){
    console.log(e)    
    if (e.address){
      let address2 = JSON.parse(e.address);
      let sex = true
      if (address2.sex == '先生'){
        sex = true 
      } else {        
        sex = false         
      }
      if (address2.default === true){
        this.setData({
          switchChecked : true
        })
      }
      console.log(address2)      
      this.setData({
        region : [address2.state, address2.city, address2.area],
        address: address2,
        sex : sex,
        change: e.addressIndex
      })
    }
  }
})