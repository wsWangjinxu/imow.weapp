Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleAdd() {
      console.log(this.data.ctn.id);
      this.triggerEvent("showSku", {id: this.data.ctn.id} );
    }
  }
})