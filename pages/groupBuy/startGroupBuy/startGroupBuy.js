import {getGroupBuyInfo, groupBuyApply} from "../../../api/groupBuy/index.js";

Page({
  data: {
    name: "",
    phone: "",
    show: false,
    isOver: false
  },

  onLoad(option){
    //收集请求数据
    let data = {
      productId: option.productId,
      promotionId: option.promotionId
    }

    //用于测试
    // let data = {
    //   productId: 467685117182430,
    //   promotionId: 547927562762747,
    // }
    
    //保存数据
    this.setData(data);

    //获取团购的信息
    getGroupBuyInfo("GET", data).then(res => {
      //已经获取到要开团的拼团商品信息
      let data = res.data;
      this.setData({
        product: data.product, //产品的信息
        promotion: data.promotion  //促销信息
      });
    });

    //获取用户的微信名字
    let that = this;
    wx.getUserInfo({
      success: function(res) {
        let tempData = res.rawData;
        //数据转换
        tempData = JSON.parse(tempData);
        that.setData({
          nickname: tempData.nickName,
          avatarUrl: tempData.avatarUrl
        })
      },
      fail: function(err) {
        wx.showToast({
          title: "获取信息出错",
          image: "/static/icons/warning-white.png"
        })
      }
    })

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


  //开团表单提交
  start() {
    let temp = true;

    //验证手机号码是否正确
    if(!this.data.phone.match(/^1[3-9][0-9]{9}/)) {
      wx.showToast({
        title: "手机号码不正确",
        image: "/static/icons/warning-white.png"
      });
      temp = false;
    }

    //验证手机号码不能为空
    if(!this.data.phone) {
      wx.showToast({
        title: "电话不能为空",
        image: "/static/icons/warning-white.png"
      });
      temp = false;
    }

    //验证姓名不能为空
    if(!this.data.name) {
      wx.showToast({
        title: "姓名不能为空",
        image: "/static/icons/warning-white.png"
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

  //团购结束，屏蔽按钮
  handleOver() {
    this.setData({
      isOver: true
    });
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
