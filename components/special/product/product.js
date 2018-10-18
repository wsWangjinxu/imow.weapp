
import {
  GetCanCollage
} from "../../../api/special/index";

Component({
  properties: {
    canCollage:{
      type: Boolean
    },
    
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
  
  methods: {
    //打开选规格的弹层
    handleAdd() {
      this.triggerEvent("showSku", {
        superGroupProductSkus: this.data.ctn.superGroupProductSkus,
        productId:this.data.ctn.id,
        promotionId:this.data.ctn.promotionId
      } );
    },

    //跳转到申请开团页面
    handleGroupBuy() {  
      let promotionId = this.data.ctn.promotionId;
      let productId = this.data.ctn.id;

      GetCanCollage().then(res => {
        let url = res.data.canCollage?'/pages/groupBuy/startGroupBuy/startGroupBuy?promotionId=' + promotionId + '&productId=' + productId:
        '/pages/beTeamLeader/beTeamLeader';
        wx.navigateTo({
          url: url
        })
      });

      
    },

    handleMeal() {
      let promotionId = this.data.ctn.promotionId;
      wx.navigateTo({
        url: '/pages/setMeal/setMeal?id=' + promotionId
      })
    }
  }
})