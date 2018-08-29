//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    num:1, //数量
    dates:[
      { "sku": "01F02E074", "name": "十三" },
      { "sku": "01F02E075", "name": "十四" },
      { "sku": "01F02E076", "name": "十五" },
      { "sku": "01F02E077", "name": "十六" },
      { "sku": "01F02E078", "name": "十七" },
      { "sku": "01F02E079", "name": "十八" },
      { "sku": "01F02E070", "name": "十九" },
    ],
    state: ''//选择sku
  },
  onLoad: function () {
    
  },
  onChange(e){   
    this.setData({ num: e.detail });
  },
  addcart(){
    console.log(this.data.num)
  },
  //选择sku加样式
  select_sku: function (e) {
    console.log(e.currentTarget.dataset.key)
    this.setData({
      state: e.currentTarget.dataset.key,
    });
  }
})
