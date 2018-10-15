import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";

//获取搜索历史
function searchHistory(type, data) {
  return wxRequest({
    url: baseUrl + "weapp_searchHistory",
      data: data,
      type: type
  });
}

//获取热门搜索关键字
function hotSearch(type, data) {
  return wxRequest({
    url: baseUrl + "getHotPoint",
      data: data,
      type: type
  });
}

//产品搜索
function getProductList(type, data) {
  return wxRequest({
    url: baseUrl + "search/productList",
      data: data,
      type: type
  });
}

//店铺搜索
function getShopList(type, data) {
  return wxRequest({
    url: baseUrl + "/search/shopList",
      data: data,
      type: type
  });
}

//获取城市列表
function getCities(type, data) {
  return wxRequest({
    // url: baseUrl + "getCities",
    url: "http://10.10.10.230:8052/" + "getCities",
      data: data,
      type: type
  });
}


export { searchHistory, hotSearch, getProductList, getShopList, getCities }