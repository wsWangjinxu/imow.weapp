Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    },
    num: {
      type: Number,
      value: -1
    }
  },
  methods: {
    handleAdd() {
      this.triggerEvent("showSku", {num: this.data.num} );
    }
  }
})