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
      console.log(this.data.isShow);
      this.setData({
        isShow: !this.data.isShow
      });
    }
  }
})