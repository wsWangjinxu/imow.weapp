import { getAddressList } from "../../api/user/address";

//获取应用实例
const app = getApp()
Page({
  data: {
    addressList: ""
  },
  onLoad: function () {
    let that = this;
    //获取地址列表
    getAddressList("POST").then(res=>{
      that.setData({
        addressList: res.data.AddressList
      });
    });
  }
})
