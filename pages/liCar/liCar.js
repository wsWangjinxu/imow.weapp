//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    product:[]
  },
  //事件处理函数
  onLoad: function (options) {
      
  },
  ringUp() {
    wx.makePhoneCall({
      phoneNumber: '400-672-8288',
      success() {
       
      }
    });
  },

})
