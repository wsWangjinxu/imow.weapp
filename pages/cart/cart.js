import { getUserCart, getCartShopList, getShopCart } from "../../api/user/cart.js"

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
  }
})
