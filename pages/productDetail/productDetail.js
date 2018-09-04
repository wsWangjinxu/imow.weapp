//index.js
//获取应用实例
import { getProductDetail, getFactoryDiscountCouponList, getDiscountCoupo} from "../../api/productDetail/productDetail";
import { getCartNum } from "../../api/productDetail/cartNum";
const app = getApp();

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    duration: 1000,
    productName: "EPT20 - 15ET2 1.5t全电动搬运车 中力小金刚二代",
    amPrice1:9900,      //阿母价格
    amPrice2:11000,
    DLPrice1:8900,      //代理价格
    DLPrice2: 10000,
    saleNumber:122,     //已售数量 
    num: 0,             //优惠券号  
    show: false,        //弹出层
    content:"",
    productPolicy:"XXXXXXXXXXXXXX啥老规矩XXXXXXXXXXXXXX啥老规矩",  //产品政策
    payType:"承兑汇票.网银汇款.店铺余额.支付宝.微信",    //支付方式
    couponList: [
      {
        "money": 300,
        "limit": 5000,
        "number": "0101576520700"
      },
      {
        "money": 200,
        "limit": 4000,
        "number": "0101576520701"
      },
      {
        "money": 100,
        "limit": 3000,
        "number": "0101576520713"
      }
    ],     //获取优惠券列表
    productImg:"",   //产品介绍3张图
    productImg2:"",
    productImg3: "",
    shopId:123,
    cartNum:0,
    productId:333
  },
  onLoad: function (e) {
    //console.log(e);
    //this.setData({ productId: e.productId });
    this.init();
  },
  onShow:function() {
    this.initCouponList();    //优惠券初始化
  },
  //分享
  onShareAppMessage: function () {
    console.log(this.data.title)
    return {
      title: this.data.title,
      path: '/pages/productDetail/productDetail'
    }
  },
  getCoupon(e){
    console.log(e.currentTarget.dataset.no);
    this.setData({ num: e.currentTarget.dataset.no });
    //领取优惠券
    // getDiscountCoupo("POST", {
    //   number: this.data.num
    // }).then(res => {
    //   console.log(res);
    // }); 

    // if (res.status){
    //     wx.showToast({
    //       title: '领取成功',
    //       icon: 'success'
    //     });
    //     this.init();
    //   }else{
    //     wx.showToast({
    //       title: '领取失败',
    //       icon: 'none'
    //     })
    //   }  
  },
  //弹框
  showPopup(e) {
    console.log(e.currentTarget.dataset.show)
    let showNo = e.currentTarget.dataset.show;
    if (showNo == 1) {
      let showContent = this.data.productPolicy;
      this.setData({ content: showContent });
    } else if (showNo == 2) {
      let showContent = this.data.payType;
      this.setData({ content: showContent });
    } 
    this.setData({
      show: !this.data.show
    });
  },
  onClose() {
    this.setData({ show: false });
  },  
  //获取优惠券列表
  initCouponList() {   
    getFactoryDiscountCouponList("POST", {
      id: this.data.shopId
    }).then(res => {
      console.log(res.data.factoryCoupon)
      this.setData({
        couponList: res.data.factoryCoupon
      });
    });
  },
  //页面初始化函数
  init() {
    //获取产品详情内容
    getProductDetail("GET",{
      //id: this.data.productId
      id:132
    }).then(res => {
      console.log(res.data)
      this.setData({
        productName: res.data.productName,
        imgUrls:res.data.images,
        amPrice1: res.data.minImowPrice,
        amPrice2: res.data.maxImowPrice,
        DLPrice1: res.data.minAgentPrice,
        DLPrice2: res.data.maxAgentPrice,
        productPolicy: res.data.policy
      });
    });

    getCartNum("GET").then(res => {
      //console.log(res.data.status);
      this.setData({
        cartNum: res.data.status
      });
    });

  }
  


})
