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
    isFoldClass: "unfold",
    selectedBrand: "",
    selectedId: ""
  },
  methods: {
    //是否折叠分类
    handleFold (e) {
      console.log(e);
      if(e.detail.status) {
        this.setData({
          isFoldClass: "fold"
        });
      } else {
        this.setData({
          isFoldClass: "unfold"
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
      this.triggerEvent("brandSearch", {name: "", id: this.data.selectedId});
      this.setData({
        selectedBrand: "",
        selectedId: false
      });
    }

  }
})