//套餐组件js
import { addCart, getProductSkus } from "../../api/productDetail/productDetail";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productId: String, //传入的产品id
    skuCode: String,
    deliveryTime: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    productSkus: [
      {
        "id": "A83BC8CB-Df2C-8692-0159-8E4ddA487b2b",
        "isDeposit": true,
        "agentPrice": 133,
        "skuCode": "01F02E072",
        "deliveryTime": "16天",
        "skuName": [{ name: "BX3(6k", value: "o]lB2" }, { name: "BX3(6k", value: "o]lB2" }]
      },
      {
        "id": "7bf7efA5-2cDB-85fd-4755-59E61A7D1e84",
        "isDeposit": true,
        "agentPrice": 1200,
        "skuCode": "01F02E072",
        "deliveryTime": "14天",
        "skuName": [{ name: "BX3(6k", value: "o]lB2" }, { name: "BX3(6k", value: "o]lB2" }, { name: "BX3(6k", value: "o]lB2" }]
      },
      {
        "id": "A83BC8CB-Df2C-8692-0159-8E4ddA487b2b",
        "isDeposit": true,
        "agentPrice": 1300,
        "skuCode": "01F02E072",
        "deliveryTime": "15天",
        "skuName": [{ name: "BX3(6k", value: "o]lB2" }, { name: "BX3(6k", value: "o]lB2" }]
      },
      {
        "id": "fcf03C8a-8Dc1-Ffa2-4CA8-316c5DE3DeFC",
        "isDeposit": true,
        "agentPrice": 1400,
        "skuCode": "01F02E075",
        "deliveryTime": "16天",
        "skuName": [{ name: "BX3(6k", value: "o]lB2" }, { name: "BX3(6k", value: "o]lB2" }]
      },
      {
        "id": "f43de71E-aAAb-B4d1-2E3D-cD6Ac9E26c2e",
        "isDeposit": false,
        "agentPrice": 1500,
        "skuCode": "01F02E076",
        "skuName": [{ name: "BX3(6k", value: "o]lB2" }, { name: "BX3(6k", value: "o]lB2" }]
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
    skuId: "",  //skuId
    isOnePrece: true,//判断显示单价还是价格区间
    price: "",  //价格
    minPrice: 0,
    maxPrice: 0,
    skuName: [],//产品信息
    hasDeliveryTime: false,//交期是否存在
    depositShow: false //定金是否存在
  },
  ready: function () {
    this.init()
  },
  /* 组件的方法列表*/
  methods: {
    init() {
      console.log(this.data.productId);
      console.log(this.data.skuCode);
      console.log(this.data.deliveryTime);
      this.filted();
      let productSkus = this.data.productSkus;
      for (let index = 0; index < productSkus.length; index++) {
        const item = productSkus[index];
        if (item.deliveryTime) {
          this.setData({ hasDeliveryTime: true });
        } else {
          this.setData({ depositShow: false });
        };
      }
      // getProductSkus("GET", {
      //   id: this.data.productId,
      // }).then(res => {
      //   console.log(res.data.productSkus);
      //   this.setData({
      //     productSkus: res.data.productSkus
      //   });
      //   this.filted();
      //   let productSkus = this.data.productSkus;
      //   for (let index = 0; index < productSkus.length; index++) {
      //     const item = productSkus[index];
      //     if (item.deliveryTime) {
      //       this.setData({ hasDeliveryTime: true });
      //     } else {
      //       this.setData({ depositShow: false });
      //     };
      //   }
      // })


      //组件已选择过规格，弹出有选中状态
      if (this.data.skuCode){               
        let a = { currentTarget: { dataset: { content: "", state: 2, type: "skuCode" } } };
        a.currentTarget.dataset.content = this.data.skuCode;
        this.click(a);
      }
      if (this.data.deliveryTime){
        let b = { currentTarget: { dataset: { content: "", state: 2, type: "deliveryTime" } } };
        b.currentTarget.dataset.content = this.data.deliveryTime;
        this.click(b);
      }
      
    },
    filted: function (key, val) {   
      const flag = {    //按钮状态(1选中、2普通、3禁用)
        CURRENT: 1,
        ACTIVE: 2,
        DISABLE: 3
      };
      let skuCodeKey = 'skuCode';
      let deliveryTimeKey = 'deliveryTime';
      let stateKey = 'state';
      if (!val && key) {
        if (key == skuCodeKey) {
          this.data.filedProductSkus.sku.current = undefined;
        } else {
          this.data.filedProductSkus.deliveryTime.current = undefined;
        }
        key = undefined
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
        if (itemKeyVal === val && currentFilted(item) || isFirst) {
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
        } else if (!currentSku && !currentDeliveryTime) {
          let hash = isTapSku ? skuHash : timeHash;
          hash[itemKeyVal] = flag.ACTIVE;
        } else if (!key && !val && (currentSku || currentDeliveryTime)) {
          let innerKey = skuCodeKey;
          let hash1 = skuHash;
          if (!currentSku) {
            innerKey = deliveryTimeKey;
            hash1 = timeHash;
          }
          hash1[item[innerKey]] = flag.ACTIVE;
        }
      }
      let skuArr = [];
      let timeArr = [];
      let existsku = {};
      let existtime = {};
      for (let index = 0; index < productSkus.length; index++) {
        const item = productSkus[index];
        let itemSkuCode = item[skuCodeKey];
        let itemDelivery = item[deliveryTimeKey];
        let skuState = skuHash[itemSkuCode] ? skuHash[itemSkuCode] : flag.DISABLE
        let deliveryState = timeHash[itemDelivery] ? timeHash[itemDelivery] : flag.DISABLE
        if (!existsku[itemSkuCode]) {
          skuArr.push({
            skuCode: itemSkuCode,
            [stateKey]: skuState
          })
          existsku[itemSkuCode] = true
        }
        if (!existtime[itemDelivery]) {
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
      let origenData = Object.assign(this.data.filedProductSkus, {
        sku: newSkudata,
        deliveryTime: newDeliveryTime
      })
      this.setData({ filedProductSkus: origenData });
    },
    click(e) {
      //console.log(e);
      let key = e.currentTarget.dataset.type;     //判断skuCode还是deliveryTime
      let val = e.currentTarget.dataset.content;  //当前skuCode或deliveryTime的值
      let state = e.currentTarget.dataset.state;  //按钮状态(1选中、2普通、3禁用)
      if (state != 3) {
        this.filted(key, state === 1 ? undefined : val);        //调用过滤事件
        // console.log(this.data.filedProductSkus.sku.current);
        // console.log(this.data.filedProductSkus.deliveryTime.current);
        let skunow = this.data.filedProductSkus.sku.current;
        let timenow = this.data.filedProductSkus.deliveryTime.current;
        this.selectNow(skunow, timenow)
      }
    },
    //查找当前项
    selectNow(sku, time) {
      let productSkus = this.data.productSkus;
      if (sku && time) {
        for (let index = 0; index < productSkus.length; index++) {
          const item = productSkus[index];
          if (item.skuCode == sku && item.deliveryTime == time) {
            this.setData({ price: item.agentPrice });           //确认一个价格
            this.setData({ isOnePrece: true });
            this.setData({ skuId: item.id });
            this.setData({ skuName: item.skuName });
            if (item.isDeposit) {
              this.setData({ depositShow: true });
            } else {
              this.setData({ depositShow: false });
            };
          }
        }
      } else {
        if (sku) {
          let skuArr = [];   //点击sku所有sku价格数组
          let skuArr2 = [];  //去重排序后的sku价格数组
          let skuArr3 = [];  //点击sku所有对象数组
          for (let index = 0; index < productSkus.length; index++) {
            const item = productSkus[index];
            if (item.skuCode == sku) {
              skuArr.push(item.agentPrice);
              skuArr3.push(item);
            }
          }
          if (skuArr3.length == 1) {
            this.setData({ skuName: skuArr3[0].skuName });
            this.setData({ skuId: skuArr3[0].id });
            this.setData({ price: skuArr3[0].agentPrice });          //确认一个价格
            this.setData({ isOnePrece: true });
            if (skuArr3[0].isDeposit) {
              this.setData({ depositShow: true });
            } else {
              this.setData({ depositShow: false });
            };
            if (skuArr3[0].deliveryTime) {
              this.setData({ hasDeliveryTime: true });
            }else{
              this.setData({ hasDeliveryTime: false });
            }
          } else {
            this.setData({ hasDeliveryTime: true });
            this.setData({ skuName: "" });
            this.setData({ skuId: "" });
            this.setData({ depositShow: false });
            let min;
            let max;
            for (var i = 0; i < skuArr.length; i++) {
              if (skuArr2.indexOf(skuArr[i]) == -1) {
                skuArr2.push(skuArr[i]);
                skuArr2.sort(function (a, b) { return a - b; });
              }
            }
            if (skuArr2.length > 1) {                  //去重后多个价格
              min = skuArr2[0];
              max = skuArr2[skuArr2.length - 1];
              this.setData({ minPrice: min });
              this.setData({ maxPrice: max });
              this.setData({ isOnePrece: false });
            } else {                                  //去重后只有一个价格
              this.setData({ price: skuArr2[0] });
              this.setData({ isOnePrece: true });
            }
          }

        } else if (time) {
          let timeArr = [];    //点击交期所有交期数组
          let timeArr2 = [];   //去重排序后的交期数组
          let timeArr3 = [];   //点击交期所有对象数组
          for (let index = 0; index < productSkus.length; index++) {
            const item = productSkus[index];
            if (item.deliveryTime == time) {
              timeArr.push(item.agentPrice);
              timeArr3.push(item)
            }
          } 
          if (timeArr3.length == 1) {
            this.setData({ skuName: timeArr3[0].skuName });
          } else {
            this.setData({ skuName: "" });
          }
          let min;
          let max;
          for (var i = 0; i < timeArr.length; i++) {
            if (timeArr2.indexOf(timeArr[i]) == -1) {
              timeArr2.push(timeArr[i]);
              timeArr2.sort(function (a, b) { return a - b; });
            }
          } 
          if (timeArr2.length > 1) {
            min = timeArr2[0];
            max = timeArr2[timeArr2.length - 1];
            this.setData({ minPrice: min });
            this.setData({ maxPrice: max });
            this.setData({ isOnePrece: false });
            this.setData({ depositShow: false });
          } else {
            this.setData({ price: timeArr2[0] });
            this.setData({ isOnePrece: true });
            this.setData({ depositShow: false });
          }
        } else {
          this.setData({ depositShow: false });
          this.setData({ isOnePrece: true });
          this.setData({ price: '' });
          this.setData({ skuName: "" });
          this.setData({ skuId: "" });
        }
      }
    },
    //确定按钮
    sureButton() {
      if (this.data.filedProductSkus.sku.current == "" || this.data.filedProductSkus.sku.current == undefined) {
        wx.showToast({
          title: '请选择sku号',
          duration: 2000,
          image: "/static/imgs/warn.png"
        })
      } else if (this.data.hasDeliveryTime) {
        if (this.data.filedProductSkus.deliveryTime.current == "" || this.data.filedProductSkus.deliveryTime.current == undefined) {
          wx.showToast({
            title: '请选择交期',
            duration: 2000,
            image: "/static/imgs/warn.png"
          })
        }else{  
          this.triggerEvent('myevent', {       //sku和交期都存在
            isShow: false,
            price: this.data.price,
            skuId: this.data.skuId,
            productId: this.data.productId,
            depositShow: this.data.depositShow,
            skuCode: this.data.filedProductSkus.sku.current,
            deliveryTime: this.data.filedProductSkus.deliveryTime.current
          });
        }
      } else {
        // console.log(this.data.price);
        // console.log(this.data.skuId);
        // console.log(this.data.productId);
        // console.log(this.data.depositShow);
        this.triggerEvent('myevent', {          //只有sku
          isShow: false, 
          price: this.data.price, 
          skuId: this.data.skuId, 
          productId: this.data.productId,
          depositShow: this.data.depositShow,
          skuCode: this.data.filedProductSkus.sku.current,
          deliveryTime: this.data.filedProductSkus.deliveryTime.current
        });
      }
    }


  }
})
