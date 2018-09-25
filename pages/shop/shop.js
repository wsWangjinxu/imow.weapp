import { getFactoryBanner, getFactoryProductPaneList, getShopInfo } from "../../api/shop/index";


Page({
  onLoad(option) {
    //获取店铺id
    let id = option.shopId;
    this.setData({ id });
    getFactoryBanner("GET", { id }).then(res => { 
      this.setData({
        bannerImageList: res.data.bannerImgList
      })
    });

    //获取店铺产品
    getFactoryProductPaneList("GET", { id }).then(res => {
      this.setData({
        paneList: res.data.factoryProductPaneList
      });
    });

    //获取店铺简易信息
    getShopInfo("GET", { id }).then(res => {
      this.setData({
        shopInfo: res.data
      });
    });
  }
});
