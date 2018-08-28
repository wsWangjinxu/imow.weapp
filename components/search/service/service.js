Component({
  data: {
    service:[
      {
        name: "定金",
      },
      {
        name: "阿母币"
      },
      {
        name: "信用分"
      }
    ],
    selectedService: []
  },
  methods: {
    handleService(e) {
      //将选中服务选项放到已选服务的数组中
      let tempSelectedService = this.data.selectedService;
      tempSelectedService.push(e.detail.name);
      this.setData({
        selectedService: tempSelectedService
      });
      //这里触发搜索事件
      this.search();
    },
    handleCancelService(e) {
      //将取消的服务选项从已选服务的数组中取消
      let tempSelectedService = this.data.selectedService;
      let index = tempSelectedService.indexOf(e.detail.name);
      tempSelectedService.splice(index, 1);
      this.setData({
        selectedService: tempSelectedService
      });
      //这里触发搜索事件
      this.search();
    },
    search() {
      let data = {};
      let temp = this.data.selectedService;
      if(~temp.indexOf("定金")) {
        data.useEarnest = true;
      }
      if(~temp.indexOf("信用分")) {
        data.useCrePoint = true;
      }
      if(~temp.indexOf("阿母币")) {
        data.useImb = true;
      }
      //触发服务的搜索事件
      this.triggerEvent("search", data);
    }
  }
})