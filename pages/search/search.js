//logs.js

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
    history: ["小金刚","微金刚","中力变金刚","大力神","EPT20-15ET2","锂电壹号"],
    hotProduct: ["小金刚","微金刚","中力变金刚","大力神","EPT20-15ET2","锂电壹号"]
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
  }
})
