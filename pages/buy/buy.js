//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    num:1
  },
  onLoad: function () {
    
  },
  onChange(e){   
    this.setData({ num: e.detail });
    
  },
  addcart(){
    console.log(this.data.num)
  }
})
