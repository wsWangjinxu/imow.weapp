import { wxRequest } from "../../utils/http";

var baseUrl = 'http://10.10.10.120:3667/';
//var baseUrl = "http://localhost:6569/";

//获取自提点
function getSelfPickAddress(type, data) {
  return wxRequest({
    url: baseUrl + "getSelfPickAddress",
      data: data,
      type: type
  });
}

//手机下单规格页产品详情
function getProductSkus(type, data) {
  return wxRequest({
    url: baseUrl + "product/detail/productSkus",
      data: data,
      type: type
  });
}





export { getSelfPickAddress, getProductSkus }