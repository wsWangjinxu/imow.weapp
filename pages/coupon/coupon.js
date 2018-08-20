//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [
      {
        id: 101,
        title: "阿母优惠券"
      },
      {
        id: 102,
        title: "店铺优惠券"
      }
    ],
    selectedId: 101,
    list2: [
      {
        id: 101,
        title: "未使用"
      },
      {
        id: 102,
        title: "已使用"
      },
      {
        id: 103,
        title: "已过期"
      }
    ],
    selectedId2: 101
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
  }
})
