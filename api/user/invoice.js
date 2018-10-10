import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";


//获取地址列表
function getInvoiceInfo(type, data) {
  return wxRequest({
    url: baseUrl + "getInvoiceInfo",
      data: data,
      type: type
  });
}


export { getInvoiceInfo }