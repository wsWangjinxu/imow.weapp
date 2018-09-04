import { userLogin, getThirdSession } from "../../api/user/manage"

Page({
  data: {
    array: ['全部明细','支付明细'],
    index: 0,
    showLogin: true,
    nickName: "",
    avatarUrl: "",
    isLogin: false,
    account: "",
    password: ""
  },

  onLoad() {
    let isLogin = wx.getStorageSync("isLogin");
    console.log(isLogin);
    if(isLogin) {
      this.setData({
        isLogin: isLogin
      });
    }
  },

  login() {
    let account = this.data.account;
    let password = this.data.password;
    wx.login({
      timeout: "5000",
      success(res) {
        if(res.code) {
          userLogin("POST", {
            code: res.code,
            account,
            password
          }).then(res => {
            //设置缓存
            wx.setStorageSync("session", res.data.session);
          });
          //获取用户的数据

        } else {
          console.log("登陆失败！" + res.errMsg);
        }
      },
      fail() {
        console.log("登陆时网络错误");
      }
    })
    wx.setStorageSync("isLogin", true);
    this.setData({
      isLogin: true
    });

    console.log("account" + this.data.account);
    console.log("password" + this.data.password);
  },

  //更新用户的账户信息
  handleAccount(e) {
    this.setData({
      account: e.detail.value
    });
  },

  //更新用户的密码信息
  handlePassword(e) {
    this.setData({
      password: e.detail.value
    })
  }
})
