import {
  getSwipers,
  // getCoupons,
  getSuperGroupBuy,
  // getShopList,
  // getProductList,
  getStatistic
} from "../../api/special/index";

Page({
  data: {
    scrollHeight: 0,  //用来设置view-scroll的高度
    groupHeight: "285rpx",  //热销产品的多行高度
    hotHeight: "300rpx",  //热销产品的单行高度
    skuShow: false, //是否显示sku选择的组件
    productSkus: "",  //当前选中的产品，sku组件根据产品获取对应的sku信息
    currentShopId: "", //当前的店铺id,
    totleCount: 0,  //拼团的数量
    totleMoney: 0, //拼团的金额
    isActive: 0,
    dotClass: "dot1",
    promotionId: "",  //当前选规格的产品的promotionId
    productId: "" //当前选规格的产品的产品id
  },
  onLoad() {
    let _this = this;
    //获取手机屏幕的高度
    wx.getSystemInfo({
      success(res) {
        //获取窗口高度
        let windowHeight = res.windowHeight;
        let pixelRatio = res.pixelRatio;
        let scrollHeight = windowHeight - 100;
        _this.setData({
          scrollHeight
        });
      }
    });

    let current = Date.now();
    // let current = "2018 11 13";
    current = new Date(current);
    let date = String(current.getDate());
    let month = String(current.getMonth() + 1);
    let time = month + date;
    let isActive = 0;
    let dotClass = "dot1";
    switch (time) {
      case "1022":
        isActive = 1;
        dotClass = "dot2";
        break;
      case "116":
        isActive = 2;
       dotClass = "dot3";
        break;
      case "1111":
        isActive = 3;
        dotClass = "dot4";
        break;
      case "1112":
        isActive = 4;
        dotClass = "dot5";
        break;
    }

    if(Number(time) > 1112) {
      isActive = 5;
      dotClass = "dot5";
    }

    this.setData({
      isActive,
      dotClass
    })

    console.log(this.data.isActice);    

    getStatistic("GET").then(res => {
      console.log(res);
      let tempData =  res.data.promotionStatisticResult
      this.setData({
        totleCount: tempData.totleCount,
        totleMoney: (tempData.totleMoney / 10000).toFixed(2)
      });
    }),

    //获取轮播图信息
    getSwipers("POST").then(res => {
      this.setData({
        swipers: res.data.swipers
      });
    });

    // //获取优惠券信息
    // getCoupons("POST").then(res => {
    //   this.setData({
    //     coupons: res.data.specialCoupons
    //   });
    // });

    // //获取超级拼团的内容
    // getSuperGroupBuy("GET").then(res => {
    //   console.log(res);
    //   this.setData({
    //     superGroupBuy: res.data.superGroupBuy
    //   });
    // });



    //获取快速下单的内容
    getSuperGroupBuy("GET").then(res => {
      console.log(res); 
      let tempData = res.data.superGroupModel;
      console.log(tempData.shopList);

      //设置店铺名称列表
      this.setData({
        shopList: tempData.shopList,
        selectedShop: 0,
        productList: tempData.shopList[0].superGroupBuy
      });
    });
  },

  //点选修改店铺的产品列表
  handleListChange(e) {
    //获取点击的店铺的id和店铺名称
    let shopId = e.currentTarget.dataset.id;
    let shopName = e.currentTarget.dataset.shopname;
    let index = e.currentTarget.dataset.index;

    //设置当前选中的店铺id和名称
    this.setData({
      selectedShop: {
        shopId,
        shopName
      },
      productList: this.data.shopList[index].superGroupBuy
    });

    // //请求选中店铺的产品列表
    // getProductList("post", { shopId }).then(res => {
    //   this.setData({
    //     productList: res.data.productList
    //   });
    // });
  },

  //进入店铺
  gotoShop() {
    let shopId = this.data.selectedShop.shopId;
    wx.navigateTo({
      url: shopId
    });
  },

  //超级拼团的展示更多
  handleSuper(e) {
    let groupHeight;
    if (e.detail.status) {
      groupHeight = "285rpx";
    } else {
      groupHeight = "auto";
    }
    this.setData({
      groupHeight
    });
  },

  //点击选择规格获取产品的productId，并传递给sku组件，sku组件根据产品id来获取对应的sku信息
  handleInfo(e) {
    let superGroupProductSkus = e.detail.superGroupProductSkus;
    let productId =  e.detail.productId;
    let promotionId =  e.detail.promotionId;
    debugger 
    // this.setData({
    //   productId,
    //   skuShow: true
    // });
    this.setData({
      productSkus: superGroupProductSkus,
      productId: String(productId),
      promotionId:  String(promotionId),      
      skuShow: true    
    });
  },

  //点击灰色区域隐藏sku选择组件
  handleClose(){
    this.setData({
      skuShow: false
    });
  },

  //根据sku组件的添加与减少更改本地的数量
  modifyNumber(e) {
    debugger //eslint-disable-line
    console.log(e);
    let productId = e.detail.productId;
    let promotionId = e.detail.promotionId;
    let skuCode = e.detail.skuCode;
    let cartId = e.detail.cartId;
    let num = e.detail.num;
    let productList = this.data.productList;

    //更新对应产品的数量
    productList.forEach(ele => {
      if(ele.id == productId && ele.promotionId == promotionId) {
        for(let i = 0; i < ele.superGroupProductSkus.length; i++) {
          if(ele.superGroupProductSkus[i].skuCode == skuCode) {
            ele.superGroupProductSkus[i].cartId = cartId;
            ele.superGroupProductSkus[i].number = num;
          }
        }
      }
    });

    let shopList = this.data.shopList;
    let id = this.data.selectedShop.shopId;

    //更新对应店铺的数量
    shopList.forEach(ele => {
      if(ele.shopId == productId) {
        ele.number += num;
      }
    });

    //设置产品店铺
    this.setData({
      productList,
      shopList
    });
  },

  handlePay() {
    let shopId = this.data.selectedShop.shopId;
    wx.navigateTo({
      url: "/pages/orderConfirm/orderConfirm?shopId=" + shopId
    });
  },

  //屏蔽遮罩层下方的页面滚动
  move(){}
}) 
