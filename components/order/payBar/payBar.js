// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 0
    },
    money: {
      type: Number,
      value: 0
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

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange(e) {
      console.log(e.detail.value);
      if(e.detail.value.length > 0) {
        this.triggerEvent("checkAll");
      } else {
        this.triggerEvent("checkCancel");
      }
    },
    payment() {
      this.triggerEvent("pay",{
        num: 1,
        id: 2
      });
    }
  }
})
