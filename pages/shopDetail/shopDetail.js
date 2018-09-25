//shopDetail.js
import { getShopDetail } from "../../api/shopDetail/shopDetail";
import { getShopInfo } from "../../api/productDetail/productDetail";
const app = getApp();

Page({
  data: {
    show: false,
    shopId: "",
    name: "",
    imgSrc: "",
    phone: "",
    area: "",
    addr:"",
    businessLicense: "",//工商执照
    card: "",//名片
    wechat: "",//微信号
    time: "",//2018-05-18 20:15:30
    company: "",
    bank: "",
    account: "",
    companeyInfo: "",
    mainProduct: "",
    showContent:""
  },
  onLoad: function (e) {
    console.log(e)
    this.setData({ shopId: e.shopId });
    this.init();
  },
  //事件处理函数
  //弹框
  showPopup(e) {
    let showNo = e.currentTarget.dataset.show;
    if (showNo==1){
      let showContent = this.data.businessLicense;
      this.setData({ showContent: showContent });
    }else if(showNo==2){
      let showContent = this.data.card;
      this.setData({ showContent: showContent });
    }else{
      let showContent = this.data.wechat;
      this.setData({ showContent: showContent });
    };
    this.setData({
      show: !this.data.show
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  //页面初始化
  init() {
    console.log()
    getShopDetail("GET", {
      id: this.data.shopId
    }).then(res => {
      console.log(res)
      this.setData({
        name: res.data.baseInfo.name,
        phone: res.data.baseInfo.phone,
        area: res.data.baseInfo.area,
        addr: res.data.baseInfo.addr,
        businessLicense: res.data.baseInfo.businessLicense,
        card: res.data.baseInfo.card,
        wechat: res.data.baseInfo.wechat,
        time: res.data.baseInfo.time,
        company: res.data.remitInfo.company,
        bank: res.data.remitInfo.bank,
        account: res.data.remitInfo.account,
        companeyInfo: res.data.companeyInfo,
        mainProduct: res.data.mainProduct
      });
    });
    getShopInfo("GET", {
      id: this.data.shopId
    }).then(res => {
      console.log(res)
      this.setData({
        imgSrc: res.data.logoSrc
      });
    });
  }

})
