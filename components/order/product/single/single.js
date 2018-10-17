import { changeNum } from "../../../../api/user/cart"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ctn: {
      type: Object,
      value: {}
    },
    isChecked: {
      type: Boolean,
      value: false
    },
    isKit: {
      type: Boolean,
      value: false
    },
    number: {
      type: Number,
      value: 1
    },
    isExpire: {
      type: Boolean,
      value: true
    },
    super: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    useful: true,
    isChecked: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //控制属具和单品成倍的增减
    handleChange(e) {
      //修改购物车的数量

      //用户点击input框，修改购物车的数量
      changeNum("POST", {
        cartId: this.data.ctn.cartId,
        cartNum: e.detail
      }).then(res => {
        if (~res.data.status) {
          // //如果有属具，通知属具数量改变了
          // if (this.data.ctn.hasAccessories) {
          //   this.triggerEvent("handleNum", {
          //     num: e.detail
          //   });
          // }
          //无论有没有属具都需要把数量改变
          this.setData({
            "ctn.num": e.detail
          });
          //通知属具数量改变了
          this.triggerEvent("handleNum", {
            num: e.detail
          });
        }
      });
    },

    //这里触发选中产品的事件
    handleChecked(e) {
      if (e.detail.value.length > 0) {
        this.triggerEvent("checkProduct", { status: 1 });
      } else {
        this.triggerEvent("checkProduct", { status: 0 });
      }
    }
  }
})
