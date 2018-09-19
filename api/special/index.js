import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//获取轮播图信息
function getSwipers(type, data) {
  return wxRequest({
    url: baseUrl + "/special/getSwipers",
      data: data,
      type: type
  });
}

//获取优惠券信息
function getCoupons(type, data) {
  return wxRequest({
    url: baseUrl + "/special/getCoupons",
      data: data,
      type: type
  });
}


//获取热销榜产品
function getHotProduct(type, data) {
  return wxRequest({
    url: baseUrl + "/special/getHotProduct",
      data: data,
      type: type
  });
}

//获取店铺列表
function getShopList(type, data) {
  return wxRequest({
    url: baseUrl + "/special/getShopList",
      data: data,
      type: type
  });
}

//获取产品列表
function getProductList(type, data) {
  return wxRequest({
    url: baseUrl + "/special/getProductList",
      data: data,
      type: type
  });
}

//获取产品列表
function getSuperGroupBuy(type, data) {
  return wxRequest({
    url: baseUrl + "/special/getSuperGroupBuy",
      data: data,
      type: type
  });
}


export { 
  getSwipers, 
  getCoupons, 
  getSuperGroupBuy, 
  getHotProduct, 
  getShopList,
  getProductList }