import { getOrderList } from "../../api/order/order"

Page({
  data: {
    list: [
      {
        id: 101,
        title: "全部"
      },
      {
        id: 102,
        title: "待付款"
      },
      {
        id: 103,
        title: "待发货"
      },
      {
        id: 104,
        title: "待收货"
      },
      {
        id: 105,
        title: "退款/售后"
      }
    ],
    selectedId: 101
  },
  onLoad: function (option) {
    console.log(option);
    if(option.state) {
      getOrderList("GET", {
        state: option.state
      }).then(res => {
        console.log(res);
      })
    } else {
      getOrderList("GET").then(res => {
        console.log(res);
      })
    }
  }
})
