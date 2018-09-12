// components/buysku/buysku.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    itemData:Array,
    typeName:String
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
    select: function (e) {
      // console.log(e.currentTarget.dataset.content);
      // console.log(e.currentTarget.dataset.state);
      // console.log(e.currentTarget.dataset.type);
      this.triggerEvent('myevent', { type: e.currentTarget.dataset.type, content: e.currentTarget.dataset.content, state: e.currentTarget.dataset.state});
    }
  }
})
