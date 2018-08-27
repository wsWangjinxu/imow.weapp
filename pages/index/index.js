import {getBannerItemList, getNavList, getAD, getTabCtn } from "../../api/indexConfig/config";

const app = getApp()

Page({
  data: {
    list: [
      {
        id: '猜你喜欢',
        title: '猜你喜欢'
      },
      {
        id: '搬运设备',
        title: '搬运设备'
      },
      {
        id: '五金工具',
        title: '五金工具'
      },
      {
        id: '仓储车间',
        title: '仓储车间'
      },
      {
        id: '清洁环保',
        title: '清洁环保'
      }
    ],
    selectedId: '猜你喜欢',
    bannerList: "",
    navList: "",
    ADList: "",
    page: 1
  },
  onLoad() {
    this.init();
  },
  //点击tab切换不同的商品
  handleTabChange(e) {
    //切换选中的标记
    this.setData({
      selectedId: e.detail,
      page: 1
    });
    //请求数据
    getTabCtn("POST", {
      id: e.detail,
      page: this.data.page
    }).then(res => {
      this.setData({
        productList: res.data.productList
      })
    })
  },


  //下拉刷新
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  },

  //上拉加载
  onReachBottom() {
    wx.showLoading({
      title: '玩命加载中'
    });
    //加载下一页的内容
    this.data.page += 1;
    getTabCtn("POST", {
      id: this.data.selectedId,
      page: this.data.page
    }).then(res => {
      let tempList = this.data.productList;
      for(let i = 0; i < res.data.productList.length; i++) {
        tempList.push(res.data.productList[i]);
      }
      this.setData({
        productList: tempList
      });
      wx.hideLoading();
    }).then(err => {
      wx.hideLoading();
    });
  },

  //点击搜索框导航到搜索页
  navigatorToSearch() {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },

  //页面初始化
  init() {
    //获取首页轮播图的内容
    getBannerItemList("POST").then(res => {
      this.setData({
        "bannerList": res.data.bannerItemList
      });
    });

    //获取首页轮播图下方的导航信息
    getNavList("POST").then(res => {
      this.setData({
        navList: res.data.navList
      });
    });

    //获取首页导航信息下方的广告位信息
    getAD("POST").then(res => {
      this.setData({
        ADList: res.data.ADList
      });
    });

    //获取tab的默认内容
    getTabCtn("POST",{
      id: "猜你喜欢",
      page: 1
    }).then(res => {
      this.setData({
        productList: res.data.productList
      });
    });
  }
})
