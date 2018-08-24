//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    show: false
  },
  //事件处理函数
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  onLoad: function (options) {
      
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
