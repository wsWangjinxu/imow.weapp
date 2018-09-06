import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//获取用户的平台优惠券
function getPlatformDiscountCoupon(type, data) {
  return wxRequest({
    url: baseUrl + "getPlatformDiscountCoupon",
      data: data,
      type: type
  });
}

//获取用户的店铺优惠券
function getShopDiscountCoupon(type, data) {
  return wxRequest({
    url: baseUrl + "getShopDiscountCoupon",
      data: data,
      type: type
  });
}




export { getPlatformDiscountCoupon, getShopDiscountCoupon }