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
    selectedId: 102,
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
  onLoad: function () {

  },

  handleTabChange(e) {
    this.setData({
      selectedId: e.detail
    })
  }
})
