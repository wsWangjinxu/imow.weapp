import {
  userLogin,
  getThirdSession
} from "../../api/user/manage"

let app = getApp();

Page({
  data: {
    array: ['全部明细', '支付明细'],
    index: 0,
    showLogin: true,
    nickname: "",
    avatarUrl: "",
    isLogin: false,
    account: "",
    password: ""
  },

  onLoad() {
    console.log(app.globalData.imgSrc)
    //这种情况用于用户已经在服务器上边绑定了阿母账号，如果没有绑定阿母账号，则获取缓存isLogin为false
    if (!app.globalData.imgSrc) {
      //此条件用于page的onLoad方法先于app请求数据的回调执行
      let that = this;
      app.callback = function () {
        let isLogin = wx.getStorageSync("isLogin");
        console.log(app.globalData);
        //判断用户已经在平台上绑定微信账号，则记录登陆状态，显示我的页面，并获取头像和昵称
        if (isLogin) {
          that.setData({
            isLogin: isLogin,
            nickname: app.globalData.nickname,
            avatarUrl: app.globalData.imgSrc,
            shopId: app.globalData.shopId
          });
          console.log(this.data.shopId);
        }
      }
    } else {
      let isLogin = wx.getStorageSync("isLogin");
      console.log(isLogin);
      console.log(app.globalData.shopId);
      //判断用户已经在平台上绑定微信账号，则记录登陆状态，显示我的页面，并获取头像和昵称
      if (isLogin) {
        this.setData({
          isLogin: isLogin,
          nickname: app.globalData.nickname,
          avatarUrl: app.globalData.imgSrc,
          shopId: app.globalData.shopId
        });
      }
    }
  },

  login() {
    let account = this.data.account;
    let password = this.data.password;
    let _this = this;
    if (account && password) {
      wx.login({
        timeout: "5000",
        success(res) {
          if (res.code) {
            userLogin("POST", {
              code: res.code,
              account,
              password
            }).then(res => {
              if (res.data.userInfo.token) {
                //设置缓存
                wx.setStorageSync("session", res.data.userInfo.token);
                wx.setStorageSync("isLogin", true);
                console.log(res);
                _this.setData({
                  isLogin: true,
                  isSeller: res.data.isSeller
                });
              } else {
                wx.showToast({
                  title: res.data.message,
                  image: "/static/icon/warning-white.png"
                });
              }
            });
          } else {
            console.log("登陆失败！" + res.errMsg);
          }
        },
        fail() {
          console.log("登陆时网络错误");
        }
      });
    } else {
      wx.showToast({
        title: "账号密码不能为空",
        image: "/static/icon/warning-white"
      })
    }
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
    });
  },

  //进入会员信息

})