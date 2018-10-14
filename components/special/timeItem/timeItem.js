Component({
  properties: {
    title: {
      type: String,
      value: "默认标题"
    },
    subTitle: {
      type: String,
      value: "默认副标题"
    },
    hasBtn: {
      type: Boolean,
      value: true
    }
  },
  data: {
    icon: true
  },
  methods: {
    //点击更多切换图标
    handleChange() {
      //触发事件
      this.triggerEvent("more", {status: !this.data.icon});
      this.setData({
        icon: !this.data.icon
      });
    }
  }

})