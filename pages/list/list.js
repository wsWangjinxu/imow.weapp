Page({
  data: {
    filterShow: false,
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
    var keyword = e.target.dataset.text;
    console.log(this.data.selectedId);
    console.log(keyword);
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
  }
})
