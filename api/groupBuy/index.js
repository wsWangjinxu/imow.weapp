import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//获取拼团的信息
function getGroupBuyInfo(type, data) {
  return wxRequest({
    url: baseUrl + "getGroupBuyInfo",
      data: data,
      type: type
  });
}

//申请开团
function groupBuyApply(type, data) {
  return wxRequest({
    url: baseUrl + "groupBuyApply",
      data: data,
      type: type
  });
}

//参与拼团
function joinGroupBuy(type, data) {
  return wxRequest({
    url: baseUrl + "joinGroupBuy",
      data: data,
      type: type
  });
}

//获取已经拼团的信息
function getJoinedDetailList(type, data) {
  return wxRequest({
    url: baseUrl + "getJoinedDetailList",
      data: data,
      type: type
  });
}

//获取拼团的sku列表
function getGroupBuySku(type, data) {
  return wxRequest({
    url: baseUrl + "getGroupBuySku",
      data: data,
      type: type
  });
}




export { getGroupBuyInfo, groupBuyApply, joinGroupBuy, getGroupBuySku, getJoinedDetailList }