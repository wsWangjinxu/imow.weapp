import { getGroupBuyInfo, getJoinedDetailList } from "../../../api/groupBuy/index"

Page({
  data: {
    name: "",
    phone: "",
    remake: "",
    show: false,
    leaderPhone: ""
  },

  onLoad() {
    //获取参团的产品信息
    getGroupBuyInfo("POST").then(res => {
      let data = res.data;
      this.setData({
        profile: data.profile, //头像
        bgUrl: data.bgUrl,  //背景图片
        explain: data.explain,  //活动说明
        product: data.product, //产品的信息
        leaderPhone: data.leaderPhone
      });
    });

    //获取已经拼团的产品列表
    getJoinedDetailList("POST").then(res => {
      console.log(res);
      let isLeader = res.data.isLeader;
      let DetailList = res.data.joinedDetailList;
      this.setData({
        isLeader,
        DetailList
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

  //点击团长头像，打电话
  handleRingUp() {
    wx.makePhoneCall({
      phoneNumber: String(this.data.leaderPhone),
      success() {
        console.log("电话拨打成功！");
      }
    });
  },

  //查看活动说明
  handleExplain() {
    this.setData({show: true});
  },

  //关闭活动说明
  onClose() {
    this.setData({
      show: false
    });
  }

})
