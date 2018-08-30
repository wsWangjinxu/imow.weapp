import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

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

//购物车下单信息确认
function getOrderConfirmCart(type, data) {
  return wxRequest({
    url: baseUrl + "cart/get/cartIds",
      data: data,
      type: type
  });
}

export { getUserCart, changeNum, getOrderConfirmCart }