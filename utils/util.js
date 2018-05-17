const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const toastType = true;

function loadGoods() {
  // var goods = wx.getStorageSync('goods');
  let tableID = 36271
  let Product = new wx.BaaS.TableObject(tableID)
  // 不设置查询条件
  Product.find().then(res => {
    var goods = res.data.objects
    console.log(goods)
    return goods;
  }, err => {
    wx.showToast({
      title: '网络出错',
      icon: 'none',
      duration: 1000
    })// err
    return false;
  })
}

function typeGoods(item, goods){
  let result = [];
  for (var i in goods) {
    let good = goods[i];
    let type = good.type;
    if (type.indexOf(item) > -1) {
      result.push(good);//把good插入result数组
    }
  }
  return result;
}

function addGoods(e, toastType) {
    var goods = wx.getStorageSync('goods');
    var id = e.currentTarget.id;    
    var good = {};
    for (var i in goods) {
      var oldGood = goods[i];
      if (oldGood.id == id) {
        good = oldGood;
        break;
      }
    }
    var orders = wx.getStorageSync('orders');
    var addOrders = [];
    var add = true;
    for (var i in orders) {
      var order = orders[i];
      if (order.id == good.id) {
        var count = order.count;
        order.count = count + 1;
        add = false;
      }
      addOrders[i] = order;
    }
    var len = orders.length;
    if (add) {
      good.count = 1;
      addOrders[len] = good;
    }
    wx.setStorageSync('orders', addOrders);
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      })
}

function minusGoods(e) {
  var goods = wx.getStorageSync('goods');
  var id = e.currentTarget.id;
  var good = {};
  for (var i in goods) {
    var oldGood = goods[i];
    if (oldGood.id == id) {
      good = oldGood;    
      break;
    }
  }
  var orders = wx.getStorageSync('orders');
  var addOrders = [];
  var add = true;
  var mark = -1;
  for(var i in orders){
    var order = orders[i];
    if (order.id == good.id) {
      
      var count = order.count;
      if(count >= 2){
        order.count = count - 1;
      } else {
        mark = i
      }
    }
    addOrders[i] = order;
  }
  if(mark>-1){
    addOrders.splice(mark, 1)
  }
  wx.setStorageSync('orders', addOrders);
}

module.exports = {
  formatTime: formatTime,
  loadGoods: loadGoods,
  addGoods: addGoods,
  minusGoods: minusGoods,
  typeGoods: typeGoods
}
