Component({
  properties: {
    brandList: {
      type: Array,
      value: [
        {
          name: "中力"
        },
        {
          name: "杭叉"
        }
      ]
    }
  },
  data: {
    isFoldClass: "fold"
  },
  methods: {
    //是否折叠分类
    fold: function () {
      if(this.data.isFoldClass === "fold") {
        this.setData({
          isFoldClass: "unfold"
        });
      } else {
        this.setData({
          isFoldClass: "fold"
        });
      }
    },
  }
})