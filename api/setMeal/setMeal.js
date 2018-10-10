import { wxRequest } from "../../utils/http";

//var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";
var baseUrl = 'http://10.10.10.120:3667/';

//获取套餐详情
function getPromotionPackage(type, data) {
  return wxRequest({
    url: baseUrl + "promotion/package",
      data: data,
      type: type
  });
}

//加入购物车
function cartGroupPurchaseAdd(type, data) {
  return wxRequest({
    url: baseUrl + "cart/groupPurchase/add",
    data: data,
    type: type
  });
}

export { getPromotionPackage, cartGroupPurchaseAdd }