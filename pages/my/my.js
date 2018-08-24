//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    steps: [
      {
        text: '提交订单',
        desc: '成功提交订单 2018-03-15 20:40:41'
      },
      {
        text: '订单付款',
        desc: '已付款53000.00元（订单总金额10000.00元）'
      },
      {
        text: '已发货',
        desc: '已发10件/共20件'
      },
      {
        text: '完成',
        desc: ''
      }
    ],
    active: 1,
    array: ['全部明细','支付明细'],
    index: 0,
    showLogin: true,
    nickName: "",
    avatarUrl: "",
    isLogin: false
  },
  onLoad() {
    //获取用户的微信头像和昵称
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        });
      }
    });
  },
  onShow() {
    // if(wx.getStorageSync('isLogin')){
    //   this.setData({
    //     isLogin: true
    //   })
    // }  else {
    //   this.setData({
    //     isLogin: false
    //   })
    // }
  },
  login() {
    // wx.setStorageSync("isLogin", "true");
    this.setData({
      isLogin: true
    })
  }
})
