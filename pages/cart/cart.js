import { getUserCart, getCartShopList, getShopCart, removeCart } from "../../api/user/cart.js"

Page({
  data: {
    list: "",
    shopList: "",
    selectedId: "",
    num: 0
  },
  onLoad(){
    this.init();
  },

  init() {
    getUserCart("GET").then(res => {
      console.log(res);//eslint-disable-line
      this.setData({
        list: res.data.data
      });
    });

    //获取购物车的店铺列表
    getCartShopList("POST").then(res => {
      console.log(res);
      this.setData({
        shopList: res.data.shopList,
        selectedId: res.data.shopList[0].id
      });
    });
  },

  //点击切换显示某个店铺的购物车
  handleTabChange(e) {
    let tempArray = this.data.list;
    tempArray.forEach((element, index) => {
      if(element.shopId === e.detail) {
        this.setData({
          num: index
        });
      }
    });
  },

  //获取选中的产品
  handleSelect(e){
    //选中产品以后设置cartId
    this.setData({
      cartId: e.detail.cartId
    });
  },

  //删除购物车中的产品
  handleDelete() {
    let _this = this;
    if(this.data.cartId) {
      removeCart("DELETE", {
        cartId: _this.data.cartId
      }).then(res => {
        if(res.data.status) {
          wx.showToast({
            title: "删除成功",
            icon: "success"
          });
        } else {
          wx.showToast({
            title: "删除失败",
            image: "/static/icon/warning-white.png"
          });
        }
      });
    } else {
      wx.showToast({
        title: "请选择商品",
        image: "/static/icon/warning-white.png"
      })
    }
  }
})
