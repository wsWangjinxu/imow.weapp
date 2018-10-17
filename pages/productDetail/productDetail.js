//index.js
//获取应用实例
import { getProductDetail, getFactoryDiscountCouponList, getDiscountCoupon, getShopInfo} from "../../api/productDetail/productDetail";
import { getCartNum } from "../../api/productDetail/cartNum";
const app = getApp();

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    duration: 1000,      //--上边都是轮播需要属性
    productName: "",
    amPrice1:0,      //阿母价格
    amPrice2:0,
    DLPrice1:0,      //代理价格
    DLPrice2: 0,
    couponNum: 0,       //优惠券号  
    show: false,        //弹出层1（政策）
    show2: false,        //弹出层2（支付方式）
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
    productImg2:[],
    productImg3: [],
    shopId:"",
    shopLogo:"",
    shopName:"无",
    cartNum:0,
    productId:'',
    imbDisacount:"0",//可抵扣阿母币
    buyBtn: true, //检测当前用户是否会员？？
    hiddenLoading: false, //加载中，false显示ture隐藏
    request1:false,
    request2: false,
    promotionName:"活动名称",//活动名称
    promotionId:"",//活动id
    promotionType: "",
    canCollage:false//能否拼团
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
      productId: this.data.productId
    }).then(res => {
      if(res.data.coupons){
        this.setData({
          couponList: res.data.coupons
        });
      }
    });
  },
  //获取商店信息
  getShop(){
    getShopInfo("GET", {
      id: this.data.shopId,
    }).then(res => {
      if (res.statusCode == "200") {
        this.setData({
          shopLogo: res.data.logoSrc,
          shopName: res.data.name
        });
      }
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
        console.log(res)  
        this.setData({
          hiddenLoading: true,   //请求成功
          productName: res.data.productName,
          imgUrls: res.data.images,
          amPrice1: res.data.minImowPrice,
          amPrice2: res.data.maxImowPrice,
          DLPrice1: res.data.minAgentPrice,
          DLPrice2: res.data.maxAgentPrice,
          imbDisacount: res.data.imbDisacount,
          productPolicy: res.data.policy?res.data.policy:"无",
          paymethod: res.data.paymethod ? res.data.paymethod:"无",
          productImg: res.data.introduceImage,
          productImg2: res.data.packingImage ? res.data.packingImage.split(','):"",
          productImg3: res.data.serviceImage ? res.data.serviceImage.split(','):"",
          shopId: res.data.shopId,   //此商品对应店铺id
          canCollage: res.data.canCollage
        });
        this.getShop();
        for (let index = 0; index < res.data.productSkus.length; index++) {
          const item = res.data.productSkus[index];
          if (item.promotionModel) {
            this.setData({ 
              promotionName: item.promotionModel.promotionName,
              promotionId: item.promotionModel.id,
              promotionType: item.promotionModel.type
            });
            return false;
          }
        }
      }else{
        this.setData({hiddenLoading: false});
        wx.showToast({
          mask:true,
          title: '请求失败',
          image:"/static/icons/warning-white.png"
        })
      }
      
    });

    getCartNum("GET").then(res => {
      if (res.statusCode==200){
        this.setData({
          cartNum: res.data.status
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
    //     image: "/static/icons/warning-white.png"
    //     mask:true
    //   })
    // }
  }
  


})
