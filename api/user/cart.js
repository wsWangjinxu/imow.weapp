import { wxRequest } from "../../utils/http";


var baseUrl = "http://localhost:6569/";

//获取用户的购物车
function getUserCart(type, data) {
  return wxRequest({
    url: "http://result.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=" + "cart/get",
      data: data,
      type: type
  });
}

//修改购物车数量
function changeNum(type, data) {
  return wxRequest({
    url: baseUrl + "cart/changeNum",
      data: data,
      type: type
  });
}

//购物车下单信息确认(从购物车来)
function getOrderConfirmCart1(type, data) {
  return wxRequest({
    url: baseUrl + "cart/get/cartIds",
      data: data,
      type: type
  });
}

//购物车下单信息确认(从定金产品来)
function getOrderConfirmCart2(type, data) {
  return wxRequest({
    url: baseUrl + "cart/get/skuId",
      data: data,
      type: type
  });
}

//购物车下单信息确认(从拼团快速下单来)
function getOrderConfirmCart3(type, data) {
  return wxRequest({
    url: baseUrl + "cart/get/collageId",
      data: data,
      type: type
  });
}

//获取购物车中的店铺列表
function getCartShopList(type, data) {
  return wxRequest({
    url: baseUrl + "weapp_getCartShopList",
      data: data,
      type: type
  });
}

//获取对应店铺id的产品
function getShopCart(type, data) {
  return wxRequest({
    url: baseUrl + "weapp_getShopCart",
      data: data,
      type: type
  });
}

//新增购物车
function addCart(type, data) {
  return wxRequest({
    url: baseUrl + "cart/add",
      data: data,
      type: type
  });
}

//删除购物车中的内容
function removeCart(type, data) {
  return wxRequest({
    url: baseUrl + "cart/remove",
      data: data,
      type: type
  });
}

export { getUserCart, changeNum, getOrderConfirmCart1, getOrderConfirmCart2, getOrderConfirmCart3, getCartShopList, getShopCart, addCart, removeCart }