Component({
  properties: {
    skuCode: {
      type: String,
      value: "05FGTD"
    },
    skuId: {
      type: String,
      value: "010124"
    }
  },
  data: {
    borderColor: '#333',
    color: 'black'
  },
  methods: {
    changeColor(){
     if(this.data.color == "black") {
       this.setData({
         borderColor: '#fe0000',
         color: '#fe0000'
       });
     } else {
       this.setData({
         borderColor: '#333',
         color: 'black'
       })
     }
    }
  }
})