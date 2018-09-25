import {getGroupBuyInfo, groupBuyApply} from "../../../api/groupBuy/index.js";

Page({
  data: {
    name: "",
    phone: "",
    show: false
  },

  onLoad(option){
    //收集请求数据
    let data = {
      id: option.id,
      productId: option.productId,
      promotionId: options.promotionId,
    }

    //保存数据
    this.setData(data);

    //获取团购的信息
    getGroupBuyInfo("GET", data).then(res => {
      let data = res.data;
      this.setData({
        leaderName: data.leaderName, //头像
        // bgUrl: data.bgUrl,  //背景图片
        // explain: data.explain,  //活动说明
        product: data.product, //产品的信息
        promotion: data.promotion  //促销信息
      });
    });
  },

  //开团表单提交
  start() {
    let temp = true;

    //验证手机号码是否正确
    if(!this.data.phone.match(/^1[3-9][0-9]{9}/)) {
      wx.showToast({
        title: "手机号码不正确",
        image: "/static/icon/warning-white.png"
      });
      temp = false;
    }

    //验证手机号码不能为空
    if(!this.data.phone) {
      wx.showToast({
        title: "电话不能为空",
        image: "/static/icon/warning-white.png"
      });
      temp = false;
    }

    //验证姓名不能为空
    if(!this.data.name) {
      wx.showToast({
        title: "姓名不能为空",
        image: "/static/icon/warning-white.png"
      });
      temp = false;
    }

    //发送开团申请
    if(temp) {
      groupBuyApply("POST", {
        name: this.data.name,
        phone: this.data.phone,
        productId: this.data.productId,
        promotionId: this.data.promotionId
      }).then( res => {
        if(res.data.status) {
          wx.showToast({
            title: "申请成功！",
            icon: "success"
          });
          this.setData({
            name: "",
            phone: ""
          });
          setTimeout(function(){
            wx.switchTab({
              url: "/pages/index/index"
            });
          }, 1500);
          
        }
      })
    }
  },

  //更新姓名
  handleName(e) {
    this.setData({
      name: e.detail.value
    });

  },

  //更新电话
  handlePhone(e) {
    this.setData({
      phone: e.detail.value
    });
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
