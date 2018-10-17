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
    dotClass: "dot1"
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

    // let current = Date.now();
    let current = "2018 11 6";
    current = new Date(current);
    let date = String(current.getDate());
    let month = String(current.getMonth() + 1);
    console.log(month + date); //eslint-disable-line
    let time = month + date;
    let isActive = 0;
    let dotClass = "";
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
      dotClass = 4;
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



    //获取店铺列表
    getSuperGroupBuy("GET").then(res => {
      console.log(res);
      let tempData = res.data.superGroupModel;
      // let id = res.data.shopList[0].shopId;

      console.log(tempData.superGroupBuy);


      //获取产品列表
      // getProductList("post", { shopId: id }).then(res => {
        // this.setData({
        //   productList: res.data.productList
        // });
      // });

      //设置店铺名称列表
      this.setData({
        shopList: tempData.shopList,
        selectedShop: tempData.shopList[0].shopId,
        productList: tempData.superGroupBuy
      });
    });
  },

  //点选修改店铺的产品列表
  handleListChange(e) {
    //获取点击的店铺的id和店铺名称
    let shopId = e.currentTarget.dataset.id;
    let shopName = e.currentTarget.dataset.shopname;

    //设置当前选中的店铺id和名称
    this.setData({
      selectedShop: {
        shopId,
        shopName
      }
    });

    //请求选中店铺的产品列表
    getProductList("post", { shopId }).then(res => {
      this.setData({
        productList: res.data.productList
      });
    });
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
  handleSku(e) {
    let num = e.detail.num;
    let productList = this.data.productList;
    console.log(productList[num]);
    // this.setData({
    //   productId,
    //   skuShow: true
    // });
    this.setData({
      productSkus: productList[num].superGroupProductSkus,
      skuShow: true    
    });
  },

  //点击灰色区域隐藏sku选择组件
  handleClose(){
    this.setData({
      skuShow: false
    });
  },

  //根据sku组件的添加与减少购物车方法
  modifyNumber(e) {
    let productId = e.detail.productId;
    let num = e.detail.num;
    let productList = this.data.productList;

    //更新对应产品的数量
    productList.forEach(ele => {
      if(ele.id = productId) {
        ele.number += num;
      }
    });

    let shopList = this.data.shopList;
    let id = this.data.selectedShop.shopId;

    //更新对应店铺的数量
    shopList.forEach(ele => {
      if(ele.shopId == id) {
        ele.number += num;
      }
    });

    //设置对应产品的数量
    this.setData({
      productList,
      shopList
    });
  },

  handlePay() {
    let shopId = this.data.selectedShop.shopId;
    //
    console.log(shopId);
  },

  //屏蔽遮罩层下方的页面滚动
  move(){}
}) 
