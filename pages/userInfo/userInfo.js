import {getUserInfo} from "../../api/user/userInfo";


const app = getApp()

Page({
  data: {
    
  },
  oLoad() {
    getUserInfo("POST").then(res=>{
      console.log(res);
    })

  }
})
