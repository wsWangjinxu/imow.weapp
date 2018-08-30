// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopName:{
      type: String,
      value: ""
    },
    url: {
      type: String,
      value: "http://www.baidu.com"
    },
    checkAll: {
      type: Boolean,
      value: false
    },
    cancelCheck: {
      type: Boolean,
      value: false
    }
  },
  data: {
    isOrder: false
  },
  ready(){
    let route = getCurrentPages();
    let currentRoute = route[route.length-1].route;
    if(~currentRoute.indexOf("order")) {
      this.setData({
        isOrder: true,
        checkAll: false
      });
    }
    if(~currentRoute.indexOf("orderConfirm")) {
      this.setData({
        orderConfirm: true,
        isOrder: false
      })
    }
  },
  methods: {
    checkboxChange(e) {
      console.log(e);
      if(e.detail.value.length > 0) {
        //触发全选事件
        this.triggerEvent("checkAll");
      } else {
        //取消全选事件
        this.triggerEvent("checkCancel");
      }
    }
  }
})
