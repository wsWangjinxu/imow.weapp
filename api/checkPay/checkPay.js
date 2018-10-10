import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";

//获得订单支付详情
function getPayDetail(type, data) {
  return wxRequest({
    url: baseUrl + "order/payment/detail",
      data: data,
      type: type
  });
}

//验证密码
function chechPwd(type, data) {
  return wxRequest({
    url: baseUrl + "password/validate",
      data: data,
      type: type
  });
}

//提交支付请求
function submitPayment(type, data) {
  return wxRequest({
    url: baseUrl + "order/submitPayment",
      data: data,
      type: type
  });
}

export { getPayDetail,chechPwd,submitPayment }