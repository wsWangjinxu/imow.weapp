

Component({
  properties: {
    isOpen: {
      type: Boolean,
      value: true
    },
    bgUrl: {
      type: String,
      value: ""
    },
    profile: {
      type: String,
      value: ""
    }
  },

  methods: {
    ringUp() {
      if(this.data.isOpen) {
        this.triggerEvent("ringUp");
      }
    },

    //触发说明
    explain() {
      this.triggerEvent("explain");
    }


  }
  
});