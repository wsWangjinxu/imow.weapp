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
        "skuCode": "01F02E072",
        "deliveryTime": "14天"
      },
      {
        "id": "A83BC8CB-Df2C-8692-0159-8E4ddA487b2b",
        "isDeposit": true,
        "agentPrice": 122,
        "skuCode": "01F02E072",
        "deliveryTime": "15天"
      },
      {
        "id": "5D1E1d7D-383d-A8C6-9CEd-B5c4FD4Dc9Eb",
        "isDeposit": true,
        "agentPrice": 122,
        "skuCode": "01F02E072",
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
        data: [
          // {
          //   skuCode: '01F02E074',
          //   state: 1
          // },
          // {
          //   skuCode: '01F02E075',
          //   state: 3
          // }
        ]
      },
      deliveryTime: {
        title: '交期',
        key: 'deliveryTime',
        current: '',
        data: [
          // {
          //   deliveryTime: '14天',
          //   state: 2
          // },
          // {
          //   deliveryTime: '15天',
          //   state: 1
          // }
        ]
      }
    },
    price: 8900,
    //state: '' //选择sku
  },
  onLoad: function() {   
    this.filted()
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
      this.filted(key, state === 1 ? undefined: val)         //调用过滤事件
    }
  },
  filted: function (key, val) {
    const flag = {
      CURRENT: 1,
      ACTIVE: 2,
      DISABLE: 3
    };
    let skuCodeKey = 'skuCode';
    let deliveryTimeKey = 'deliveryTime';
    let stateKey = 'state';
    if (!val && key){
      if(key == skuCodeKey){
        this.data.filedProductSkus.sku.current = undefined;
      }else{
        this.data.filedProductSkus.deliveryTime.current = undefined;
      }
      key=undefined
    }
    let currentSku = key != skuCodeKey && this.data.filedProductSkus.sku.current;  
    let currentDeliveryTime = key != deliveryTimeKey && this.data.filedProductSkus.deliveryTime.current;  
    let isFirst = !key && !val && !currentSku && !currentDeliveryTime;
    //筛选之前就有的条件
    let currentFilted = function (item) {
      if (!currentSku && !currentDeliveryTime) return true;
      let result = true;
      result = !currentDeliveryTime || item[deliveryTimeKey] === currentDeliveryTime
      if (!result) return result
      result = !currentSku || item[skuCodeKey] === currentSku
      return result
    }

    let isTapSku = currentSku || key == skuCodeKey; //true选sku or false交期
    let isTapDeliveryTime = currentDeliveryTime || key == deliveryTimeKey; //true选sku or false交期
    let skuHash = {};
    let timeHash = {};
    let paymentMethod = {};
    let productSkus = this.data.productSkus;
    for (let index = 0; index < productSkus.length; index++) {
      const item = productSkus[index];
      const itemKeyVal = item[key];
      //两种都点击
      if (itemKeyVal === val && currentFilted(item)|| isFirst) {
        let itemSkuCode = item[skuCodeKey];
        let itemDelivery = item[deliveryTimeKey];
        skuHash[itemSkuCode] = isTapSku ? flag.CURRENT : flag.ACTIVE
        timeHash[itemDelivery] = isTapDeliveryTime ? flag.CURRENT : flag.ACTIVE
        if (skuHash[itemSkuCode] === flag.CURRENT) {
          this.data.filedProductSkus.sku.current = itemSkuCode
        }
        if (timeHash[itemDelivery] === flag.CURRENT) {
          this.data.filedProductSkus.deliveryTime.current = itemDelivery
        }
      } else if (!currentSku&&!currentDeliveryTime){
        let hash = isTapSku ? skuHash : timeHash;
        hash[itemKeyVal] = flag.ACTIVE;
      } else if (!key && !val && (currentSku || currentDeliveryTime)){
        let innerKey = skuCodeKey;
        let hash1 = skuHash;
        if (!currentSku){
          innerKey = deliveryTimeKey;
          hash1 = timeHash;
        }
        hash1[item[innerKey]] = flag.ACTIVE;
      }
    }

    let skuArr = [];
    let timeArr = [];
    let existsku ={};
    let existtime = {};
    for (let index = 0; index < productSkus.length; index++) {
      const item = productSkus[index];
      let itemSkuCode = item[skuCodeKey];
      let itemDelivery = item[deliveryTimeKey];
      let skuState = skuHash[itemSkuCode] ? skuHash[itemSkuCode] : flag.DISABLE
      let deliveryState = timeHash[itemDelivery] ? timeHash[itemDelivery] : flag.DISABLE
      if (!existsku[itemSkuCode]){
        skuArr.push({
          skuCode: itemSkuCode,
          [stateKey]: skuState
        })
        existsku[itemSkuCode] = true
      }
      if (!existtime[itemDelivery]){
        timeArr.push({
          'deliveryTime': itemDelivery,
          [stateKey]: deliveryState
        })
        existtime[itemDelivery] = true
      }
     
    }
    let newSkudata = Object.assign(this.data.filedProductSkus.sku, {
      data: skuArr
    })
    let newDeliveryTime = Object.assign(this.data.filedProductSkus.deliveryTime, {
      data: timeArr
    })
    let origenData =  Object.assign(this.data.filedProductSkus, {
      sku: newSkudata,
      deliveryTime:newDeliveryTime
    })

    this.setData({ filedProductSkus: origenData });

  }





})