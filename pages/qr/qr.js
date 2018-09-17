import {getAccessToken} from "../../api/qr/index";

Page({
  onLoad(option) {
    console.log(option);
    let id = option.shopId;

    //拿到id，并生成二维码
    let  client_credential =  "";
    let appId = "wxab42392293118c4d";
    let appSecret = "74410ebaf789efc2aad9aea6ed817b54";
    getAccessToken("GET", {client_credential,appId,appSecret}).then(res => {
      console.log(res);
      if(res.data.access_token) {
        //说明获取到了接口的调用凭证

      }
    })
  }
})
