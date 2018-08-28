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
        },
        {
          name: "中力"
        },
        {
          name: "杭叉"
        },
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
    isFoldClass: "fold",
    selectedBrand: false
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

    //设置选中的品牌
    handleSearch(e) {
      this.setData({
        selectedBrand: e.detail.name
      });
      this.triggerEvent("brandSearch", {id: e.detail.id});
    },
    //还原到未选中的状态
    resetBrand() {
      this.setData({
        selectedBrand: false
      })
    }

  }
})