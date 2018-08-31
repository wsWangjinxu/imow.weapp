import { getAddressList } from "../../api/user/address";

Page({
  data: {
    addressList: "",
    status: ""
  },

  onLoad(option) {
    this.setData({status: option.status});
  },

  onShow() {
    //每一次页面显示都获取地址列表，并渲染到页面上
    getAddressList("POST").then(res=>{
      this.setData({
        addressList: res.data.AddressList
      });
    });
  },

  //处理用户点击地址列表
  handleTap(e) {

    //获取页面调用栈
    let pageStack;

    //如果上一个页面是确认订单页面，就修改缓存回退到确认订单页面
    if(true) {
      //获取选择的地址的id
      let Id = e.currentTarget.dataset.id;
      //将id存入缓存中
      //根据路由传过来的状态来确定是收货地址还是发票地址 status为true表示收货地址为false表示发票地址
      if(this.data.status == "true") {
        wx.setStorageSync("addrId", Id);
        wx.setStorageSync("status", true);
      }else{
        wx.setStorageSync("addrId", Id);
        wx.setStorageSync("status", false);
      }
      //回退到确认订单页面
      wx.navigateBack({
        delta: 1
      });
    } else {
      //如果上一个页面是我的页面，点击就跳转到修改地址页面
    }
    
  }
})
