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

    //获取路由过来的订单
    this.getOrders(option.state);
    
  },

  handleTabChange(e)  {
    //获取tab切换的订单
    this.getOrders(e.detail);
  },

  //点击跳转到订单详情
  handleTap(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/orderDetail/orderDetail?id=" + id
    })
  },

  //获取订单
  getOrders(state) {
    getOrderList("GET", {
      state: state
    }).then(res => {
      let orders = res.data.orders;
      //为每一个商品添加商品名，两个接口有一个键名与组件不一致
      orders.forEach(element => {
        element.productSku.forEach(ele => {
          ele.productName = ele.name;
        });
      });
      this.setData({
        orders: orders
      });
    });
  }
})
