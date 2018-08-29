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
    },
    title: {
      type: String,
      value: ""
    }
  },
  data: {
    isFoldClass: "fold",
    selectedBrand: false,
    selectedId: ""
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
      if(e.detail.id) {
        this.setData({
          selectedBrand: e.detail.name,
          selectedId: e.detail.id
        });
      } else {
        this.setData({
          selectedBrand: e.detail.name,
        });
      }
      
      this.triggerEvent("brandSearch", {name: e.detail.name, id: e.detail.id});
    },
    //还原到未选中的状态
    resetBrand(e) {      
      this.triggerEvent("brandSearch", {name: false, id: this.data.selectedId});
      this.setData({
        selectedBrand: false,
        selectedId: false
      });
    }

  }
})