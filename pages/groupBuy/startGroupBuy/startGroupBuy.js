import {getGroupBuyInfo} from "../../../api/groupBuy/index.js";

Page({
  data: {
    name: "",
    phone: "",
    show: false
  },

  onLoad(){
    //获取团购的信息
    getGroupBuyInfo("POST").then(res => {
      console.log(res); //eslint-disable-line
      let data = res.data;
      this.setData({
        profile: data.profile, //头像
        bgUrl: data.bgUrl,  //背景图片
        explain: data.explain,  //活动说明
        product: data.product //产品的信息
      });
    });
  },

  //分享
  onShareAppMessage() {
    return {
      title: this.data.product.title,
      path: "/pages/groupBuy/startGroupBuy/startGroupBuy",
      imageUrl: "/static/images/groupBuy-share.jpg"
    }
  },

  //分享
  handleShare() {
    this.onShareAppMessage();
  },

  //触发说明的查看
  handleExplain(){
    this.setData({
      show: true
    });
  },

  //关闭活动说明
  onClose() {
    this.setData({
      show: false
    });
  }


});
