import {getPlatformDiscountCoupon, getShopDiscountCoupon} from "../../api/coupon/coupon";

Page({
  data: {
    list: [
      {
        id: 101,
        title: "阿母优惠券"
      },
      {
        id: 102,
        title: "店铺优惠券"
      }
    ],
    selectedId: 102,
    list2: [
      {
        id: 101,
        title: "未使用"
      },
      {
        id: 102,
        title: "已使用"
      },
      {
        id: 103,
        title: "已过期"
      }
    ],
    selectedId2: 101
  },
  onLoad() {
    //获取用户的平台优惠券
    getPlatformDiscountCoupon("POST").then(res => {
      console.log(res.data.list)
      this.setData({
        coupon: res.data.list
      });
    });

    //获取用户的店铺优惠券
    getShopDiscountCoupon("POST").then(res => {
      this.setData({
        shopCoupon: res.data.list
      });
    });
  },

  handleTabChange(e) {
    this.setData({
      selectedId: e.detail
    });
    if(e.detail == "101") {
      getPlatformDiscountCoupon("POST").then(res => {
        this.setData({
          coupon: res.data.list
        });
      });
    } else {
      getShopDiscountCoupon("POST").then(res => {
        this.setData({
          shopCoupon: res.data.list
        });
      });
    }
  }
})
