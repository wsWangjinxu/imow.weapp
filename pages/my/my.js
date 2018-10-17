import {
  userLogin,
  getThirdSession
} from "../../api/user/manage"

Page({
  data: {
    array: ['全部明细', '支付明细'],
    index: 0,
    showLogin: true,
    nickname: "",
    avatarUrl: "",
    isLogin: true,
    account: "",
    password: ""
  },



  onLoad() {
    //flag用来标识Page页面的onLoad是否先于app.js中异步的执行
    //这种情况用于用户已经在服务器上边绑定了阿母账号，如果没有绑定阿母账号，则获取缓存isLogin为false
    // if (app.globalData.flag === "-1") {
    //   //此条件用于page的onLoad方法先于app请求数据的回调执行
    //   let that = this;
    //   app.callback = function () {
    //     let isLogin = wx.getStorageSync("isLogin");
    //     //判断用户已经在平台上绑定微信账号，则记录登陆状态，显示我的页面，并获取头像和昵称
    //     if (isLogin) {
    //       //登陆成功以后获取用户的微信昵称和头像
    //       this.getUserWXInfo();

    //       //设置登陆状态
    //       that.setData({
    //         isLogin: isLogin
    //       });
    //     }
    //   }
    // } else {
    let isLogin = wx.getStorageSync("isLogin");
    //判断用户已经在平台上绑定微信账号，则记录登陆状态，显示我的页面，并获取头像和昵称
    if (isLogin) {
      let _this = this;
      wx.showLoading({
        title: '玩命加载中'
      });
      //登陆成功以后获取用户的微信昵称和头像
      this.getUserWXInfo(function () {
        //设置登陆状态
        wx.hideLoading();
      });
    } else {
      this.setData({
        isLogin: false
      }, function() {
        wx.hideLoading();
      })
    }
    // }
  },

  login() {
    wx.showLoading({
      title: '玩命加载中'
      // mask: 'true'
    });
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
              console.log(res);
              if (res.data.userInfo.token) {
                //登陆成功，设置缓存
                wx.setStorageSync("session", res.data.userInfo.token);
                wx.setStorageSync("isLogin", true);

                //获取用户的头像和昵称
                _this.getUserWXInfo(
                  function () {
                    wx.hideLoading();
                    _this.setData({
                      isLogin: true
                    });
                  }
                );
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: res.data.message,
                  image: "/static/icons/warning-white.png"
                });
              }
            });
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '获取code失败',
              image: '/static/icons/warning-white.png'
            })
            console.log("登陆失败！" + res.errMsg);
          }
        },
        fail() {
          wx.hideLoading();
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

  //获取用户的微信信息，头像和昵称
  getUserWXInfo(complete) {
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        let tempData = res.rawData;
        //数据转换
        tempData = JSON.parse(tempData);
        that.setData({
          nickname: tempData.nickName,
          avatarUrl: tempData.avatarUrl
        })
      },
      fail: function (err) {
        wx.showToast({
          title: "获取信息出错",
          image: "/static/icons/warning-white.png"
        })
      },
      complete
    })
  },

})