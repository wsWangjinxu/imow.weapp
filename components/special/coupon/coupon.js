

Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    }
  },

  methods: {
    handletap(e) {
      let id = e.currentTarget.dataset.id;
      console.log(id);
    }
  }
})