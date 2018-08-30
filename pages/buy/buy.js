//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    num:1, //数量
    dates:[
      { "sku": "01F02E074", "name": "十三" },
      { "sku": "01F02E075", "name": "十四" },
      { "sku": "01F02E076", "name": "十五" },
      { "sku": "01F02E077", "name": "十六" },
      { "sku": "01F02E078", "name": "十七" },
      { "sku": "01F02E079", "name": "十八" },
      { "sku": "01F02E070", "name": "十九" },
    ],
    filedProductSkus: {
      sku: {
        title: 'SKU号',
        key: 'skuCode',
        data: [{
          skuCode: '74',
          state: 1
        }]
      },
      deliveryTime: {
        title: '交期',
        key: 'deliveryTime',
        data: []
      }
    },
    state: ''//选择sku
  },
  onLoad: function () {
     
  },
  onChange(e){   
    this.setData({ num: e.detail });
  },
  addcart(){
    console.log(this.data.num)
  },
  //选择sku加样式
  select_sku: function (e) {
    console.log(e.currentTarget.dataset.key)
    this.setData({
      state: e.currentTarget.dataset.key,
    });
  },
  filted: function (key, val) {
    let isTapSku = key == 'skuCode';   //true选sku or false交期
    let skuArr = [];
    let timeArr = [];
    let paymentMethod = [];
    for (let index = 0; index < productSkus.length; index++) {
      const item = productSkus[index];
      if (key == "skuCode") {
        if (item[key] === val){
          skuArr.push({
            "skuCode": item.skuCode,
            state:2
          });
          timeArr.push({
            "deliveryTime": item.deliveryTime,
            state: 1
          });
          if (item.isDeposit){
            paymentMethod.push({
              "isDeposit": '定金',
              state: 1
            });
          }
        }else{
          skuArr.push({
            "skuCode": item.skuCode,
            state:1
          });
        }       
      }else if (key == "deliveryTime"){
        if (this.data.sku.data.length>0){
          if (item[key] === val) {
            timeArr.push({
              "deliveryTime": item.deliveryTime,
              state: 2
            });
          }
        }
      }else{
        skuArr.push({
          "skuCode": item.skuCode,
          "skuState": 1
        });
        timeArr.push({
          "deliveryTime": item.deliveryTime,
          "timeState": 1
        });
      }
    }
    return {
      skuArr,
      paymentMethod,
      priceArr
    }
  }


})
