import {
  getThirdSession
} from "./api/user/manage"

App({
  onLaunch: function () {
    // wx.showLoading({
    //   title: '玩命加载中',
    //   mask: 'true',
    //   complete() {
    //     wx.hideTabBar({});
    //   }
    // });
    let session = wx.getStorageSync("session");
    console.log(session);

    //有session，说明已经登陆
    if (session) {
      wx.setStorageSync("isLogin", true);
      // wx.hideLoading({
      //   complete() {
      //     wx.showTabBar({});
      //   } 
      // });
    } else {
      //没有session, 检测用户是否已经在服务器绑定账号，如果绑定账号，默认状态为已经登陆
      let that = this;
      wx.login({
        success(res) {
          if (res.code) {
            getThirdSession("GET", {
              code: res.code
            }).then(res => {
              if (res.data) {
                //如果session有值说明已经登陆成功，设置登陆状态，并写入缓存
                wx.setStorageSync("session", res.data.session);
                wx.setStorageSync("isLogin", true);
              } else {
                //没有获取到session的时候，取消原有的登陆状态
                wx.setStorageSync("isLogin", false);
              }

              wx.hideLoading({
                complete() {
                  wx.showTabBar({});
                }
              });
            }).catch(err => {
              console.log("网络错误");
            });
          }
        }
      })
    }
  }
})