Component({
  properties: {
    ctn: {
      type: Object,
      value: {
        name: "中力",
        id: 101
      }
    },
    isActive: {
      type: Boolean,
      value: false
    }
  },
  data: {
    textClass: "normal"
  },
  methods: {
    handleTap() {
      let status = this.data.textClass;
      let id = this.data.ctn.id;
      let name = this.data.ctn.name;
      if(status==="normal") {
        this.setData({
          textClass: "active"
        });
        this.triggerEvent("search", {id: id,name:name});
      } else {
        this.setData({
          textClass: "normal"
        });
        this.triggerEvent("cancel", {id: id,name:name});
      }
    }
  }
})