import { wxRequest } from "../../utils/http";


var baseUrl = "http://localhost:6569/";

//获取地址列表
function getUserInfo(type, data) {
  return wxRequest({
    url: baseUrl + "getUserInfo",
      data: data,
      type: type
  });
}


export { getUserInfo }