//index.js
//获取应用实例
import { getPromotionPackage, cartGroupPurchaseAdd } from "../../api/setMeal/setMeal";

const app = getApp();

Page({
  data: {
    paytype:false ,//false全款加入购物车 true定金立即购买
    num:1,
    popupshow: false,//弹出层是否显示
    productId:"",//当前选中产品id
    skuCode: "",//当前选中产品skuCode
    deliveryTime: "",//当前选中产品deliveryTime
    productSkus: [],//当前选中产品productSkus
    topImg: "",//当前选中产品顶部图
    initArray:[
      // { id:"id111",productName: "EPT20 - 15ET2 1.5t全电动搬运车 中力小金刚二代", img: "https://dummyimage.com/135x135/fb0a2a"},
      // { id:"id222",productName: "EPT20 - 15ET2 2.5t全电动搬运车 中力小金刚2代", img: "https://dummyimage.com/135x135/fb0a2a"},
      // { id:"id333",productName: "EPT20 - 15ET2 3.5t全电动搬运车 中力小金刚3代", img: "https://dummyimage.com/135x135/fb0a2a"},
    ],
    depositShow: false, //定金是否存在
    total:0   ,//价格合计
    totalChange:0,
    oldTotal:0, //组合原价
    oldTotalChange:0,
    promotionId: 549583908203049
  },
  onLoad: function(e) { 
    console.log(e);
    // this.setData({ promotionId: e.id });
    this.init();
  },
  init() {
    //获取套餐产品列表
    getPromotionPackage("GET", {
      promotionId: this.data.promotionId,
    }).then(res => {
      if (res.statusCode == 200){
        console.log(res.data.packageModel);
        this.setData({
          initArray: res.data.packageModel.products
        });
      }   
    })
    let newArray = this.data.initArray;  //处理初始价格
    let totalMoney =0;
    for (let index = 0; index < newArray.length; index++) {
      const item = newArray[index];
      totalMoney+=item.price;
    }
    this.setData({ total: totalMoney })
  },
  //点击选择规格跳出弹出层
  showpop(e){
    console.log(e);  //打印当前产品要传给组件的值（自定义属性）
    console.log(e.currentTarget.dataset.skucode);
    console.log(e.currentTarget.dataset.deliverytime);
    console.log(e.currentTarget.dataset.productskus);
    console.log(e.currentTarget.dataset.topimg);
    this.setData({ 
      popupshow: true, 
      productId: e.currentTarget.dataset.productid,
      productSkus: e.currentTarget.dataset.productskus,
      topImg:e.currentTarget.dataset.topimg
    });
    if (e.currentTarget.dataset.skucode){
      this.setData({
        skuCode: e.currentTarget.dataset.skucode ? e.currentTarget.dataset.skucode : "",
        deliveryTime: e.currentTarget.dataset.deliverytime ? e.currentTarget.dataset.deliverytime : ""
      });
    }
  },
  onClose() {
    this.setData({ 
      popupshow: false, 
      productId: "",
      skuCode: "",
      deliveryTime: "",
    });
  },
  //套餐数量
  onChange(e) {
    this.setData({ num: e.detail });
    if (e.detail>1){
      let totalChange = this.data.total * e.detail;
      let oldTotalChange = this.data.oldTotal * e.detail;
      this.setData({
        totalChange: totalChange,
        oldTotalChange: oldTotalChange
      });
    }else{
      this.setData({
        totalChange: 0,
        oldTotalChange:0
      });
    }
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
    let count = 0; //记录已选择规格的数量，只有全部选择了才下一步操作
    let cartArray = [];
    for (let index = 0; index < newArray.length; index++) {
      const item = newArray[index];
      let a = {};
      a.productId = item.id;
      a.skuId = item.skuId;
      a.skuCode = item.skuCode;
      a.num = this.data.num;
      cartArray.push(a);
      if (item.skuId == "" || item.skuId == undefined) {
        wx.showToast({
          title:'有产品未选规格',
          icon: 'none',
          image: "/static/icon/warning-white.png"
        });
      }else{
        count++; 
      }
    }
    if (count == newArray.length){
      console.log(newArray);
      // wx.showToast({
      //   title: '加入购物车success',
      // });
      let cartArray=[];
      for (let index = 0; index < newArray.length; index++) {
        const item = newArray[index];
        let a ={};
        a.productId=item.id;
        a.skuId=item.skuId;
        a.skuCode=item.skuCode;
        a.num = this.data.num;
        cartArray.push(a);
      }
      cartGroupPurchaseAdd("POST", {
        cartModel:cartArray
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          wx.switchTab({
            url: '/pages/cart/cart'
          })
        } else {
          wx.showToast({
            title: '操作失败，请重试',
            duration: 2000,
            image: "/static/icon/warning-white.png"
          })
          this.init();
        }
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
      console.log(newArray);
      wx.showToast({
        title: '立即购买success',
        icon: 'none',
      });
    }
  },
  //子组件点击确认按钮传值
  onMyEvent: function (e) {
    console.log(e.detail.skuId);
    console.log(e.detail.price);
    console.log(e.detail.oldPrice);
    console.log(e.detail.isShow);//弹出层是否显示
    console.log(e.detail.productId);
    console.log(e.detail.depositShow);//是否有交期
    console.log(e.detail.skuCode);
    console.log(e.detail.deliveryTime);
    let newArray = this.data.initArray;
    for (let index = 0; index < newArray.length; index++) {
      const item = newArray[index];
      if (item.id == e.detail.productId) {        //判断选择产品id，再往数组匹配项添加skuId、price
        item.skuId = e.detail.skuId;
        item.nowPrice = e.detail.price;
        item.oldPrice = e.detail.oldPrice;
        item.depositShow = e.detail.depositShow;
        item.skuCode = e.detail.skuCode;
        item.deliveryTime = e.detail.deliveryTime;
      }
    }
    this.setData({
      popupshow: e.detail.isShow,//关闭弹出层
      productId:"",
      initArray: newArray    //赋值新数组
    });

    //判断是否每个产品都有定金
    let count = 0;
    let totalMoney = 0;   //改变总价
    let oldtotalMoney=0;
    let newArray2 = this.data.initArray;
    for (let index = 0; index < newArray2.length; index++) {
      const item = newArray2[index];
      totalMoney += item.nowPrice ? item.nowPrice:0;
      oldtotalMoney += item.oldPrice ? item.oldPrice:0;
      if (item.depositShow===true) {         
        count++
      }
    } 
    this.setData({ 
      total: totalMoney,
      oldTotal: oldtotalMoney
    });   
    if (count == newArray2.length){   
      this.setData({ depositShow: true });    
    }else{
      this.setData({ depositShow: false });
    }


  }



})