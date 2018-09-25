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
    hasBtn: {
      type: Boolean,
      value: true
    },
    detail: {
      type: Boolean,
      value: false
    }
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
    //进入店铺
    navToShop(e){
      let shopId = e.currentTarget.dataset.shopid;
      wx.navigateTo({
        url: "/pages/shop/shop?shopId=" + shopId
      });
    },

    //查看店铺详情
    navToDetail(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/shopDetail/shopDetail?shopId=" + id
      });
    }
  }
})
