//businessLicence.js
//获取应用实例
const app = getApp()

Page({
  data: {
    web:""
  }, 
  onLoad: function (e) {
    console.log(e.a);
    this.setData({
      web: e.a
    });
  }
})
