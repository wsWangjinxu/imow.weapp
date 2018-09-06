import { getOrderDetail, getOrderLog } from "../../api/order/order"

Page({
  data: {
    steps: [
      {
        text: '提交订单',
        desc: '成功提交订单 2018-03-15 20:40:41'
      },
      {
        text: '订单付款',
        desc: '已付款53000.00元（订单总金额10000.00元）'
      },
      {
        text: '已发货',
        desc: '已发10件/共20件'
      },
      {
        text: '完成',
        desc: ''
      }
    ],
    active: 1,
    array: ['全部明细','支付明细'],
    index: 0
  },
  onLoad(option) {
    //获取订单的详情
    getOrderDetail("GET", {
      orderId: option.id
    }).then(res => {
      let order = res.data.order;
      //获取steps步骤条的状态内容
      let steps = [
        {
          text: '提交订单',
          desc: order.createTime
        },
        {
          text: '订单付款',
          desc: '应付金额' + order.payment + '元/实付' + order.payable + '元'
        },
        {
          text: '已发货',
          desc: '已发' + order.shippedCount + '件/共' + order.productSku.length + '件'
        },
        {
          text: '完成',
          desc: order.endTime
        }
      ];

      order.productSku.forEach(element => {
        element.productName = element.name;
      });

      this.setData({
        order,
        steps
      });

      //初始化的时候获取明细
      getOrderLog("GET", {
        orderId: this.data.order.orderCode,
        type: "全部"
      }).then(res => {
        let logs = res.data.logs;
        this.setData({
          logs
        });
      })
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    });
    getOrderLog("GET", {
      orderId: this.data.order.orderCode,
      type: e.detail.value
    }).then(res => {
      let logs = res.data.logs;
      this.setData({
        logs
      });
    })
  }
  
})
