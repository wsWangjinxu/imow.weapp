Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleAdd() {
      this.triggerEvent("showSku", {id: this.data.ctn.id} );
    }
  }
})