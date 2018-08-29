import {getProductList} from "../../api/search/search"

Page({
  data: {
    filterShow: "none",
    //保存最初的状态
    keyword:"",
    selectedId: "",
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
    searchResult: "",
    pageIndex: 1
  },

  onLoad(option) {
    //保留当前搜索状态，用于用户下拉刷新
    let currentSearch = {
      keyword: option.keyword,
      pageIndex: 1
    };

    //记录最初的状态
    this.setData({
      keyword: option.keyword,
      selectedId: option.id,
      currentSearch: currentSearch
    });

    //初始化数据
    this.search(currentSearch);
  },

  onSearch(e) {
    //这里获取搜索的逻辑
    console.log(this.data.selectedId);
    console.log(this.data.keyword);
  },

  //点击修改模式，是搜索店铺还是搜索产品
  handleTabChange(e) {
    this.setData({
      selectedId: e.detail
    });
  },

  //打开筛选框，并禁止页面滚动
  filterOpen() {
    this.setData({
      filterShow: true
    }); 
  },

  //关闭筛选框
  completeFilter(data) {
    this.setData({
      filterShow: "none"
    });
  },

  //点击搜索框返回到上一级
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  //全局的搜索
  search(data) {
    let id = this.data.selectedId;
    if(id==="1") {
      //这里是产品搜索
      getProductList("GET", data).then(res => {
        //获取到的搜索的数据
        this.setData({
          searchResult: res.data
        });
      })
    } else {
      //这里是店铺搜索
      getProductList("GET", data).then(res => {
        //获取到的搜索的数据
        this.setData({
          searchResult: res.data
        });
      })
    }
  },

  //处理筛选组件的搜索
  handleSearch(e) {
    let data = e.detail;
    data.keyword = this.data.keyword;
    data.pageIndex = 1;
    //保存当前搜索状态，用于上拉加载(每一次搜索都要记录)
    this.setData({
      currentSearch: data
    });
    //调用全局搜索
    this.search(data);
  },

  //处理筛选组件的重置（等同于下拉刷新）
  handleReset() {
    console.log("表示已经重置了");
    this.search({keyword: this.data.keyword, pageIndex: 1});
  },

  //下拉刷新
  onPullDownRefresh() {
    this.search(this.data.currentSearch);
    wx.stopPullDownRefresh();
  },

  //上拉加载
  onReachBottom() {
    wx.showLoading({
      title: '玩命加载中'
    });
    //加载下一页的内容
    let page = this.data.currentSearch.pageIndex;
    console.log(page);
    this.setData({
      "currentSearch.pageIndex": page + 1
    });
    console.log(this.data.currentSearch);
    getProductList("GET", this.data.currentSearch).then(res => {
      console.log(res);
      let tempList = this.data.searchResult.productList;
      for(let i = 0; i < res.data.productList.length; i++) {
        tempList.push(res.data.productList[i]);
      }
      this.setData({
        "searchResult.productList": tempList
      });
      wx.hideLoading();
    }).then(err => {
      wx.hideLoading();
    });
  },
})
