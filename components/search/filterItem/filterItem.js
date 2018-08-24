Component({
  data: {
    isFoldClass: "fold"
  },
  methods: {
    fold: function () {
      if(this.data.isFoldClass === "fold") {
        this.setData({
          isFoldClass: "unfold"
        })
      } else {
        this.setData({
          isFoldClass: "fold"
        })
      }
    }
  }
})