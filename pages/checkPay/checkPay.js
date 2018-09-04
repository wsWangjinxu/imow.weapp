//checkPay.js
//获取应用实例
import { getPayDetail,chechPwd,submitPayment } from "../../api/checkPay/checkPay";

const app = getApp()

Page({
  data: {
    orderId:undefined,             //订单id
    paymentMethod: [              //下拉列表的数据
      // {
      //   "name": "线下支付"
      // },
      // {
      //   "name": "微信"
      // },
      // {
      //   "name": "支付宝"
      // }
    ],
    index: 0,//选择的下拉列表下标
    show: false,   //提交订单弹框
    abc: true,//true显示商家false显示自提
    isFocus: false,//控制input 聚焦
    submitSure:false,    //弹框提交
    orderId:undefined,
    shipAmount: 15.26,  //运费
    orderCode: "",   //订单号
    sellerName: "中力机械",  //卖家名称
    buyerName: "阿母工业123",   //买家名称
    productNames: [],        //商品名称
    buyTime: "",   
    crePoint: 3000,    //可用信用分
    balance: 1000, //可用余额 
    orderCode: '',   //订单号
    orderProductPrice: 0, //产品总价
    orderTotalPrice: 0 , //订单总额
    payable: 0, //应付金额
    depositPrice: 500, //定金金额
    imb: 1000,     //使用阿母币
    checkedArray: [], //已经选择的选项
    surePay: 0, //网银剩余应付 
    credit: false,  //是否是用信用分
    useBalance: false,  //是否使用余额
    payMethod:"",     //支付方式
    wallets_password:'', //密码
    pwdRight:false,//密码输入是否正确
    couponTotleDiscount: 300   //优惠券使用金额
  },
  onLoad: function (e) {
    console.log(e.orderId);
    this.setData({ orderId: e.orderId });
    this.init();
    console.log(this.data.payMethod)
  },
  //事件处理函数
  // 点击触发下拉框事件
  bindPickerChange: function (e) {
    console.log('picker下标', e.detail.value)  
    let payType = this.data.paymentMethod[e.detail.value].name
    console.log(payType);
    this.setData({payMethod: payType})
  },  
  //勾选事件
  checkboxChange(e) {
    console.log(e.detail.value);
    if (e) {
      this.setData({
        checkedArray: e.detail.value
      });
    }
    let credit = false;
    let useBalance = false;
    let payPrice = this.data.payable;
    // let showBtn;
    //判断是否勾选信用分
    if (~this.data.checkedArray.indexOf("信用分")) {
      credit = true;
      payPrice -= this.data.crePoint;
    } else {
      credit = false;
    }

    // 判断是否勾选店铺余额
    if (~this.data.checkedArray.indexOf("店铺余额")) {
      useBalance = true;
      payPrice -= this.data.balance;
    } else {
      useBalance = false;
    }

    //设置显示状态
    this.setData({
      credit,
      useBalance,
      surePay: payPrice
    });

  
  },
  //提交订单弹框
  showAlert(){
    this.setData({ show: true });
    console.log(this.data.checkedArray.length)
    if(this.data.checkedArray.length==0){
      this.setData({ submitSure: true });
    }else{
      this.setData({ submitSure: false });
    } 
  },
  onClose() {
    this.setData({ show: false });
    this.setData({ pwdRight: false });
    this.setData({ wallets_password: '' });
  },
  //支付框事件
  set_wallets_password(e) {//获取钱包密码
    this.setData({
      wallets_password: e.detail.value
    });
    if (this.data.wallets_password.length == 6) {//密码长度6位时，自动验证钱包支付结果
      this.wallet_pay()
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
  //密码验证
  wallet_pay() {
    console.log('钱包支付请求函数');
    console.log(this.data.wallets_password)
    chechPwd("get", {
      password: this.data.wallets_password
    }).then(res => {   
      if(false){ //res.data.validated
        console.log('密码正确');
        this.setData({ pwdRight: true });  //密码正确
        this.setData({ submitSure: true });
      }else{
        wx.showToast({
          title: '密码错误，请重试',
          duration: 2000
        })
        this.setData({ wallets_password: '' });
      } 
    })
  },
  //支付成功
  paySuccess(){
    submitPayment("POST", {
      id: this.data.orderId,
      isUseCrepoint:this.data.credit,
      isUseBalance:this.data.useBalance,
      payMethod: this.data.payMethod
    }).then(res => {
      console.log(res);
      if(res.data.success){
        wx.redirectTo({
          url: '/pages/finishPay/finishPay'
        })
      }
    });
  },

  //页面初始化
  init() {
    getPayDetail("GET", {
      orderId: this.data.orderId
    }).then(res => {
      console.log(res.data.data);
      let orderTotalPrice1=res.data.data.orderProductPrice-res.data.data.imb-res.data.data.couponTotleDiscount+res.data.data.shipAmount;
      this.setData({
        shipAmount:res.data.data.shipAmount,     
        sellerName: res.data.data.sellerName,
        buyerName: res.data.data.buyerName,
        productNames: res.data.data.productNames,
        buyTime: res.data.data.buyTime,
        crePoint: res.data.data.crePoint,
        balance: res.data.data.balance,
        imb: res.data.data.imb,
        orderProductPrice: res.data.data.orderProductPrice,//产品总价
        payable: res.data.data.payable,
        depositPrice: res.data.data.depositPrice,
        couponTotleDiscount: res.data.data.couponTotleDiscount,
        surePay: res.data.data.payable,     //其他支付应付
        orderTotalPrice: orderTotalPrice1,
        //orderCode: res.data.data.orderCode,   //订单号
        paymentMethod: res.data.data.paymentMethod,
        payMethod: res.data.data.paymentMethod[0].name
      });
      
    });
  }

})


