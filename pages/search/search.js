import {searchHistory, hotSearch} from "../../api/search/search"

Page({
  data: {
    keyword:"",
    selectedId: "1",
    list: [
      {
        id: "1",
        title: "产品"
      },
      {
        id: "2",
        title: "店铺"
      }
    ],
    history: false,
    hotProduct: false
  },
  
  onLoad() {
    this.init();
  },

  onSearch(e) {
    //这里获取搜索的逻辑
    if(!this.data.keyword) {
      wx.showToast({
        title: "请输入搜索关键字",
        image: "../../static/icon/warning-white.png",
        duration: 2000
      });
    } else {
      this.search();
    }
  },

  //点击搜索关键字获取搜索的关键字并存入data中
  handleChange(e) {
    this.setData({
      keyword: e.detail
    });
  },

  //切换搜索模式： 店铺||产品
  handleTabChange(e) {
    this.setData({
      selectedId: e.detail
    });
  },

  //热门搜索&历史搜索
  pointSearch(e) {
    //搜索关键字
    var keyword = e.target.dataset.text;

    //设置搜索框的内容为点击的关键字
    this.setData({
      keyword: keyword
    });

    this.search();
  },

  //初始化获取数据
  init() {
    //获取搜索历史
    searchHistory("POST").then(res => {
      this.setData({
        history: res.data.histroy
      })
    });

    //获取热门搜索关键字
    hotSearch("POST").then(res => {
      this.setData({
        hotProduct: res.data.hot
      })
    });
  },

  //导航到搜索页面获取产品列表
  search() {
    //导航去搜索列表页，传递过去搜索的关键字和搜索的模式
    wx.navigateTo({
      url: "/pages/list/list?keyword=" + this.data.keyword + "&id=" + this.data.selectedId
    });
  }
});
