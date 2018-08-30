// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ctn: {
      type: Object,
      value: {}
    },
    number: {
      type: Number,
      value: 1
    },
    isChecked: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    useful: true,
    isOrderConfirm: false
  },

  ready() {
    let route = getCurrentPages();
    let currentRoute = route[route.length-1].route;
    if(~currentRoute.indexOf("orderConfirm")) {
      this.setData({
        isOrderConfirm: true
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点选属具，触发全选事件
    checkboxChange(e) {
      if(e.detail.value.length > 0) {
        this.triggerEvent("checkProduct", {status: 1});
      } else {
        this.triggerEvent("checkProduct", {status: 0});
      }
    }
  }
})
