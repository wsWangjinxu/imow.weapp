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
    status: {
      type: String,
      value: 8
    },

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
    handleCheckboxChange() {
      console.log("被选中了")
    }
  }
})
