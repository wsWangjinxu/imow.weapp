//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  //事件处理函数
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  onLoad: function (options) {
      
  },
  lookorder: function() {
    wx.redirectTo({
      url: '/pages/orderDetail/orderDetail'
    })
  },
  batchSend: function () {
    wx.redirectTo({
      url: ''
    })
  }
})
