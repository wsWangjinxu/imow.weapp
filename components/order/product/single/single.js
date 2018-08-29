// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ctn: {
      type: Object,
      value: {}
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
      //如果有属具，通知属具数量改变了
      if(this.data.ctn.hasAccessories) {
        this.triggerEvent("handleNum", {
          num: e.detail
        });
      }
      //无论有没有属具都需要把数量改变
      this.setData({
        "ctn.num": e.detail
      });
    },

    //选择单品以后选中所有属具
    handleChecked(e) {
      console.log(e.detail)
    }
  }
})
