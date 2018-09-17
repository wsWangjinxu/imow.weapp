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


//获取双十一专属优惠券
function getSuperGroupBuy(type, data) {
  return wxRequest({
    url: baseUrl + "/special/getSuperGroupBuy",
      data: data,
      type: type
  });
}

//领取优惠券
function getDiscountCoupon(type, data) {
  return wxRequest({
    url: baseUrl + "/getDiscountCoupon",
      data: data,
      type: type
  });
}



export { getPlatformDiscountCoupon, 
  getShopDiscountCoupon, 
  getDiscountCoupon }