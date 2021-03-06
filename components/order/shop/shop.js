// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shop: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedIndex: [], //已选购物车的下标的数组
    checkAll: false,
    //用于全选以后，用户取消单个产品的时候取消店铺标题的全选状态
    cancelCheck: false,
    sumMoney: 0,
    sumNumber: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //记录用户选中的商品
    selectedProduct(e) {
      if (e.detail.status === 1) {
        let tempArray = this.data.selectedIndex;
        let temp = 0;
        //当用户点击stepper的时候，更新已选中的购物车中的数据
        tempArray.forEach(element => {
          if (element.index == e.detail.index) {
            element.num = e.detail.num;
            temp = 1;
          }
        });
        //当购物车中没有选中这件商品的时候，将这件商品加入购物车
        if (temp == 0) {
          tempArray.push({
            index: e.detail.index,
            num: e.detail.num
          });
        }
        this.setData({
          selectedIndex: tempArray
        });
      } else {
        let tempArray = this.data.selectedIndex;
        tempArray.forEach((element, index) => {
          if (element.index === e.detail.index) {
            tempArray.splice(index, 1);
          }
        });
        this.setData({
          selectedIndex: tempArray,
          cancelCheck: false
        });
      }
      //获取购物车Id
      let cartId = this.getCartId();
      this.triggerEvent("selectEvent", {
        cartId
      });
      this.money();
    },

    //全选 
    checkAll(e) {
      let that = this;
      console.log(this.data.selectedIndex);
      //更新一次状态
      this.setData({
        checkAll: true
      }, function(){
        that.money();
      });
    },

    //取消全选
    checkCancel(e) {
      let that = this;
      this.setData({
        checkAll: false
      }, function(){
        that.money();
      });
    },

    money() {
      //给已选的商品排序
      let tempArray = this.data.selectedIndex;
      console.log(tempArray);

      //给选中的数组排序，因为用户可能点选的顺序不一样
      tempArray.sort();
      //统计数量和总价
      //产品的元数据
      let productArray = this.data.shop.orderCartProductSkus;
      console.log(productArray); //eslint-disable-line
      let tempLength = 0;
      //计算有效产品的数量
      for (let i = 0; i < productArray.length; i++) {
        if(productArray[i].promotionModel) {
          if(!productArray[i].promotionModel.isExpire) {
            tempLength += 1;
          }
        } else {
          if(!productArray[i].isExpire) {
            tempLength += 1;
          }
        }
      }

      //产品的总件数
      let sumNumber = 0;
      //产品的总钱数
      let sumMoney = 0;
      //数据的总钱数
      let accessory = 0;
      let single = 0;
      if (tempArray.length === tempLength) {
        this.setData({
          cancelCheck: true
        });
      }
      for (let i = 0; i < tempArray.length; i++) {
        let index = tempArray[i].index;
        let num = tempArray[i].num;
        sumNumber = sumNumber + num;
        console.log(num);
        if (productArray[index].promotionModel === null || productArray[index].promotionModel.packageInfo == null ) {
          console.log("执行的这里");
          //计算不是套餐的产品的总钱数
          single = single + productArray[index].price * num;
          if (productArray[index].accessories) {
            productArray[index].accessories.forEach(element => {
              accessory = accessory + element.price * num * element.num;
            })
          }
        } else {
          //计算是套餐的产品的总钱数
          let ctn = productArray[index].promotionModel.packageInfo.orderCartProductSkus;
          for (let j = 0; j < ctn.length; j++) {
            single = single + ctn[j].price * num;
            if (ctn[j].accessories) {
              ctn[j].accessories.forEach(ele => {
                accessory = accessory + ele.price * num *  ele.num;
              })
            }
          }
        }
      }
      sumMoney = accessory + single;
      this.setData({
        sumMoney: parseFloat(sumMoney.toFixed(2)),
        sumNumber: sumNumber
      })
    },

    //获取购物车Id
    getCartId() {
      if (this.data.sumMoney !== 0) {
        //获取购物车ID
        let temp = this.data.selectedIndex;
        let productList = this.data.shop.orderCartProductSkus;
        console.log(productList);

        let cartId = "";
        for (let i = 0; i < temp.length; i++) {
          let index = temp[i].index;
          if (productList[index].promotionModel === null) {
            cartId += productList[index].cartId + ","
          } else {
            let ctnList = productList[index].promotionModel.packageInfo.orderCartProductSkus;
            console.log(ctnList);
            for (let j = 0; j < ctnList.length; j++) {
              cartId += ctnList[j].cartId + ",";
            }
          }
        }
        cartId = cartId.slice(0, cartId.length - 1);
        console.log(cartId);
        return cartId;
      }
      return false;
    },

    //结算
    pay() {
      let cartId = this.getCartId();
      console.log(cartId);
      if (cartId) {
        //跳转到确认订单页面
        wx.navigateTo({
          url: "/pages/orderConfirm/orderConfirm?cartIds=" + cartId
        });
      } else {
        wx.showToast({
          title: "请选择商品",
          image: "/static/icons/warning-white.png"
        })
      }

    }
  }
})