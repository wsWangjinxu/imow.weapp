import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//获取请求二维码的接口凭证
function getAccessToken(type, data) {
  return wxRequest({
    url: "https://api.weixin.qq.com/cgi-bin/token",
      data: data,
      type: type
  });
}

//获取店铺产品信息
function getQRCard(type, data) {
  return wxRequest({
    url: baseUrl + "getQRCard",
      data: data,
      type: type
  });
}

//获取店铺产品信息
function getShopInfo(type, data) {
  return wxRequest({
    url: baseUrl + "getShopInfo",
      data: data,
      type: type
  });
}


export { getAccessToken,
  getQRCard,
  getShopInfo }