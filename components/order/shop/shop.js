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
      if(e.detail.status === 1) {
        let tempArray = this.data.selectedIndex;
        let temp = 0;
        tempArray.forEach(element => {
          if(element.index == e.detail.index) {
            element.num = e.detail.num;
            temp = 1;
          }
        });
        if(temp == 0) {
          tempArray.push({index:e.detail.index, num: e.detail.num });
        }
        this.setData({
          selectedIndex: tempArray
        });

        //计算已选的商品多少钱,并传递给结算条
        this.money();
      } else {
        let tempArray = this.data.selectedIndex;
        tempArray.forEach((element,index)=>{
          if(element.index === e.detail.index) {
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
      let productArray = this.data.shop.orderCartProductSkus;
      let sumNumber = 0;
      let sumMoney = 0;
      let accessory = 0;
      let single = 0;
      if(tempArray.length === productArray.length) {
        this.setData({
          cancelCheck: true
        });
      }
      for(let i = 0; i < tempArray.length; i ++) {
        let index = tempArray[i].index;
        let num = tempArray[i].num;
        sumNumber = sumNumber + num;
        single += productArray[index].price * num;
        productArray[index].accessories.forEach(element => {
          accessory = accessory + element.price * num * element.num;
        })
      }
      sumMoney = accessory + single;
      this.setData({
        sumMoney: sumMoney,
        sumNumber: sumNumber
      })
    },

    //结算
    pay(e) {
      if(this.data.sumMoney === 0) {
        wx.showToast({
          title: "请选择商品",
          image: "/static/icon/warning-white.png"
        })
      } else {
        //获取购物车ID
        let temp = this.data.selectedIndex;
        let productList = this.data.shop.orderCartProductSkus;

        let cartId = "";
        for(let i = 0; i < temp.length; i++) {
          let index = temp[i].index;
          cartId += productList[index].cartId + ","
        }
        cartId = cartId.slice(0, cartId.length-1);
        //跳转到确认订单页面
        wx.navigateTo({
          url: "/pages/orderConfirm/orderConfirm?cartId=" + cartId
        });
      }
    }
  }
})
