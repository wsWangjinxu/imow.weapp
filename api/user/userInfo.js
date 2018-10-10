import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";

//获取地址列表
function getUserInfo(type, data) {
  return wxRequest({
    url: baseUrl + "getUserInfo",
      data: data,
      type: type
  });
}


export { getUserInfo }