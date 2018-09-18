Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    },
    num: {
      type: Number,
      value: 10
    }
  },
  methods: {
    handleAdd() {
      console.log(this.data.ctn.id);
      this.triggerEvent("showSku", {id: this.data.ctn.id} );
    }
  }
})