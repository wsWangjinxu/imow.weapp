// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String,
      value: "http://dummyimage.com/200x100/fb0a2a"
    },
    title: {
      type: String,
      value: "导航"
    },
    url: {
      type: String,
      value: "/pages/logs/logs"
    },
    shopName:String,
    shopId: String,
    shopImg: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showShopId(e){
      console.log(e.currentTarget.dataset.shopid)
    }
  }
})
