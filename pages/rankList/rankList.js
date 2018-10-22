import { getRank } from "../../api/special/rank";

Page({
  onLoad(option) {
    getRank().then(res=>{
      this.setData({
        promotionStatisticResult: res.data.promotionStatisticResult
      })
    })
  }
})
