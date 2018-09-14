import {
  getSwipers,
  getCoupons,
  getSuperGroupBuy,
  getHotProduct,
  getShopList,
  getProductList
} from "../../api/special/index";

Page({
  data: {
    scrollHeight: 0,
    groupHeight: "285rpx",
    hotHeight: "300rpx"
  },
  onLoad() {
    let _this = this;
    //获取手机屏幕的高度
    wx.getSystemInfo({
      success(res) {
        console.log(res);
        //获取窗口高度
        let windowHeight = res.windowHeight;
        let pixelRatio = res.pixelRatio;
        let scrollHeight = windowHeight - 100;
        _this.setData({
          scrollHeight
        });
        console.log(scrollHeight);
      }
    });

    //获取轮播图信息
    getSwipers("POST").then(res => {
      console.log(res);
      this.setData({
        swipers: res.data.swipers
      });
    });

    //获取优惠券信息
    getCoupons("POST").then(res => {
      console.log(res);
      this.setData({
        coupons: res.data.specialCoupons
      });
    });

    //获取超级拼团的内容
    getSuperGroupBuy("POST").then(res => {
      console.log(res);
      this.setData({
        superGroupBuy: res.data.superGroupBuy
      });
    });

    //获取热销榜产品
    getHotProduct("POST").then(res => {
      console.log(res);
      this.setData({
        hotProduct: res.data.hotProduct
      });
    });

    //获取店铺列表
    getShopList("POST").then(res => {
      let id = res.data.shopList[0].shopId;

      console.log(id);

      //获取产品列表
      getProductList("post", { shopId: id }).then(res => {
        console.log(res);
        this.setData({
          productList: res.data.productList
        });
      });

      //设置店铺名称列表
      this.setData({
        shopList: res.data.shopList,
        selectedShop: res.data.shopList[0]
      });
    });
  },

  //点选修改店铺的产品列表
  handleListChange(e) {
    console.log(e);
    let shopId = e.currentTarget.dataset.id;
    let shopName = e.currentTarget.dataset.shopname;
    // console.log(shopId + shopName);

    //设置当前选中的店铺
    this.setData({
      selectedShop: {
        shopId,
        shopName
      }
    });

    //请求选中店铺的产品列表
    getProductList("post", { shopId }).then(res => {
      console.log(res);
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

  //展示更多
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

  //展示更多
  handleHot(e) {
    let hotHeight;
    if (e.detail.status) {
      hotHeight = "300rpx";
    } else {
      hotHeight = "auto";
    }
    this.setData({
      hotHeight
    });
  }




}) 
