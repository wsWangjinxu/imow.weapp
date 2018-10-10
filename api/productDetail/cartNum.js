import { wxRequest } from "../../utils/http";

var baseUrl = 'http://10.10.10.120:3667/';
//var baseUrl = "http://localhost:6569/";

//获取产品详情
function getCartNum(type, data) {
  return wxRequest({
    url: baseUrl + "cart/get",
      data: data,
      type: type
  });
}


export { getCartNum}