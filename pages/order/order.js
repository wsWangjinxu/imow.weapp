import { getOrderList } from "../../api/order/order"

Page({
  data: {
    list: [
      {
        id: "全部",
        title: "全部"
      },
      {
        id: "待付款",
        title: "待付款"
      },
      {
        id: "待发货",
        title: "待发货"
      },
      {
        id: "待收货",
        title: "待收货"
      }
    ],
    selectedId: "全部",
    orders: ""
  },
  onLoad: function (option) {
    //设置路由跳转后tab
    this.setData({
      selectedId: option.state
    });

    //
    getOrderList("GET", {
      state: option.state
    }).then(res => {

      console.log(res.data.orders);
      let product = res.data.orders.productSku;
      product.forEach(element => {
        element.ProductName = element.name
      });
      console.log(order);
      this.setData({
        orders: res.data.orders
      });
    });
  },

  handleTabChange(e)  {
    getOrderList("GET", {
      state: e.detail
    }).then(res => {
      console.log(res.data.orders);
      this.setData({
        orders: res.data.orders
      });
    });
  }
})
