Component({
  properties: {
    ctn: {
      type: Object,
      value: {},
      observer(val) {
        let num = 0;
        if(val.superGroupProductSkus){
          for(let i = 0; i < val.superGroupProductSkus; i++) {
            num = num + val.superGroupProductSkus[i].number;
          }
        }

        this.setData({
          num
        })
      }
    }
  },
  data: {
    num: 0
  },
  methods: {
    //打开选规格的弹层
    handleAdd() {
      this.triggerEvent("showSku", {num: this.data.num} );
    },

    //跳转到申请开团页面
    handleGroupBuy() {  
      let promotionId = this.data.ctn.promotionId;
      let productId = this.data.ctn.id;
      wx.navigateTo({
        url: '/pages/groupBuy/startGroupBuy/startGroupBuy?promotionId=' + promotionId + '&productId=' + productId
      })
    },

    handleMeal() {
      let promotionId = this.data.ctn.promotionId;
      wx.navigateTo({
        url: '/pages/setMeal/setMeal?promotionId=' + promotionId
      })
    }
  }
})