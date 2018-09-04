import {getBannerItemList, getTabCtn, guessYourFavorite, getFloorList } from "../../api/indexConfig/config";

const app = getApp()

Page({
  data: {
    list: [
      {
        id: '猜你喜欢',
        title: '猜你喜欢'
      },
      {
        id: 0,
        title: '搬运设备'
      },
      {
        id: 1,
        title: '五金工具'
      },
      {
        id: 2,
        title: '仓储车间'
      },
      {
        id: 3,
        title: '清洁环保'
      }
    ],
    selectedId: '猜你喜欢',
    bannerList: "",
    navList: [
      {
        title: "工厂店",
        url: "/pages/productDetail/productDetail",
        imgSrc: "http://dummyimage.com/400x100/fb0a2a"
      },
      {
        title: "阿母团购",
        url: "/pages/productDetail/productDetail",
        imgSrc: "http://dummyimage.com/400x100/fb0a2a"
      },
      {
        title: "二手车",
        url: "/pages/productDetail/productDetail",
        imgSrc: "http://dummyimage.com/400x100/fb0a2a"
      },
      {
        title: "阿母币专区",
        url: "/pages/productDetail/productDetail",
        imgSrc: "http://dummyimage.com/400x100/fb0a2a"
      },
      {
        title: "阿母学院",
        url: "/pages/productDetail/productDetail",
        imgSrc: "http://dummyimage.com/400x100/fb0a2a"
      },
      {
        title: "关于阿母",
        url: "/pages/productDetail/productDetail",
        imgSrc: "http://dummyimage.com/400x100/fb0a2a"
      },{
        title: "阿母服务店",
        url: "/pages/productDetail/productDetail",
        imgSrc: "http://dummyimage.com/400x100/fb0a2a"
      },{
        title: "更多",
        url: "/pages/productDetail/productDetail",
        imgSrc: "http://dummyimage.com/400x100/fb0a2a"
      }
    ]
  },
  onLoad() {
    this.init();
  },
  //点击tab切换不同的商品
  handleTabChange(e) {
    this.setData({
      selectedId: e.detail
    });
    if(e.detail === "猜你喜欢") {
      guessYourFavorite("POST").then(res => {
        this.setData({
          productList: res.data.guessYourFavorite
        });
      })
    } else {
      getFloorList("POST").then(res => {
        this.setData({
          productList: res.data.floorList[e.detail].productList
        });
      })
    }
  },

  //点击搜索框导航到搜索页
  navigatorToSearch() {
    wx.navigateTo({
      url: "/pages/search/search"
    });
  },

  //页面初始化
  init() {
    //获取首页轮播图的内容
    getBannerItemList("POST").then(res => {
      this.setData({
        "bannerList": res.data.bannerItemList
      });
    });

    //获取猜你喜欢的内容
    guessYourFavorite("POST").then(res => {
      this.setData({
        productList: res.data.guessYourFavorite
      });
    });
  }
});
