import {
  promotionCartAdd
} from "../../../api/special/index"

Component({
  properties: {
    skus: {
      type: Array,
      value: []
    },
    promotionId: {
      type: String,
      value: ""
    },
    productId: {
      type: String,
      value: ""
    },
    skuShow: {
      type: Boolean,
      value: false,
      observer() {
        this.setData({
          skuCode: "",
          price: ""
        })
      }
    }
  },
  data: {
    skuCode: "", //当前选中的skuCode
    skuId: "", //当前选中的skuId
    skuName: "", //当前选中的skuName
    price: 0, //组件显示的价格
    number: 0, //当前的数量,
    oldNumber: 0 //当前数量的副本
  },

  methods: {
    //接收从子组件传过来的sku
    handleSku(e) {
      let skuCode = e.detail.skuCode;
      let skus = this.data.skus;
      let number;

      //获取数量
      skus.forEach(ele => {
        if (ele.skuCode == skuCode) {
          number = ele.number;
        }
      });

      this.setData({
        skuCode,
        number,
        oldNumber: number
      });

      //获取价格
      this.getPrice();
    },


    getPrice() {
      let skus = this.data.skus; //获取数据对象
      let skuCode = this.data.skuCode; //获取当前点击的skuCode
      let price;

      // 获取当前选中的sku的价格
      skus.forEach(ele => {
        if (ele.skuCode == skuCode) {
          price = ele.discountPrice;
        }
      });

      this.setData({
        price
      });
    },

    //点击加入购物车，将数量变为1
    addNumber() {
      //获取当前选中的内容
      let skus = this.data.skus;
      let skuCode = this.data.skuCode;

      //判断用户是否已经选择价格
      if (this.data.price) {
        this.setData({
          number: 1
        });

        //收集数据
        let data = {};
        skus.forEach(ele => {
          if (ele.skuCode == skuCode) {
            data.skuId = ele.skuId;
            data.skuCode = ele.skuCode;
            data.num = ele.number||1;
            data.cartId = ele.cartId;
          }
        });

        data.promotionId = this.data.promotionId;
        data.id = this.data.productId;

        //操作购物车
        this.modifyCart(data, this.data.oldNumber);
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
      let skus = this.data.skus;
      let skuCode = this.data.skuCode;

      //收集需要请求的数据
      let data = {};
      skus.forEach(ele => {
        if (ele.skuCode == skuCode) {
          data.skuId = ele.skuId;
          data.skuCode = ele.skuCode;
          data.num = e.detail
          data.cartId = ele.cartId;
        }
      });

      data.promotionId = this.data.promotionId;
      data.id = this.data.productId;

      //操作购物车
      this.modifyCart(data, this.data.oldNumber);
    },


    //修改购物车
    modifyCart(data, oldNumber) {
      console.log(data);
      let _this = this;
      promotionCartAdd("POST", data).then(res => {
        console.log(res);
        if (res.data.status != 20) {
          wx.showToast({
            title: "添加失败！",
            image: "/static/icons/warning-white.png"
          });
          console.log(_this.data.number);
          this.setData({
            number: oldNumber
          })
        } else {
          //收集数据
          let tempData = {
            num: data.num,
            productId: data.id,
            promotionId: data.promotionId,
            cartId: res.data.cartId,
            skuCode: data.skuCode,
            shopId:res.data.shopId,
            shopNum:res.data.shopNum
          }
          this.data.skus.forEach(ele => {
            if (ele.skuCode == data.skuCode) {
              ele.cartId =  res.data.cartId;
            }
          });
          console.log(tempData);
          //更新产品的数量，更新店铺的数量, 更新对应产品的对应skuId的数量和购物车Id
          this.triggerEvent("modifyNumber", tempData);
        }
      });
    }
  }
});