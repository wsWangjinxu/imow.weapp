import { wxRequest } from "../../utils/http";


var baseUrl = "http://localhost:6569/";

//获取地址列表
function getInvoiceInfo(type, data) {
  return wxRequest({
    url: baseUrl + "getInvoiceInfo",
      data: data,
      type: type
  });
}


export { getInvoiceInfo }