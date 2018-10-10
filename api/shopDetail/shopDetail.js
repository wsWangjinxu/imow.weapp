import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";


//获取店铺详情内容
function getShopDetail(type, data) {
  return wxRequest({
    url: baseUrl + "getShopDetailInfo",
      data: data,
      type: type
  });
}



export { getShopDetail }