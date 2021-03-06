import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";


//获取用户的购物车
function getUserCart(type, data) {
  return wxRequest({
    url: baseUrl + "cart/get",
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

//购物车下单信息确认(从拼团快速下单来)
function getOrderConfirmCart4(type, data) {
  return wxRequest({
    url: baseUrl + "cart/get/shopId",
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

//清除店铺中的失效产品
function removeUnActive(type, data) {
  return wxRequest({
    url: baseUrl + "cart/removeUnActive",
      data: data,
      type: type
  });
}

export { getUserCart, 
  changeNum, 
  getOrderConfirmCart1, 
  getOrderConfirmCart2, 
  getOrderConfirmCart3, 
  getOrderConfirmCart4,
  getCartShopList, 
  getShopCart, 
  addCart, 
  removeCart,
  removeUnActive }