import {
  getProductList,
  getShopList
} from "../../api/search/search"

Page({
  data: {
    filterShow: "none",
    //保存最初的状态
    keyword: "",
    selectedId: "1",
    list: [{
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
    console.log(option);
    //保留当前搜索状态，用于用户下拉刷新
    let currentSearch = {
      keyword: option.keyword,
      pageIndex: 1,
      pageSize: 8,
      orderDesc: false,
      order: ""
    };

    //记录最初的状态
    this.setData({
      keyword: option.keyword,
      selectedId: option.id,
      currentSearch: currentSearch,
      shopCurrentSearch: currentSearch
    });

    if (option.id == "1") {
      this.search(currentSearch);
    } else {
      this.search(this.data.shopCurrentSearch);
    }
  },

  //点击排序
  handleOrderBuy() {
    console.log("已经执行了排序操作");
    let orderDesc = !this.data.currentSearch.orderDesc;
    this.setData({
      "currentSearch.orderDesc":orderDesc
    });

    this.search(this.data.currentSearch);
  },

  //点击按销量排序
  handleSaleCount() {
    console.log("已经执行了按销量排序");
    let order = this.data.currentSearch.order;
    if(order) {
      order = ""
    } else {
      order = "saleCount";
    }
    this.setData({
      "currentSearch.order": order
    });

    this.search(this.data.currentSearch);
  },

  //点击修改模式，是搜索店铺还是搜索产品
  handleTabChange(e) {
    this.setData({
      selectedId: e.detail
    });

    if (e.detail == "1") {
      this.search(this.data.currentSearch);
    } else {
      this.search(this.data.shopCurrentSearch);
    }
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
    console.log(this.data.currentSearch);
    console.log(data);
    let id = this.data.selectedId;
    if (id == "1") {
      //这里是产品搜索
      getProductList("GET", data).then(res => {
        console.log("搜索到的数据");
        console.log(res);
        //获取到的搜索的数据
        this.setData({
          searchResult: res.data
        });
      })
    } else {
      //这里是店铺搜索
      getShopList("GET", data).then(res => {
        //获取到的搜索的数据
        console.log(res);
        this.setData({
          searchResult: res.data
        });
      })
    }
  },

  //处理筛选组件的搜索
  handleSearch(e) {
    let currentSearch = this.data.currentSearch;

    let data = e.detail;
    currentSearch.keyword = this.data.keyword;
    currentSearch.pageIndex = 1;
    for(let index in data) {
      currentSearch[index] = data[index];
    }
    //保存当前搜索状态，用于上拉加载(每一次搜索都要记录)
    this.setData({
      currentSearch
    });
    //调用全局搜索
    this.search(currentSearch);
  },

  //处理筛选组件的重置（等同于下拉刷新）
  handleReset() {
    console.log("表示已经重置了");
    this.search({
      keyword: this.data.keyword,
      pageIndex: 1
    });
  },

  //下拉刷新
  onPullDownRefresh() {
    if (this.data.selectedId == "1") {
      this.search(this.data.currentSearch);
    } else {
      this.search(this.data.shopCurrentSearch);
    }

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
    //利用当前选中的id来判断是加载店铺搜索还是加载产品搜索
    if (this.data.selectedId == "1") {
      getProductList("GET", this.data.currentSearch).then(res => {
        console.log(res);
        let tempList = this.data.searchResult.productList;
        if (res.data.productList) {
          for (let i = 0; i < res.data.productList.length; i++) {
            tempList.push(res.data.productList[i]);
          }
          this.setData({
            "searchResult.productList": tempList
          });

        }
        wx.hideLoading();
        wx.showToast({
          title: "已经到底了",
          image: "/static/icons/warning-white.png"
        })

        wx.hideLoading();
      }).then(err => {
        wx.hideLoading();
      });
    } else {
      getShopList("GET", this.data.shopCurrentSearch).then(res => {
        console.log(res);
        let tempList = this.data.searchResult.shopList;
        for (let i = 0; i < res.data.shopList.length; i++) {
          tempList.push(res.data.shopList[i]);
        }
        this.setData({
          "searchResult.shopList": tempList
        });
        wx.hideLoading();
      }).then(err => {
        wx.hideLoading();
      });
    }
  },
})