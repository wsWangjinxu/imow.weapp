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
        isOrder: true
      });
    }
  }
})
