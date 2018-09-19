import {
  getSwipers,
  getCoupons,
  getSuperGroupBuy,
  getShopList,
  getProductList
} from "../../api/special/index";

Page({
  data: {
    scrollHeight: 0,  //用来设置view-scroll的高度
    groupHeight: "285rpx",  //热销产品的多行高度
    hotHeight: "300rpx",  //热销产品的单行高度
    skuShow: false, //是否显示sku选择的组件
    productId: "",  //当前选中的产品的id，sku组件根据产品id来获取对应的sku信息
    currentShopId: "" //当前的店铺id
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

    //获取轮播图信息
    getSwipers("POST").then(res => {
      this.setData({
        swipers: res.data.swipers
      });
    });

    //获取优惠券信息
    getCoupons("POST").then(res => {
      this.setData({
        coupons: res.data.specialCoupons
      });
    });

    //获取超级拼团的内容
    getSuperGroupBuy("POST").then(res => {
      this.setData({
        superGroupBuy: res.data.superGroupBuy
      });
    });

    //获取店铺列表
    getShopList("POST").then(res => {
      let id = res.data.shopList[0].shopId;


      //获取产品列表
      getProductList("post", { shopId: id }).then(res => {
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
    let productId = e.detail.id;
    this.setData({
      productId,
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
