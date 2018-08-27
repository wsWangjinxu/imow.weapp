//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' }
    ],

    array: ['网银支付', '微信支付'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    show: false,
    abc: true,//true显示商家false显示自提
    isFocus: false//控制input 聚焦
  },
  //事件处理函数
  // 点击下拉显示框
  selectTap() {
    this.setData({
      showS: !this.data.showS
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
// 支付框
  set_wallets_password(e) {//获取钱包密码
    this.setData({
      wallets_password: e.detail.value
    });
    if (this.data.wallets_password.length == 6) {//密码长度6位时，自动验证钱包支付结果
      wallet_pay(this)
    }
  },
  set_Focus() {//聚焦input
    console.log('isFocus', this.data.isFocus)
    this.setData({
      isFocus: true
    })
  },
  set_notFocus() {//失去焦点
    this.setData({
      isFocus: false
    })
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

// 钱包支付
function wallet_pay(_this) {
  console.log('钱包支付请求函数')
  /*
  1.支付成功
  2.支付失败：提示；清空密码；自动聚焦isFocus:true，拉起键盘再次输入
  */
}
