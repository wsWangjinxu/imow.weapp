Component({
  properties: {
    text: {
      type: String,
      value: ""
    },
    currentSku: {
      type: String,
      value: "",
      observer: function (val) {
        let borderColor;
        let color;
        if (this.data.text == val) {
          borderColor = '#fe0000';
          color = '#fe0000'
        } else {
          borderColor = '#333';
          color = 'black'
        }
        this.setData({
          borderColor,
          color
        });
      }
    }
  },
  data: {
    borderColor: '#333',
    color: 'black'
  },
  methods: {
    handletap() {
      // 通知父组件选中了这个sku
      this.triggerEvent("handleSku", {
        skuCode: this.data.text
      });
    }
  }
});