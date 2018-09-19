Component({
  properties: {
    text: {
      type: String,
      value: ""
    },
    color: {
      type: String,
      value: "333"
    },
    types: {
      type: String,
      value: ""
    }
  },
  data: {
    borderColor: '#333',
    color: 'black'
  },
  methods: {
    handletap() {
      this.setData({
        borderColor: '#fe0000',
        color: '#fe0000'
      });
      //触发点击的事件
      let type = this.data.types;
      console.log(type);
      if (type == 'sku') {
        this.triggerEvent("handleSku", { skuCode: this.data.text });
      } else {
        this.triggerEvent("handleTime", { time: this.data.text });
      }
    }
  }
});