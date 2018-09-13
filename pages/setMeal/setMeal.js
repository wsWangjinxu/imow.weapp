//index.js
//获取应用实例
import { getProductDetail, addCart, getProductSkus } from "../../api/productDetail/productDetail";

const app = getApp();

Page({
  data: {
    paytype:false ,//false全款加入购物车 true定金立即购买
    num:1,
    popupshow: false,//弹出层是否显示
    productId:"",//当前选中产品id
    initArray:[
      { name: "EPT20 - 15ET2 1.5t全电动搬运车 中力小金刚二代", price: 8900, oldprice: 9000, img: "https://dummyimage.com/135x135/fb0a2a", productId:11111111},
      { name: "EPT20 - 15ET2 2.5t全电动搬运车 中力小金刚2代", price: 8900, oldprice: 12000, img: "https://dummyimage.com/135x135/fb0a2a", productId:22222222},
      { name: "EPT20 - 15ET2 3.5t全电动搬运车 中力小金刚3代", price: 8900, oldprice: 15000, img: "https://dummyimage.com/135x135/fb0a2a", productId:33333333},
    ]
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
  //套餐数量
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
  },
  //加入购物车
  addcart(){
    let newArray = this.data.initArray;
    let no = 0; //记录已选择规格的数量，只有全部选择了才下一步操作
    for (let index = 0; index < newArray.length; index++) {
      const item = newArray[index];
      if (item.skuId == "" || item.skuId == undefined) {
        wx.showToast({
          title:'有产品未选规格',
          icon: 'none',
          image: '/static/imgs/warn.png'
        });
      }else{
        no++; 
      }
    }
    if (no == newArray.length){
      wx.showToast({
        title: '加入购物车success',
      });
    }
    
  },
  //立即购买
  buyNow(){
    let newArray = this.data.initArray;
    let no = 0;
    for (let index = 0; index < newArray.length; index++) {
      const item = newArray[index];
      if (item.skuId == "" || item.skuId == undefined) {
        wx.showToast({
          title: '有产品未选规格',
          icon: 'none',
          image: '/static/imgs/warn.png'
        });
      } else {
        no++;
      }
    }
    if (no == newArray.length) {
      wx.showToast({
        title: '立即购买success',
        icon: 'none',
      });
    }
  },
  //子组件传值
  onMyEvent: function (e) {
    console.log(e.detail.skuId);
    console.log(e.detail.price);
    console.log(e.detail.isShow);
    console.log(e.detail.productId);
    console.log(e.detail.depositShow);
    let newArray = this.data.initArray;
    for (let index = 0; index < newArray.length; index++) {
      const item = newArray[index];
      if (item.productId == e.detail.productId) {        //判断选择产品id，再往数组匹配项添加skuId、price
        item.skuId = e.detail.skuId;
        item.nowPrice = e.detail.price;
      }
    }

    this.setData({
      popupshow: e.detail.isShow,//关闭弹出层
      initArray: newArray    //赋值新数组
    });


  }



})