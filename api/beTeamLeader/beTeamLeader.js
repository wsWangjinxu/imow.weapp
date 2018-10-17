import { wxRequest } from "../../utils/http";
import { baseUrl } from "../baseUrl.js";

//申请团长表单
function addHeadGroup(type, data) {
  return wxRequest({
    url: baseUrl + "addHeadGroup",
      data: data,
      type: type
  });
}

export { addHeadGroup }