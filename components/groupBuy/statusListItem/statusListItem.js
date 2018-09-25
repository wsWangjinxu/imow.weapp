Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleTap() {
      let id = this.data.ctn.id;
      wx.navigateTo({
        url: "/pages/groupBuy/joinGroupBuy/joinGroupBuy?id=" + id
      });
    }
  }
})