import { searchHistory, hotSearch } from "../../api/search/search"

Page({
  data: {
    keyword: "",
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

  onShow() {
    let that = this;
    //获取搜索历史2:从本地缓存获取搜索历史
    wx.getStorage({
      key: "history",
      success(res) {
        that.setData({
          history: res.data
        })
      }
    });
  },

  onSearch(e) {
    //这里获取搜索的逻辑
    if (!this.data.keyword) {
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

    this.setHistory(keyword);


    //设置搜索框的内容为点击的关键字
    this.setData({
      keyword: keyword
    });

    this.search();
  },

  //初始化获取数据
  init() {
    //获取热门搜索关键字
    hotSearch("POST").then(res => {
      this.setData({
        hotProduct: res.data.hotPointList
      });
    });
  },

  //导航到搜索页面获取产品列表
  search() {

    //记录搜索历史
    this.setHistory(this.data.keyword);

    //导航去搜索列表页，传递过去搜索的关键字和搜索的模式
    wx.navigateTo({
      url: "/pages/list/list?keyword=" + this.data.keyword + "&id=" + this.data.selectedId
    });
  },

  //记录搜索历史
  setHistory(keyword) {
    //将搜索关键字存入缓存中并去重
    wx.getStorage({
      key: "history",
      success(res) {
        let history = res.data;
        //查找原数组中是否有，如果有就不需要加入，如果没有写入缓存
        if (!(~history.indexOf(keyword))) {
          if (history.length === 10) {
            history.shift();
          }
          history.push(keyword);
          wx.setStorage({
            key: "history",
            data: history
          })
        }
      },
      fail() {
        //失败的话，说明缓存中没有存入关键字，直接写入缓存即可
        wx.setStorage({
          key: "history",
          data: [keyword]
        })
      }
    });
  }
});

