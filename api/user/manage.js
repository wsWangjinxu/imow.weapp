import { wxRequest } from "../../utils/http";


var baseUrl = "http://localhost:6569/";

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