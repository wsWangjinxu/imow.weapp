import { promotionCartAdd } from "../../../api/special/index"

Component({
  properties: {
    skus: {
      type: Array,
      value: []
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
    //接收从子组件传过来的sku
    handleSku(e) {
      console.log(e);
      let skuCode = e.detail.skuCode;
      let skuArray = this.data.skus;

      this.setData({
        skuCode
      });

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
      let skus = this.data.skus;  //获取数据对象
      let skuCode = this.data.skuCode;  //获取当前点击的skuCode

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
          image: "/static/icons/warning-white.png"
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
            image: "/static/icons/warning-white.png"
          });
        } else {
          //更新产品的数量，更新店铺的数量
          this.triggerEvent("modifyNumber", { num: data.num, productId: data.productId });
        }
      });
    }
  }
});