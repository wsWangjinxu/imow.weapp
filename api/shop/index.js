import { wxRequest } from "../../utils/http";


var baseUrl = "http://localhost:6569/";

//获取店铺轮播图产品
function getFactoryBanner(type, data) {
  return wxRequest({
    url: baseUrl + "getFactoryBanner",
      data: data,
      type: type
  });
}

//获取店铺产品信息
function getFactoryProductPaneList(type, data) {
  return wxRequest({
    url: baseUrl + "getFactoryProductPaneList",
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


export { getFactoryBanner,
  getFactoryProductPaneList,
  getShopInfo }