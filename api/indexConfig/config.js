import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//获取首页轮播图的内容
function getBannerItemList(type, data) {
  return wxRequest({
    url: baseUrl + "getBannerItemList",
      data: data,
      type: type
  });
}

//获取首页的原型导航的内容
function getNavList(type, data) {
  return wxRequest({
    url: baseUrl + "weapp_getNavList",
      data: data,
      type: type
  });
}

//获取首页的广告位信息
function getAD(type, data) {
  return wxRequest({
    url: baseUrl + "weapp_getAD",
      data: data,
      type: type
  });
}

//获取首页tab的内容
function getTabCtn(type, data) {
  return wxRequest({
    url: baseUrl + "weapp_getTabCtn",
      data: data,
      type: type
  });
}



export { getBannerItemList, getNavList, getAD, getTabCtn }