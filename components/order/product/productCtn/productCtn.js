// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product: {
      type: Object,
      value: {}
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
    handleNum(e) {
      //点击修改product.num的值，然后批量修改属具的数量
      this.setData({
        "product.num": e.detail.num
      })
    }
  }
})
