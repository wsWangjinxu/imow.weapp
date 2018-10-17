import { wxRequest } from "../../utils/http";

import { baseUrl } from "../baseUrl.js";

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