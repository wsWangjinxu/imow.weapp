// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: -1
    },
    isChecked: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        if(newVal) {
          this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.num});
        } else {
          this.triggerEvent("selectedProduct", { index: this.data.index, status: 0 });
        }
      }
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
      });
      if(this.data.isChecked) {
        this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.num});
      }
    },

    //根据属具或者单品触发的事件，选中整个产品
    checkProduct(e) {
      if(e.detail.status === 1) {
        //选中单个产品包括属具
        this.setData({
          isChecked: true
        });
        this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.num});
      } else {
        //取消单个产品包括属具
        this.setData({
          isChecked: false,
          checkAll: false
        });
        this.triggerEvent("selectedProduct", { index: this.data.index, status: 0 });
      }
    }
  }
})
