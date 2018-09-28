//index.js
//获取应用实例
import { getProductDetail, getFactoryDiscountCouponList, getDiscountCoupon, getShopInfo} from "../../api/productDetail/productDetail";
import { getCartNum } from "../../api/productDetail/cartNum";
const app = getApp();

Page({
  data: {
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    duration: 1000,      //--上边都是轮播需要属性
    productName: "EPT20 - 15ET2 1.5t全电动搬运车 中力小金刚二代",
    amPrice1:0,      //阿母价格
    amPrice2:0,
    DLPrice1:0,      //代理价格
    DLPrice2: 0,
    couponNum: 0,       //优惠券号  
    show: false,        //弹出层1
    show2: false,        //弹出层2
    productPolicy:"无",  //产品政策
    paymethod: "",    //支付方式,如承兑汇票.网银汇款.店铺余额.支付宝.微信
    couponList: [
      // {
      //   "value": 300,
      //   "useAmountLimit": 5000,
      //   "number": "0101576520700"
      // },
      // {
      //   "value": 200,
      //   "useAmountLimit": 4000,
      //   "number": "0101576520701"
      // },
      // {
      //   "value": 100,
      //   "useAmountLimit": 3000,
      //   "number": "0101576520713"
      // }
    ],     //获取优惠券列表
    productImg:"",   //产品介绍3张图
    productImg2:"",
    productImg3: "",
    shopId:"",
    shopLogo:"",
    shopName:"无",
    cartNum:0,
    productId:'',
    buyBtn: true,
    hiddenLoading: false, //加载中，false显示ture隐藏
    request1:false,
    request2: false,
  },
  onLoad: function (e) {
    this.setData({ productId: e.id });
    this.init();
    let isLogin = wx.getStorageSync("isLogin");
    if(!isLogin) {
      this.setData({
        buyBtn: false
      })
    }
  },
  onShow:function() {
    this.initCouponList();    //优惠券初始化
  },
  //分享
  onShareAppMessage: function () {
    // console.log(this.data.title)
    return {
      title: this.data.productName,
      path: '/pages/productDetail/productDetail'
    }
  },
  getCoupon(e){
    // console.log(e.currentTarget.dataset.no);
    this.setData({ couponNum: e.currentTarget.dataset.no });
    //领取优惠券
    getDiscountCoupon("get", {
      number: this.data.couponNum
    }).then(res => {
      console.log(res);
      if (res.data.status) {
        wx.showToast({
          title: '领取成功',
          icon: 'success'
        });
        this.initCouponList();
      } else {
        wx.showToast({
          title: '领取失败',
          icon: 'none'
        })
      }
    });    
  },
  //弹框
  showPopup() {
    this.setData({ show: true });
  },
  showPopup2() {
    this.setData({ show2: true });
  },
  onClose() {
    this.setData({ show: false, show2: false });
  },  
  //获取优惠券列表
  initCouponList() {   
    getFactoryDiscountCouponList("get", {
      id: this.data.productId
    }).then(res => {
      console.log(res.data.coupons)
      this.setData({
        couponList:res.data.coupons
      });
    });
  },
  //页面初始化函数
  init() {
    this.setData({ hiddenLoading: false});
    //获取产品详情内容
    console.log(this.data.productId);
    getProductDetail("GET",{
      id: this.data.productId,
    }).then(res => {
      if (res.statusCode==200){ 
        console.log(res.data)       
        this.setData({
          hiddenLoading: true,   //请求成功
          productName: res.data.productName,
          imgUrls: res.data.images,
          amPrice1: res.data.minImowPrice,
          amPrice2: res.data.maxImowPrice,
          DLPrice1: res.data.minAgentPrice,
          DLPrice2: res.data.maxAgentPrice,
          productPolicy: res.data.policy?res.data.policy:"无",
          paymethod: res.data.paymethod,
          productImg: res.data.introduceImage,
          productImg2: res.data.packingImage,
          productImg3: res.data.serviceImage,
          shopId: res.data.shopId   //此商品对应店铺id
        });
      }else{
        this.setData({hiddenLoading: true});
        wx.showToast({
          mask:true,
          title: '请求失败',
          image:"/static/imgs/warn.png"
        })
      }
      
    });

    getCartNum("GET").then(res => {
      if(res.data.status){
        this.setData({
          cartNum: res.data.status
        });
      }
    });

    getShopInfo("GET", {
      id: this.data.shopId,
    }).then(res => {
      if (res.statusCode=="200") {
        this.setData({
          shopLogo: res.data.logoSrc,
          shopName: res.data.name
        });
      }
    });
    // console.log(this.data.request1)
    // console.log(this.data.request2)
    // if (this.data.request1 && this.data.request2){
    //   this.setData({ hiddenLoading: true });
    // }else{
    //   wx.showToast({
    //     title:"网络错误",
    //     image: "/static/imgs/warn.png"
    //     mask:true
    //   })
    // }
  }
  


})
