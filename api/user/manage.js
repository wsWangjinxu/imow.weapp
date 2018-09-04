import { wxRequest } from "../../utils/http";


var baseUrl = "http://mock.eolinker.com/3FyelRg5d3c637ba0bb45244f85ed68d2b8bd1f8c65c055?uri=";

//用户登陆
function userLogin(type, data) {
  return wxRequest({
    url: baseUrl + "userLogin",
      data: data,
      type: type
  });
}

//获取第三方session
function getThirdSession(type, data) {
  return wxRequest({
    url: baseUrl + "getThirdSession",
      data: data,
      type: type
  });
}


export { userLogin, getThirdSession }