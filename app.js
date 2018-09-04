import { getThirdSession } from "./api/user/manage"

App({
  onLaunch: function () {
    //检测用户是否已经在服务器绑定账号，如果绑定账号，默认状态为已经登陆
    let that = this;
    wx.login({
      success(res) {
        if(res.code) {
          getThirdSession("POST", {
            code: res.code
          }).then(res => {
            console.log(res.data.session);
            if(res.data.session) {
              //如果session有值说明已经登陆成功，设置登陆状态，并写入缓存
              wx.setStorageSync("session", res.data.session);
              wx.setStorageSync("isLogin", true);
            }
          })
        }
      }
    })
  }
})