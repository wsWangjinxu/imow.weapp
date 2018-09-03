import { wxRequest } from "../../utils/http";

var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//获得订单支付详情
function getPayDetail(type, data) {
  return wxRequest({
    url: baseUrl + "order/payment/detail",
      data: data,
      type: type
  });
}

export { getPayDetail}