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
    selectedIndex: [],
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

        //计算已选的商品多少钱,并传递给结算条
        this.money();
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

        //计算已选的商品多少钱,并传递给结算条
        this.money();
      }

      //获取购物车Id
      let cartId = this.getCartId();
      this.triggerEvent("selectEvent", {
        cartId
      });
    },

    //全选 
    checkAll(e) {
      //更新一次状态
      this.setData({
        checkAll: true
      });
      this.money();
    },

    //取消全选
    checkCancel(e) {
      this.setData({
        checkAll: false
      });
      this.money();
    },

    money() {
      //给已选的商品排序
      let tempArray = this.data.selectedIndex;
      //给选中的数组排序，因为用户可能点选的顺序不一样
      tempArray.sort();
      //统计数量和总价
      //产品的元数据
      let productArray = this.data.shop.orderCartProductSkus;
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
        if (productArray[index].promotionModel === null) {
          //计算不是套餐的产品的总钱数
          single += productArray[index].price * num;
          if (productArray[index].accessories) {
            productArray[index].accessories.forEach(element => {
              accessory = accessory + element.price * num * element.num;
            })
          }
        } else {
          //计算是套餐的产品的总钱数
          let ctn = productArray[index].promotionModel.packageInfo.orderCartProductSkus;
          console.log(ctn)
          for (let j = 0; j < ctn.length; j++) {
            single += ctn[j].price * num * ctn[j].num;
            if (ctn[j].accessories) {
              ctn[j].accessories.forEach(ele => {
                accessory = accessory + ele.price * num * ele.num;
              })
            }
          }
        }
      }
      sumMoney = accessory + single;
      this.setData({
        sumMoney: sumMoney,
        sumNumber: sumNumber
      })
    },

    //获取购物车Id
    getCartId() {
      if (this.data.sumMoney !== 0) {
        //获取购物车ID
        let temp = this.data.selectedIndex;
        let productList = this.data.shop.orderCartProductSkus;

        let cartId = "";
        for (let i = 0; i < temp.length; i++) {
          if (productList[i].promotionModel === null) {
            let index = temp[i].index;
            cartId += productList[i].cartId + ","
          } else {
            let ctnList = productList[i].promotionModel.packageInfo.orderCartProductSkus;
            for (let j = 0; j < ctnList.length; j++) {
              cartId += ctnList[j].cartId + ",";
            }
          }
        }
        cartId = cartId.slice(0, cartId.length - 1);
        return cartId;
      }
      return false;
    },

    //结算
    pay() {
      let cartId = this.getCartId();
      if (cartId) {
        //跳转到确认订单页面
        wx.navigateTo({
          url: "/pages/orderConfirm/orderConfirm?cartId=" + cartId
        });
      } else {
        wx.showToast({
          title: "请选择商品",
          image: "/static/icon/warning-white.png"
        })
      }

    }
  }
})