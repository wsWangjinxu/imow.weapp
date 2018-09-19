Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    }
  },
  data: {

  },
  methods: {
    navToShop(e) {
      console.log(e);
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/shop/shop?id=" + id
      });
    }
  }
})