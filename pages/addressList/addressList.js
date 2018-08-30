import { getAddressList } from "../../api/user/address";

//获取应用实例
const app = getApp()
Page({
  data: {
    addressList: ""
  },
  onShow() {
    //获取地址列表
    getAddressList("POST").then(res=>{
      this.setData({
        addressList: res.data.AddressList
      });
    });
  },

  //处理用户点击地址列表
  handleTap(e) {
    console.log(e);
    //获取选择的地址的id
    let addrId = e.currentTarget.dataset.id;
    //将id存入缓存中

    console.log(addrId);
    wx.setStorageSync("addrId", addrId);
    wx.navigateBack({
      delta: 1
    });
  }
})
