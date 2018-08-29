import { getUserCart } from "../../api/user/cart.js"

Page({
  data: {
    list: ""
  },
  onLoad(){
    this.init();
  },

  init() {
    getUserCart("GET").then(res => {
      this.setData({
        list: res.data.data
      });
    });
  }
})
