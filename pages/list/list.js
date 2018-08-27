import {getProductList} from "../../api/search/search"

Page({
  data: {
    filterShow: true,
    keyword:"中力小金刚",
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
    ]
  },

  onLoad(option) {
    //初始化数据
    this.init(option);
  },

  onSearch(e) {
    //这里获取搜索的逻辑
    console.log(this.data.selectedId);
    console.log(this.data.keyword);
  },
  handleChange(e) {
    this.setData({
      keyword: e.detail
    });
  },
  handleTabChange(e) {
    this.setData({
      selectedId: e.detail
    });
  },
  pointSearch(e) {

  },
  filterOpen() {
    this.setData({
      filterShow: true
    }) 
  },
  completeFilter(data) {
    this.setData({
      filterShow: false
    })
    console.log(data);
  },

  //点击搜索框返回到上一级
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  //初始化数据
  init(option){
      //单独打开页面会出现问题
      this.setData({
        // keyword: option.keyword,
        // selectedId: option.id
      });
      this.search()
  },

  search() {
    let id = this.data.selectedId;
    if(id==="1") {
      getProductList("POST", {
        
      }).then(res => {
        // console.log(res);
      })
    } else {

    }
  }

})
