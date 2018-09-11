//index.js
//获取应用实例
import { getProductDetail, addCart, getProductSkus } from "../../api/productDetail/productDetail";

const app = getApp()

Page({
  data: {
    CA: "selected", //全款定金类名
    CB: "button",
    paytype:false //默认加入购物车 true定金立即购买
  },
  onLoad: function(e) { 
    console.log(e);
    this.setData({ productId: e.productId});
   
  },
  onChange(e) {
    conole.log()
    this.setData({
      num: e.detail
    });
  },
  //全款按钮事件
  payType1(e) {
    let CA = this.data.CA;
    let CB = this.data.CB;
    console.log(e.target.dataset.paytype);
    this.setData({ paytype: e.target.dataset.paytype });
    // console.log(this.data.paytype);
    if (CA === "selected") {
      CA = "button";
      this.setData({ paytype: 0 });
    } else {
      CA = "selected"
      CB = "button"
    }
    this.setData({
      CA: CA,
      CB: CB
    })
  },
  //定金按钮事件
  payType2(e) {
    let CA = this.data.CA;
    let CB = this.data.CB;
    console.log(e.target.dataset.paytype);
    // this.setData({ paytype: e.target.dataset.paytype });
    // console.log(this.data.paytype);
    if (CB === "selected") {
      CB = "button";
      this.setData({ paytype: 0 });
    } else {
      CB = "selected"
      CA = "button"
    }
    this.setData({
      CA: CA,
      CB: CB
    })
  }

})