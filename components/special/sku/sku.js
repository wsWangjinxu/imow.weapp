import { addCart } from "../../../api/user/cart"
import { getProductSkus } from "../../../api/product/index"

Component({
  properties: {
    productId: {
      type: String,
      value: "",
      observer(val) {
        if (val) {
          //获取
          getProductSkus("GET", { productId: val }).then(res => {
            console.log(res);
            let data = res.data.productSkus;
            console.log(data);
            this.setData({
              productSkus: data
            });
            this.init();
          });
        }
      }
    }
  },
  data: {
    skuCode: "",  //当前选中的skuCode
    deliveryTime: "", //当前选中的deliveryTime
    skuId: "",  //当前选中的skuId
    showTime: false,  //是否显示deliveryTime
    skuName: "",  //当前选中的skuName
    price: "",  //组件显示的价格
    number: 0 //当前的数量
  },
  methods: {
    init() {
      let data = [
        {
          "id": "sku1 d1 ",
          "isDeposit": true,
          "agentPrice": "1天价格",
          "skuCode": "sku1",
          "deliveryTime": "1天",
          "number": 1,
          "skuName": [{
            name: "载重",
            value: "1.5d吨"
          }]
        },
        {
          "id": "sku1 d10",
          "isDeposit": true,
          "agentPrice": "十天价格",
          "skuCode": "sku1",
          "deliveryTime": "10天",
          "number": 2,
          "skuName": [{
            name: "载重",
            value: "1.6d吨"
          }]
        },
        {
          "id": "sku2 d2",
          "isDeposit": true,
          "agentPrice": "2天价格",
          "skuCode": "sku2",
          "deliveryTime": "2天",
          "number": 3,
          "skuName": [{
            name: "载重",
            value: "1.7d吨"
          }]
        },
        {
          "id": "sku2 d20",
          "isDeposit": true,
          "agentPrice": "二十天价格",
          "skuCode": "sku2",
          "deliveryTime": "二十天",
          "number": 4,
          "skuName": [{
            name: "载重",
            value: "1.5d吨"
          }, {
            name: "长度",
            value: "1.5m"
          }]
        },
        {
          "id": "sku3 d",
          "isDeposit": true,
          "agentPrice": "无交期价格",
          "skuCode": "sss1123",
          "deliveryTime": "",
          "number": 5,
          "skuName": [{
            name: "载重",
            value: "1.5d吨"
          }]
        }
      ];
      //这里是根据productId获取到的sku数组，将下方forEach的内容修改为this.data.productSkus即可
      console.log(this.data.productSkus);

      let obj = {};
      data.forEach(ele => {
        //制作数据
        let tempData = {
          id: ele.id,
          isDeposit: ele.isDeposit,
          deliveryTime: ele.deliveryTime,
          agentPrice: ele.agentPrice,
          number: ele.number,
          skuName: ele.skuName
        };
        if (obj[ele.skuCode] == undefined) {
          obj[ele.skuCode] = [];

          obj[ele.skuCode].push(tempData);
        } else {
          obj[ele.skuCode].push(tempData);
        }
      });

      // console.log(obj);
      //将请求到的数据处理后保存到组件的data中
      this.setData({ obj });
    },


    //接收从子组件传过来的sku
    handleSku(e) {
      console.log(e);
      let skuCode = e.detail.skuCode;
      let skuArray = this.data.obj[skuCode];

      //如果当前skuCode中只有一个元素，判断交期是否有，如果没有不显示交期栏
      if (skuArray.length == 1 && skuArray[0].deliveryTime == "") {
        //设置不显示交期类目
        this.setData({
          skuCode,
          showTime: false
        });
      } else {
        this.setData({
          skuCode,
          showTime: true
        });
      }

      //true参数表示点选任意一个新的skuCode
      this.getPrice(true);
    },

    //接收从子组件传过来的交期
    handleTime(e) {
      console.log(e);
      let deliveryTime = e.detail.time;
      let price;
      let skuId;
      let number;
      this.data.obj[this.data.skuCode].forEach(ele => {
        console.log(ele);
        if (ele.deliveryTime == deliveryTime) {
          price = ele.agentPrice;
          skuId = ele.id;
          number = ele.number;
        }
      })
      this.setData({
        deliveryTime,
        price,
        skuId,
        number
      });
      this.getPrice();
    },

    getPrice(status) {
      let obj = this.data.obj;  //获取数据对象
      let skuCode = this.data.skuCode;  //获取当前点击的skuCode
      let deliveryTime = this.data.deliveryTime //获取当前的deliverTime


      //status表示是新点击一个skuCode
      if (status) {
        let current = obj[skuCode][0];

        //点击一个新的sku，将选中当前sku的第一个产品的价格
        this.setData({
          price: current.agentPrice,
          deliveryTime: current.deliveryTime,
          skuId: current.id,
          number: current.number,
          skuName: current.skuName
        });
      } else {
        let temp = obj[skuCode];
        temp.forEach(ele => {
          if (ele.deliveryTime == deliveryTime) {
            this.setData({
              price: ele.agentPrice,
              skuId: ele.id,
              number: ele.number,
              skuName: ele.skuName
            });
          }
        });
      }

      // console.log(skuName);
    },

    //点击加入购物车，将数量变为1
    addNumber() {

      //获取当前选中的内容
      let obj = this.data.obj;
      let skuCode = this.data.skuCode;

      //判断用户是否已经选择价格
      if (this.data.price) {

        //收集需要请求的数据
        let data = {
          productId: this.data.productId,
          skuCode: this.data.skuCode,
          num: 1,
          skuId: this.data.skuId
        };

        console.log(this.data.skuId);
        console.log(this.data.skuCode);

        //更新现有产品的数量
        obj[skuCode].forEach(ele => {
          if (ele.id == this.data.skuId) {
            ele.number = 1;
            console.log("已经加1了");
          }
        })

        console.log(obj);

        this.setData({
          obj,
          number: 1
        });

        //操作购物车
        this.modifyCart(data);
      } else {
        wx.showToast({
          title: "请选择商品",
          image: "/static/icon/warning-white.png"
        })
      }
    },

    //
    handleChange(e) {
      console.log(e);
      let obj = this.data.obj;
      let skuCode = this.data.skuCode;
      let tempNum;

      //判断用户点击的是加还是减
      if (this.data.number > e.detail) {
        tempNum = -1;
      } else {
        tempNum = 1;
      }

      //更新现有产品的数量
      obj[skuCode].forEach(ele => {
        if (ele.id == this.data.skuId) {
          ele.number += tempNum;
        }
      });

      console.log(obj);

      this.setData({
        number: e.detail,
        obj
      });

      //收集需要请求的数据
      let data = {
        productId: this.data.productId,
        skuCode: this.data.skuCode,
        num: tempNum,
        skuId: this.data.skuId
      };

      //操作购物车
      this.modifyCart(data);
    },


    //修改购物车
    modifyCart(data) {
      console.log(data);
      addCart("POST", data).then(res => {
        if (!res.data.status) {
          wx.showToast({
            title: "添加失败！",
            image: "/static/image/warning-white.png"
          });
        } else {
          //更新产品的数量，更新店铺的数量
          this.triggerEvent("modifyNumber", { num: data.num, productId: data.productId });
        }
      });
    }
  }
});