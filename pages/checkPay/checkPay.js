//checkPay.js
//获取应用实例
import { getShopDetail } from "../../api/checkPay/checkPay";

const app = getApp()

Page({
  data: {
    orderId:undefined,             //订单id
    paymentMethod: [              //下拉列表的数据
      {
        "name": "支付宝"
      },
      {
        "name": "微信"
      }
    ],
    index: 0,//选择的下拉列表下标
    show: false,   //提交订单弹框
    abc: true,//true显示商家false显示自提
    isFocus: false,//控制input 聚焦
    submitSure:true,
    orderId:undefined,
    shipAmount: 15.26,
    orderCode: "",   //订单号
    sellerName: "中力机械",  //卖家名称
    buyerName: "阿母工业123",   //买家名称
    productNames: [
      "1.5吨经济型电动搬运车（小金刚二 代） EPT20-15ET2",
      "1.5吨经济型电动搬运车（小金刚二 代） EPT20-15ET2",
      "1.5吨经济型电动搬运车（小金刚二 代） EPT20-15ET2"
    ],                        //商品名称
    buyTime: "2018年6月18日 15:06:48",   
    crePoint: 3000,    //可用信用分
    balance: 1000, //可用余额 
    orderProductPrice: 57200, //产品总价
    payable: "", //应付金额
    depositPrice: "", //定金金额
    imb: 1000,     //使用阿母币
    couponTotleDiscount: 300   //优惠券使用金额
  },
  onLoad: function (e) {
    console.log(e.orderId);
    this.setData({ orderId: e.orderId });
  },
  //事件处理函数
  // 点击触发下拉框事件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },  

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  //提交订单弹框
  showAlert(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  //支付框事件
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
  //支付成功
  paySuccess(){
    wx.redirectTo({
      url: '/pages/finishPay/finishPay'
    })
  },
  //页面初始化
  init() {
    getShopDetail("POST", {
      id: this.data.orderId
    }).then(res => {
      console.log(res);
      this.setData({
        shipAmount: res.data.shipAmount,
        orderCode: res.data.name,
        sellerName: res.data.phone,
        buyerName: res.data.buyerName,
        productNames: res.data.productNames,
        buyTime: res.data.buyTime,
        crePoint: res.data.crePoint,
        balance: res.data.balance,
        imb: res.data.imb,
        orderProductPrice: res.data.orderProductPrice,
        payable: res.data.payable,
        depositPrice: res.data.depositPrice,
        couponTotleDiscount: res.data.couponTotleDiscount,
        paymentMethod: res.data.paymentMethod
      });
    });
  }

})

// 钱包支付
function wallet_pay(_this) {
  console.log('钱包支付请求函数');
  /*
  1.支付成功
  2.支付失败：提示；清空密码；自动聚焦isFocus:true，拉起键盘再次输入
  */
}
