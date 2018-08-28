//index.js
//获取应用实例
import { getProductDetail } from "../../api/productDetail/productDetail";

const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    title: "EPT20 - 15ET2 1.5t全电动搬运车 中力小金刚二代",
    amPrice1:9900,      //阿母价格
    amPrice2:11000,
    DLPrice1:8900,      //代理价格
    DLPrice2: 10000,
    saleNumber:122,     //已售数量
    show: false,        //弹出层
    content:"内容"
  },
  onLoad: function (options) {
    //console.log(options);
    this.init();
  },
  //事件处理函数
  onShareAppMessage: function () {
    console.log(this.data.title)
    return {
      title: this.data.title,
      path: '/pages/productDetail/productDetail'
    }
  },
  showA:function(){
    this.setData({ show: true });
  },
  //弹框
  onClose() {
    this.setData({ show: false });
  },  
  //下拉刷新
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  },
  //页面初始化
  init() {
    //获取首页轮播图的内容
    getProductDetail("POST").then(res => {
      console.log(res)
      // this.setData({
      //   "bannerList": res.data.bannerItemList
      // });
    });

    
  }

})
