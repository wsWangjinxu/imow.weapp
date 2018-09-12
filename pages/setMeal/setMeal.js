//index.js
//获取应用实例
import { getProductDetail, addCart, getProductSkus } from "../../api/productDetail/productDetail";

const app = getApp();

Page({
  data: {
    paytype:false ,//false全款加入购物车 true定金立即购买
    num:1,
    popupshow: false,//弹出层是否显示
    productId:""  //当前选中产品id
  },
  onLoad: function(e) { 
    console.log(e);
  },
  //点击选择过个跳出弹出层
  showpop(e){
    // console.log(e.currentTarget.dataset.productid)
    this.setData({ 
      popupshow: true, 
      productId: e.currentTarget.dataset.productid
    });
  },
  onClose() {
    this.setData({ 
      popupshow: false, 
      productId: ""
    });
  },
  //数量
  onChange(e) {
    this.setData({
      num: e.detail
    });
  },
  //全款按钮事件
  payType1(){
    if (this.data.paytype===true){
      this.setData({ paytype: false });
    }
  },
  //定金按钮事件
  payType2() {
    if (this.data.paytype === false) {
      this.setData({ paytype: true });
    }
  }
})