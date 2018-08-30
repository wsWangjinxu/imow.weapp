import { getOrderConfirmCart } from "../../api/user/cart"
import { getAddressList } from "../../api/user/address"
const app = getApp()

Page({
  data: {
    show: false,
    list: [
      {
        id: 101,
        title: "物流发货"
      },
      {
        id: 102,
        title: "自提"
      }
    ],
    selectedId: 101,
    orderConfirm: false,
    cartData: "",
    pick: false,
    //地址信息
    addrInfo: ""
  },
  onLoad(option) {
    //下面一行注释用于测试，测试完毕以后放开注释
    // if(option.cartId) {
      getOrderConfirmCart("GET").then(res => {
        console.log(res.data.data);
        this.setData({
          cartData: res.data.data
        });
      });
    // }
  },
  
  //每次页面显示的时候都获取缓存中的地址
  onShow() {
    //每次页面显示的时候都获取地址列表，如果缓存中有对应的地址id，就取id对应的地址作为订单的地址，没有的话就取第一条
    getAddressList("POST").then(res => {
      //存储地址列表
      let addrList = res.data.AddressList;
      let addrId = wx.getStorageSync("addrId");
      let tempAddrInfo;
      if(addrId) {
        addrList.forEach(element => {
          if(element.id === addrId) {
            tempAddrInfo = element;
          }
        });
      } else {
        tempAddrInfo = addrList[0];
      }

      //设置地址
      this.setData({
        addrInfo: tempAddrInfo
      })
    })

    let addrId = wx.getStorageSync("addrId");
    console.log(addrId);
    if(addrId){

    } else {

    }
  },

  //控制切换
  handleTabChange(e) {
    if(e.detail === 101) {
      this.setData({
        pick: false
      });
    } else {
      this.setData({
        pick: true
      });
    }
  }
})
