//index.js
//获取应用实例
import { getProductDetail, addCart, getProductSkus } from "../../api/productDetail/productDetail";

const app = getApp()

Page({
  data: {
    productSkus: [
      // {
      //   "id": "7bf7efA5-2cDB-85fd-4755-59E61A7D1e84",
      //   "isDeposit": true,
      //   "agentPrice": 122,
      //   "skuCode": "01F02E072",
      //   "deliveryTime": "14天"
      // },
      // {
      //   "id": "A83BC8CB-Df2C-8692-0159-8E4ddA487b2b",
      //   "isDeposit": true,
      //   "agentPrice": 1500,
      //   "skuCode": "01F02E072",
      //   "deliveryTime": "15天"
      // },
      // {
      //   "id": "5D1E1d7D-383d-A8C6-9CEd-B5c4FD4Dc9Eb",
      //   "isDeposit": true,
      //   "agentPrice": 1200,
      //   "skuCode": "01F02E072",
      //   "deliveryTime": "20天"
      // },
      // {
      //   "id": "fcf03C8a-8Dc1-Ffa2-4CA8-316c5DE3DeFC",
      //   "isDeposit": true,
      //   "agentPrice": 122,
      //   "skuCode": "01F02E075",
      //   "deliveryTime": "13天"
      // },
      // {
      //   "id": "f43de71E-aAAb-B4d1-2E3D-cD6Ac9E26c2e",
      //   "isDeposit": true,
      //   "agentPrice": 122,
      //   "skuCode": "01F02E076",
      //   "deliveryTime": "13天"
      // }
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
    productId: "",//产品id
    skuId: "",  //skuId
    isOnePrece: true,//判断显示单价还是价格区间
    price: "",  //价格
    minPrice: 0,
    maxPrice: 0,
    skuName:[],//产品信息
    // model: "CPC30-T3",  //型号
    // weight: "3000",  //载重
    // height: "3000",  //起升高度
    // menjia: "两级宽视野",  //门架类型
    // transmission: "液力传动",  //传动类型
    hasDeliveryTime: false,//交期是否存在
    depositShow: false, //定金按钮显示隐藏
    num: 1, //数量
    paytype: 0, //定金全款判断  
    paymethod: "", //支付方式文字
    CA: "item",
    CB: "item"
  },
  onLoad: function(e) { 
    console.log(e);
    this.setData({ productId: e.productId});
    this.init();
  },
  onChange(e) {
    this.setData({
      num: e.detail
    });
  },
  //加入购物车
  addcart() {
    // console.log(this.data.num);
    // console.log(this.data.filedProductSkus.sku.current);
    // console.log(this.data.filedProductSkus.deliveryTime.current);
    // console.log(this.data.productId); 
    // console.log(this.data.paytype);
    if (this.data.filedProductSkus.sku.current == "" || this.data.filedProductSkus.sku.current == undefined){
      wx.showToast({
        title: '请选择sku号',
        duration: 2000,
        image: "/static/imgs/warn.png"
      })
    } else if (this.data.hasDeliveryTime){
      if (this.data.filedProductSkus.deliveryTime.current == "" || this.data.filedProductSkus.deliveryTime.current == undefined) {
        wx.showToast({
          title: '请选择交期',
          duration: 2000,
          image: "/static/imgs/warn.png"
        })
      }
    } else if (this.data.paytype == "" || this.data.paytype == undefined){
      wx.showToast({
        title: '请选择支付类型',
        duration: 2000,
        image: "/static/imgs/warn.png"
      })
    }else{
      addCart("POST", {
        productId: this.data.productId,
        skuCode:this.data.filedProductSkus.sku.current,
        skuId: this.data.skuId,
        num:this.data.num
      }).then(res => {
        console.log(res);
        if (res.data.status==20){
          wx.switchTab({
            url: '/pages/cart/cart'
          })
        }else{
          wx.showToast({
            title: '操作失败，请重试',
            duration: 2000,
            image: "/static/imgs/warn.png"
          })
          this.init();
        }
      });     
    }   
  },
  //立即购买
  buyNow() {
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
      }
    } else if (this.data.paytype == "" || this.data.paytype == undefined) {
      wx.showToast({
        title: '请选择支付类型',
        duration: 2000,
        image: "/static/imgs/warn.png"
      })
    } else {
      //立即购买
      let productId = this.data.productId;
      let skuCode = this.data.filedProductSkus.sku.current;
      let skuId = this.data.skuId;
      let num = this.data.num;
      wx.redirectTo({
        url: '/pages/orderConfirm/orderConfirm?productId=' + productId + '&skuCode=' + skuCode + '&skuId=' + skuId + '&num=' + num,
      })
    }
  },
  //选择sku加样式（子组件传父组件，state1选中，state2普通，state3禁用）
  click(e) {    
    let key = e.detail.type;
    let val = e.detail.content;
    let state = e.detail.state;
    // console.log(key);
    // console.log(val);
    // console.log(state);
    if (state!=3){
      this.filted(key, state === 1 ? undefined: val);        //调用过滤事件
      console.log(this.data.filedProductSkus.sku.current);
      console.log(this.data.filedProductSkus.deliveryTime.current);
      let skunow = this.data.filedProductSkus.sku.current;
      let timenow = this.data.filedProductSkus.deliveryTime.current;
      this.selectNow(skunow, timenow)
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

  },
  //查找当前项
  selectNow(sku,time){
    console.log("----");                              
    let productSkus = this.data.productSkus;
    if (sku && time){
      for (let index = 0; index < productSkus.length; index++) {
        const item = productSkus[index];
        if (item.skuCode == sku && item.deliveryTime == time) {
          console.log("当前代理价："+item.agentPrice);
          console.log("是否有定金："+item.isDeposit);
          this.setData({ price: item.agentPrice });           //根据sku号与交期确认顶部价格等数据
          this.setData({ skuId: item.id }); 
          this.setData({ isOnePrece: true });
          this.setData({ skuName: item.skuName });
          // this.setData({ model: item.model }); 
          // this.setData({ weight: item.weight });  //载重
          // this.setData({ height: item.height }); //起升高度
          // this.setData({ menjia: item.menjia }); //门架类型
          // this.setData({ transmission: item.transmission }); //传动类型
          if (item.isDeposit) {
            this.setData({ depositShow: true });
          };
        }
      }
    }else{
      // this.setData({ depositShow: false });
      // this.setData({ price: '' });
      if (sku) {
        let skuArr = [];    //点击sku所有sku价格数组
        let skuArr2 = [];  //去重排序后的
        let skuArr3 = [];  //点击sku所有对象数组
        for (let index = 0; index < productSkus.length; index++) {
          const item = productSkus[index];
          if (item.skuCode == sku) {
            skuArr.push(item.agentPrice);
            skuArr3.push(item);
          }  
        }
        if (skuArr3.length==1){
          this.setData({ skuName: skuArr3[0].skuName });
          this.setData({ skuId: skuArr3[0].id }); 
        }else{
          this.setData({ skuName: "" });
        }
        console.log(skuArr);
        let min;
        let max;
        for (var i = 0; i < skuArr.length; i++) {
          if (skuArr2.indexOf(skuArr[i]) == -1) {
            skuArr2.push(skuArr[i]);
            skuArr2.sort(function (a, b) { return a - b; });
          }
        }
        console.log(skuArr2);
        if (skuArr2.length>1) {
          min = skuArr2[0];
          max = skuArr2[skuArr2.length - 1];
          this.setData({ minPrice: min });
          this.setData({ maxPrice: max });
          this.setData({ isOnePrece: false });
          this.setData({ depositShow: false });
        }else{
          this.setData({ price: skuArr2[0] });
          this.setData({ isOnePrece: true });
          this.setData({ depositShow: false });
        }
        
      } else if (time){
        let timeArr = [];
        let timeArr2 = [];
        let timeArr3 = [];
        for (let index = 0; index < productSkus.length; index++) {
          const item = productSkus[index];
          if (item.deliveryTime == time) {
            timeArr.push(item.agentPrice);
            timeArr3.push(item)
          }
        } 
        // console.log(timeArr);
        if (timeArr3.length==1){
          this.setData({ skuName: timeArr3[0].skuName });
        }else{
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
        // console.log(timeArr2);  //排序去重后
        if (timeArr2.length > 1) {
          min = timeArr2[0];
          max = timeArr2[timeArr2.length - 1];
          this.setData({ minPrice: min });
          this.setData({ maxPrice: max });
          this.setData({ isOnePrece: false });
          this.setData({ depositShow: false });
        }else{
          this.setData({ price: timeArr2[0] });
          this.setData({ isOnePrece: true });
          this.setData({ depositShow: false });
        }
        
      }else{
        this.setData({ depositShow: false });
        this.setData({ isOnePrece: true });
        this.setData({ price: '' });
        this.setData({ skuName: ""});
        this.setData({ skuId: "" }); 
      }

    }    
  },
  //全款按钮事件
  payType1(e) {                        
    let CA = this.data.CA;
    let CB = this.data.CB;
    // console.log(e.target.dataset.paytype);
    this.setData({ paytype: e.target.dataset.paytype });
    console.log(this.data.paytype);
    if (CA === "select") {
      CA = "item";
      this.setData({ paytype: 0 });
    } else {
      CA = "select"
      CB = "item"
    }
    this.setData({
      CA: CA,
      CB: CB
    })
  },
  //定金按钮事件
  payType2(e) {
    let CA = this.data.CA;
    let CB = this.data.CB;
    // console.log(e.target.dataset.paytype);
    this.setData({ paytype: e.target.dataset.paytype });
    console.log(this.data.paytype);
    if (CB === "select") {
      CB = "item";
      this.setData({ paytype: 0 });
    } else {
      CB = "select"
      CA = "item"
    }
    this.setData({
      CA: CA,
      CB: CB
    })
  },
  //页面初始化函数
  init() {
    //获取产品详情内容
    getProductSkus("GET", {
      id: this.data.productId,
    }).then(res => {
      console.log(res.data.productSkus);
      this.setData({
        productSkus: res.data.productSkus
      });
      this.filted();
      let productSkus = this.data.productSkus;
      for (let index = 0; index < productSkus.length; index++) {
        const item = productSkus[index];
        if (item.deliveryTime) {
          this.setData({ hasDeliveryTime: true });
        }
      }
    });
    getProductDetail("GET", {
      id: this.data.productId,
    }).then(res => {
      this.setData({
        paymethod: res.data.paymethod
      });
      
    });
  }

})