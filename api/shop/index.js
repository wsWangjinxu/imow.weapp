import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

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