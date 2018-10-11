import { getUserCart, getCartShopList, getShopCart, removeCart, removeUnActive } from "../../api/user/cart.js"

Page({
  data: {
    list: "",
    shopList: "",
    selectedId: "",
    num: 0
  },
  onLoad(){
    this.init(this.data.num);
  },

  init(num) {
    getUserCart("GET").then(res => {
      console.log(res);//eslint-disable-line
      this.setData({
        list: res.data.data,
        shopList: res.data.shopList,
        selectedId: res.data.shopList[num].id
      });
    });

    // //获取购物车的店铺列表
    // getCartShopList("POST").then(res => {
    //   console.log(res);
    //   this.setData({
    //     shopList: res.data.shopList,
    //     selectedId: res.data.shopList[num].id
    //   });
    // });
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

  //清除失效产品
  handleExpire() {
    let shopId = this.data.selectedId;
    console.log(shopId);
    removeUnActive("DELETE", { shopId }).then(res => {
      if(res.status === 204) {
        wx.showToast({
          title: "清除成功！",
          icon: "success"
        });

        //更新用户的购物车
        this.init(this.data.selectedId);
      } else {
        console.log(res);
        wx.showToast({
          title: "清除失败！",
          image: "/static/icon/warning-white.png"
        })
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
