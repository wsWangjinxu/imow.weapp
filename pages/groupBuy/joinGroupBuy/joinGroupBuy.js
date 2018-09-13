import { getGroupBuyInfo, getJoinedDetailList } from "../../../api/groupBuy/index"

Page({
  data: {
    name: "",
    phone: "",
    remake: "",
    show: false,
    leaderPhone: "",
    id: "",
    type: [ 
      {
        type: "danger",
        text: "全部"
      },
      {
        type: "default",
        text: "待确认"
      },
      {
        type: "default",
        text: "已确认"
      },
      {
        type: "default",
        text: "已取消"
      }
    ]
  },

  onLoad(option) {
    //保存当前拼团记录的id
    console.log(option.id);
    this.setData({
      id: option.id
    });

    console.log(this.data.id);

    //获取参团的产品信息
    getGroupBuyInfo("POST", {id: option.id}).then(res => {
      let data = res.data;
      this.setData({
        profile: data.profile, //头像
        bgUrl: data.bgUrl,  //背景图片
        explain: data.explain,  //活动说明
        product: data.product, //产品的信息
        leaderPhone: data.leaderPhone //团长的电话，点击头像可以拨打
      });
    });

    //获取已经拼团的产品列表
    this.getList("全部"); 
  },

  //点击参与拼团下方的按钮分类获取参与拼团的信息
  handleSelect(e) {
    
    let id = e.currentTarget.dataset.id;

    switch(id) {
      case(0):  this.getList("全部");     this.modifyType(0);   break;
      case(1):  this.getList("待确认");   this.modifyType(1);   break;
      case(2):  this.getList("已确认");   this.modifyType(2);   break;
      case(3):  this.getList("已取消");   this.modifyType(3);   break;
    }
  },

  //修改按键type
  modifyType(id) {
    let btns = this.data.type;
    btns.forEach(ele => {
      if(ele.type == "danger") {
        ele.type = "default";
      }
    });

    btns[id].type = "danger";

    this.setData({
      type: btns
    });
  },

  //获取拼团列表
  getList(type) {
    getJoinedDetailList("POST", {type, id: this.data.id}).then(res => {
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
  },

  //去首页
  handleIndex() {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },

  //去购物车
  handleCart() {
    wx.switchTab({
      url: "/pages/cart/cart"
    });
  },

  //下订单
  placeOrder() {
    wx.navigateTo({
      url: "/pages/orderConfirm/orderConfirm?groupBuyId=" + this.data.id
    });
  }
});
