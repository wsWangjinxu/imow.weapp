import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";

//获取产品详情
function getCartNum(type, data) {
  return wxRequest({
    url: baseUrl + "getCartNum",
      data: data,
      type: type
  });
}


export { getCartNum}