//shopDetail.js
import { getShopDetail } from "../../api/shopDetail/shopDetail";

const app = getApp()

Page({
  data: {
    show: false,
    adImgSrc:"",
    name: "浙江中力机械设备安装有限公司",
    phone: 65525528,
    area: "浙江杭州",
    addr:"浙江省杭州市下城区永华街121号",
    businessLicense: "https://www.baidu.com/", //工商执照
    card: "www.imow.com/images/10010",
    addr: "浙江省杭州市下城区永华街121号",
    wechat: "/static/imgs/mine.jpg",
    time: "2018-05-18 20:15:30",
    company: "安吉阿母工业设备有限公司",
    bank: "工商银行安吉支行",
    account: "01015765207685518",
    companeyInfo: "",
    mainProduct: ""
  },
  onLoad: function (options) {
    console.log(options)
    this.init();
  },
  //事件处理函数
  //弹框
  showPopup() {
    this.setData({
      show: !this.data.show
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  //查看工商执照（跳转网页）
  lookLicence() {
    let web = this.data.businessLicense;
    wx.navigateTo({
      url: '/pages/businessLicense/businessLicense?a=' + web + ''
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  },
  //页面初始化
  init() {
    //获取tab的默认内容
    getShopDetail("POST", {
      id: 111
    }).then(res => {
      console.log(res)
      this.setData({
        // productList: res.data.productList
      });
    });
  }

})
