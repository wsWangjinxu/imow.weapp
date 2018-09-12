

Component({
  properties: {
    //是否已经开团，开团了可以拨打电话，不开团不能拨打电话
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
    },
    //是否可以分享
    hasShare: {
      type: Boolean,
      value: false
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