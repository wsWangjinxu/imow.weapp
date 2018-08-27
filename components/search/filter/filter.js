Component({
  data: {
    isFoldClass: "fold"
  },
  methods: {

    //监听子元素触发的搜索事件
    handleSearch(e) {
      console.log(e);
    },

    //点击关闭筛选面板
    close() {
      this.triggerEvent("close", { val: 1});
    }
  }
})