import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//获取地址列表
function getAddressList(type, data) {
  return wxRequest({
    url: baseUrl + "getAddressList",
      data: data,
      type: type
  });
}


//获取需要修改的地址
function getUpdateAddress(type, data) {
  return wxRequest({
    url: baseUrl + "getUpdateAddress",
      data: data,
      type: type
  });
}

//删除一条地址
function deleteAddress(type, data) {
  return wxRequest({
    url: baseUrl + "deleteAddress",
      data: data,
      type: type
  });
}

//新增一条地址 && 保存修改的地址
function addAddress(type, data) {
  return wxRequest({
    url: baseUrl + "addAddress",
      data: data,
      type: type
  });
}

export { getAddressList, getUpdateAddress, deleteAddress, addAddress }