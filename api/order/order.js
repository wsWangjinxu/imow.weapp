import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";

//新增一张订单
function addOrder(type, data) {
  return wxRequest({
    url: baseUrl + "order/add",
      data: data,
      type: type
  });
}

//获取当前用户的订单列表
function getOrderList(type, data) {
  return wxRequest({
    url: baseUrl + "get/orders",
      data: data,
      type: type
  });
}

//获取订单明细
function getOrderDetail(type, data) {
  return wxRequest({
    url: baseUrl + "order/detail",
      data: data,
      type: type
  });
}

//获取订单日志明细
function getOrderLog(type, data) {
  return wxRequest({
    url: baseUrl + "order/log",
      data: data,
      type: type
  });
}


export { addOrder, getOrderList, getOrderDetail, getOrderLog }