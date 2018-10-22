import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";


//获取店铺详情内容
function getRank() {
  return wxRequest({
    url: baseUrl + "promotion/statistic",
      type: 'GET'
  });
}



export { getRank }