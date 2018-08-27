import { getUserInfo } from "../../api/user/userInfo";

const app = getApp()
Page({
  data: {
    userInfo: ""
  },
  onLoad() {
    getUserInfo("POST").then(res=>{
      console.log(res);
      this.setData({
        userInfo: res.data
      })
    })
  }
})
