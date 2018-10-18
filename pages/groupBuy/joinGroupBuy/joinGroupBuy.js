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
    ],
    isShow: false,
    tmpNum: 0
  },

  onLoad(option) {
    //保存当前拼团记录的id
    this.setData({
      id: option.id
    });

    //获取参团的产品信息
    getGroupBuyInfo("GET", {id: option.id}).then(res => {
      let data = res.data;
      this.setData({
        leaderName: data.leaderName, //头像
        // bgUrl: data.bgUrl,  //背景图片
        // explain: data.explain,  //活动说明
        product: data.product, //产品的信息
        leaderPhone: data.leaderPhone, //团长的电话，点击头像可以拨打
        promotion: data.promotion  //促销信息
      });
    });

    //获取已经拼团的产品列表
    this.getList("全部"); 
  },

  //团购结束，屏蔽按钮
  handleOver() {
    this.setData({
      isOver: true
    });
  },

  //页面卸载时候清除定时器
  onUnload() {
    let timer = this.data.timer;
    clearInterval(timer);
  },

  //接收组件开启的定时器
  handleTimer(e) {
    this.setData({
      timer: e.detail.timer
    });
  },

  //点击参与拼团下方的按钮分类获取参与拼团的信息
  handleSelect(e) {
    
    let id = e.currentTarget.dataset.id;
    this.switchList(id);
    
  },

  switchList(num) {
    switch(num) {
      case(0):  this.getList("全部");     this.modifyType(0);   break;
      case(1):  this.getList("未确认");   this.modifyType(1);   break;
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
      type: btns,
      typeNum: id
    });
  },

  //获取拼团列表
  getList(type) {
    getJoinedDetailList("GET", {type, id: this.data.id}).then(res => {
      console.log(res);
      let isLeader = res.data.isLeader;
      let DetailList = res.data.joinedDetailList;
      //如果没有人参团，则屏蔽去下单
      if(this.data.tmpNum === 0) {
        this.setData({
          tmpNum: DetailList.length
        });
      }
      this.setData({
        isLeader,
        DetailList
      });
    });
  },

  //参团成功以后获取拼团列表
  handleGetList() {
    this.getList();
  },

  //分享
  onShareAppMessage() {
    return {
      title: this.data.product.title,
      path: "/pages/groupBuy/joinGroup/joinGroup",
      imageUrl: "https://imow-weixin-app.oss-cn-hangzhou.aliyuncs.com/groupBuy-share.jpg"
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
    if(this.data.tmpNum) {
      wx.navigateTo({
        url: "/pages/orderConfirm/orderConfirm?groupBuyId=" + this.data.id
      });
    } else {
      wx.showToast({
        title: "无参团记录",
        image: "/static/icons/warning-white.png"
      });
    }
    
  },

  //更新列表
  handleListUpdate() {
    this.switchList(this.data.typeNum);
  }
});
