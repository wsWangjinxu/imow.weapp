//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    num: 1, //数量
    productSkus: [{
        "id": "7bf7efA5-2cDB-85fd-4755-59E61A7D1e84",
        "isDeposit": true,
        "agentPrice": 122,
        "skuCode": "01F02E074",
        "deliveryTime": "14天"
      },
      {
        "id": "A83BC8CB-Df2C-8692-0159-8E4ddA487b2b",
        "isDeposit": true,
        "agentPrice": 122,
        "skuCode": "01F02E074",
        "deliveryTime": "15天"
      },
      {
        "id": "5D1E1d7D-383d-A8C6-9CEd-B5c4FD4Dc9Eb",
        "isDeposit": true,
        "agentPrice": 122,
        "skuCode": "01F02E074",
        "deliveryTime": "20天"
      },
      {
        "id": "fcf03C8a-8Dc1-Ffa2-4CA8-316c5DE3DeFC",
        "isDeposit": true,
        "agentPrice": 122,
        "skuCode": "01F02E075",
        "deliveryTime": "13天"
      },
      {
        "id": "f43de71E-aAAb-B4d1-2E3D-cD6Ac9E26c2e",
        "isDeposit": true,
        "agentPrice": 122,
        "skuCode": "01F02E076",
        "deliveryTime": "13天"
      }
    ],
    filedProductSkus: {
      sku: {
        title: 'SKU号',
        key: 'skuCode',
        current: '',
        data: [{
            skuCode: '01F02E074',
            state: 1
          },
          {
            skuCode: '01F02E075',
            state: 3
          }
        ]
      },
      deliveryTime: {
        title: '交期',
        key: 'deliveryTime',
        current: '',
        data: [{
            deliveryTime: '14天',
            state: 2
          },
          {
            deliveryTime: '15天',
            state: 1
          }
        ]
      }
    },
    price: 8900,
    state: '' //选择sku
  },
  onLoad: function() {

  },
  onChange(e) {
    this.setData({
      num: e.detail
    });
  },
  addcart() {
    console.log(this.data.num)
  },
  //选择sku加样式
  click(e) { 
    let key = e.detail.type;
    let val = e.detail.content;
    let state = e.detail.state;
    console.log(key);
    console.log(val);
    console.log(state);
    if (state!=3){
      console.log(111)         //调用过滤事件
    }
  },
  // filted: function(key, val) {
  //   const flag: {
  //     CURRENT: 1,
  //     ACTIVE: 2,
  //     DISABLE: 3
  //   };
  //   let skuCodeKey = 'skuCode';
  //   let deliveryTimeKey = 'deliveryTime';
  //   let stateKey = 'state';
  //   let currentSku = this.filedProductSkus.sku.current;
  //   let currentDeliveryTime = this.filedProductSkus.deliveryTime.current;
  //   let currentFilted = function(item) {
  //     if (!currentSku && !currentDeliveryTime) return true;
  //     let result = true;
  //     result = !currentDeliveryTime || item[deliveryTimeKey] === currentDeliveryTime
  //     result = !currentSku || item[skuCodeKey] === currentSku
  //   }

  //   let isTapSku = currentSku || key == skuCodeKey; //true选sku or false交期
  //   let isTapDeliveryTime = currentDeliveryTime || key == deliveryTimeKey; //true选sku or false交期
  //   let skuHash = {};
  //   let timeHash = {};
  //   let paymentMethod = {};
  //   for (let index = 0; index < productSkus.length; index++) {
  //     const item = productSkus[index];
  //     if (item[key] === val && currentFilted(item)) {
  //       let itemSkuCode = item[skuCodeKey];
  //       let itemDelivery = item[deliveryTimeKey];
  //       skuHash[itemSkuCode] = isTapSku ? flag.CURRENT : flag.ACTIVE
  //       timeHash[itemDelivery] = isTapDeliveryTime ? flag.CURRENT : flag.ACTIVE
  //     }
  //   }

  //   let skuArr = [];
  //   let timeArr = [];

  //   for (let index = 0; index < productSkus.length; index++) {
  //     const item = productSkus[index];
  //     let itemSkuCode = item[skuCodeKey];
  //     let itemDelivery = item[deliveryTimeKey];
  //     let skuState = skuHash[itemSkuCode] ? skuHash[itemSkuCode] : flag.DISABLE
  //     let deliveryState = timeHash[itemDelivery] ? timeHash[itemDelivery] : flag.DISABLE
  //     skuArr.push({
  //       skuCode: itemSkuCode,
  //       [stateKey]: skuState
  //     })
  //     timeArr.push({
  //       'deliveryTime': itemDelivery,
  //       [stateKey]: deliveryState
  //     })
  //   }
  //   return {
  //     skuArr,
  //     timeArr,
  //     priceArr
  //   }
  // }





})