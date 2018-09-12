//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    scrollHeight: 0
  },
  onLoad() {
    let _this = this;
    //获取手机屏幕的高度
    wx.getSystemInfo({
      success(res) {
        console.log(res);
        //获取窗口高度
        let windowHeight = res.windowHeight;
        let pixelRatio = res.pixelRatio;
        let scrollHeight = windowHeight - 100;
        _this.setData({
          scrollHeight
        });
        console.log(scrollHeight);
      }
    });
  }
}) 
