import {
  getUserCart,
  getCartShopList,
  getShopCart,
  removeCart,
  removeUnActive
} from "../../api/user/cart.js"

Page({
  data: {
    list: "",
    shopList: "",
    selectedId: "",
    num: 0,
    swap: true  //用户店铺购物车的切换
  },
  onLoad() {
    this.init(this.data.num);
  },

  onShow() {
    this.init(this.data.num);
  },

  init(num) {
    getUserCart("GET").then(res => {
      console.log(res); //eslint-disable-line
      if (res.data.shopList.length !== 0) {
        this.setData({
          list: res.data.data,
          shopList: res.data.shopList,
          selectedId: res.data.shopList[num].id
        });
      }
    });
  },

  //点击切换显示某个店铺的购物车
  handleTabChange(e) {
    let tempArray = this.data.list;
    tempArray.forEach((element, index) => {
      if (element.shopId === e.detail) {
        this.setData({
          num: index
        });
      }
    });
  },

  //清除失效产品
  handleExpire() {
    let shopId = this.data.selectedId;
    let _this = this;
    console.log(shopId);
    removeUnActive("GET", {
      shopId
    }).then(res => {
      if (res.statusCode == 500) {
        console.log(res.statusCode);
        wx.showToast({
          title: "清除失败！",
          image: "/static/icons/warning-white.png"
        })
      } else {
        wx.showToast({
          title: "清除成功！",
          icon: "success"
        });
        //更新用户的购物车
        _this.init(_this.data.num);
      }
    });
  },

  //获取选中的产品
  handleSelect(e) {
    //选中产品以后设置cartId
    this.setData({
      cartId: e.detail.cartId
    });
  },

  //删除购物车中的产品
  handleDelete() {
    console.log("删除！");
    let _this = this;
    console.log(this.data.cartId);
    if (this.data.cartId) {
      removeCart("GET", {
        cartIds: _this.data.cartId
      }).then(res => {
        if (res.statusCode == 204) {
          wx.showToast({
            title: "删除成功",
            icon: "success"
          });
          _this.init(_this.data.num);
        } else {
          wx.showToast({
            title: "删除失败",
            image: "/static/icons/warning-white.png"
          });
        }
      });
    } else {
      wx.showToast({
        title: "请选择商品",
        image: "/static/icons/warning-white.png"
      })
    }
  }
})