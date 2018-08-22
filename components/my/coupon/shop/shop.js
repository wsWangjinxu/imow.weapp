// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: String,
      value: "used"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusClass: "common"
  },

  ready: function() {
    switch(this.data.status) {
      case("used"): this.setData({statusClass: "used"}); break;
      case("unused"): this.setData({statusClass: "unused"}); break;
      case("overdue"): this.setData({statusClass: "overdue"}); break;
    }
    if(this.data.status == "used") {
      console.log(this.data.status);
      this.setData({
        statusClass: "limit"
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
