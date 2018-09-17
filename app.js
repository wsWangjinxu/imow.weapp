import { getThirdSession } from "./api/user/manage"

App({
  onLaunch: function () {
    //检测用户是否已经在服务器绑定账号，如果绑定账号，默认状态为已经登陆
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          getThirdSession("POST", {
            code: res.code
          }).then(res => {
            if (res.data.session) {
              console.log(res.data.session);
              //如果session有值说明已经登陆成功，设置登陆状态，并写入缓存
              wx.setStorageSync("session", res.data.session);
              wx.setStorageSync("isLogin", true);
              that.globalData.nickname = res.data.nickname;
              that.globalData.imgSrc = res.data.imgSrc;
              that.globalData.shopId = res.data.shopId;
              if (that.callback) {
                that.callback();
              }
            } else {
              //没有获取到session的时候，取消原有的登陆状态
              wx.setStorageSync("isLogin", false);
            }
          });
        }
      }
    })
  },

  globalData: {
    nickname: "岁月不好",
    imgSrc: "",
    shopId: false
  }

})