import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";

//获取首页轮播图的内容
function getBannerItemList(type, data) {
  return wxRequest({
    url: baseUrl + "getBannerItemList",
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

//获取首页tab的内容
function guessYourFavorite(type, data) {
  return wxRequest({
    url: baseUrl + "guessYourFavorite",
      data: data,
      type: type
  });
}

//获取首页tab的内容
function getFloorList(type, data) {
  return wxRequest({
    url: baseUrl + "getFloorList",
      data: data,
      type: type
  });
}



export { getBannerItemList, getAD, getTabCtn, guessYourFavorite, getFloorList }