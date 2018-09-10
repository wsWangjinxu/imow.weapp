import { wxRequest } from "../../utils/http";

var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//获取产品详情
function getProductDetail(type, data) {
  return wxRequest({
    url: baseUrl + "product/detail",
      data: data,
      type: type
  });
}

//获取产品sku详情
function getproductSkus(type, data) {
  return wxRequest({
    url: baseUrl + "product/detail/productSkus",
    data: data,
    type: type
  });
}

//加入购物车
function addCart(type, data) {
  return wxRequest({
    url: baseUrl + "cart/add",
    data: data,
    type: type
  });
}

//获取优惠券列表
function getFactoryDiscountCouponList(type, data) {
  return wxRequest({
    url: baseUrl + "coupon/get",
    data: data,
    type: type
  });
}

//领取优惠券
function getDiscountCoupon(type, data) {
  return wxRequest({
    url: baseUrl + "getDiscountCoupon",
    data: data,
    type: type
  });
}


export { getProductDetail, addCart, getFactoryDiscountCouponList, getDiscountCoupon, getproductSkus}