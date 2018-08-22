//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date: '2016-09-01'
  },
  //事件处理函数
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function (options) {
      
  }
})
