Component({
  properties: {
    name: {
      type: String,
      value: "分类"
    }
  },
  data: {
    isShow: true
  },
  methods: {
    handleTap() {
      this.setData({
        isShow: !this.data.isShow
      });
      this.triggerEvent("fold", {status: !this.data.isShow});
    }
  }
})