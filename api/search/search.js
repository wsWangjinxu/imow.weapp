import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

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

//获取城市列表
function getCities(type, data) {
  return wxRequest({
    url: baseUrl + "getCities",
      data: data,
      type: type
  });
}


export { searchHistory, hotSearch, getProductList, getCities }