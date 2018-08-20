//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    showS: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['网银支付', '2'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    show: true
  },
  //事件处理函数
  // 点击下拉显示框
  selectTap() {
    this.setData({
      showS: !this.data.showS
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      showS: !this.data.showS
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  showAlert(){
    this.setData({ show: true });
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
