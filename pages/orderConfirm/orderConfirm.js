import { getOrderConfirmCart1, getOrderConfirmCart2, getOrderConfirmCart3 } from "../../api/user/cart"
import { getAddressList } from "../../api/user/address"
import { getInvoiceInfo } from "../../api/user/invoice"
import { addOrder } from "../../api/order/order"
import { getSelfPickAddress } from "../../api/product/index"


Page({
  data: {
    show: false,
    list: [
      {
        id: 101,
        title: "物流发货"
      },
      {
        id: 102,
        title: "自提"
      }
    ],
    selectedId: 101,
    orderConfirm: false,
    cartData: "",
    pick: false,
    //地址信息
    addrInfo: "",
    invoiceInfo: "",
    //发票信息
    invoice: "",
    //已经选择的选项
    checkedArray: ["售后协议", "服务协议", "阿母币", "优惠券"],
    //是否是用阿母币
    useImb: false,
    //是否使用优惠券
    useConpon: false,
    isChecked: true,
    showBtn: true,
    //备注
    remark: "",
    btnText: "",
    selfAddressId: "",
    status: "",
    orderPrice: 0
  },
  onLoad(option) {
    console.log(option);
    

    //下面一行注释用于测试，测试完毕以后放开注释,根据购物车id获取商品的信息
    if (option.cartIds) {
      //说明是从购物车过来的
      this.setData({
        btnText: "提交订单",
        cartId: option.cartIds,
        status: 1
      });
      getOrderConfirmCart1("GET", {cartIds: option.cartIds}).then(res => {
        this.firstRequest(res);
        this.checkboxChange();
      });

    } else if (option.groupBuyId) {
      //说明是从拼团页面过来的
      this.setData({
        btnText: "提交订单",
        collageId: option.groupBuyId,
        status: 2
      });
      getOrderConfirmCart3("GET", {collageId: option.groupBuyId}).then(res => {
        this.firstRequest(res);
        this.checkboxChange();
      });
    } else {
      //说明是从定金产品过来的
      this.setData({
        btnText: "提交订单",
        skuId: option.skuId,
        num: option.num,
        status: 3
      });
      getOrderConfirmCart2("GET", {skuId: option.skuId,
        num: option.num}).then(res => {
        this.firstRequest(res);
        this.checkboxChange();
      });
    }

    //第一次进入确认订单页面设置默认的地址
    getAddressList("POST").then(res => {
      let addrList = res.data.addressList;
      this.setData({
        addrInfo: addrList[0],
        invoiceInfo: addrList[0],
      });
    });

    //获取物流发货的发票信息
    getInvoiceInfo("POST").then(res => {
      this.setData({
        invoice: res.data.invoiceInfo
      });
    });

    this.checkboxChange();

  },

  //每次页面显示的时候都获取缓存中的地址
  onShow() {
    //每次页面显示的时候都获取地址列表(因为用户可能新增地址)，如果缓存中有对应的地址id，就取id对应的地址作为订单的地址，没有的话就取第一条
    getAddressList("POST").then(res => {
      //存储地址列表
      let addrList = res.data.addressList;
      let status = wx.getStorageSync("status");
      let addrId = wx.getStorageSync("addrId");
      /*
      生命周期onLoad->onShow，这个时候缓存中可能没有内容，在onLoad中设置了地址，
      在onShow中需要判断缓存内容是否有，如果有内容就执行地址替换，如果没有什么也不做
      */
      if (addrId) {
        addrList.forEach(element => {
          if (element.id === addrId) {
            if (status) {
              this.setData({
                addrInfo: element
              })
            } else {
              this.setData({
                invoiceInfo: element
              })
            }
          }
        });
      }
    });
  },

  //第一次请求
  firstRequest(res) {
    console.log(res);
    let selfAddressData = "";

     //拼接产品id
     let product = res.data.data.orderCartProductSkus;
     product.forEach(ele => {
       selfAddressData = selfAddressData + ele.id + ',';
     });

     //去掉结尾的逗号
     selfAddressData = selfAddressData.slice(0, selfAddressData.length - 1);
     //获取自提点
     this.getSelfPick(selfAddressData);
     //设置数据
     this.setData({
       cartData: res.data.data
     });
  },

  checkboxChange(e) {
    if (e) {
      this.setData({
        checkedArray: e.detail.value
      });
    }


    let useImb = false;
    let useConpon = false;
    let orderPrice = this.data.cartData.orderProductPrice;

    //判断是否勾选阿母币
    if (~this.data.checkedArray.indexOf("阿母币")) {
      useImb = true;
      //含有定金产品
      if(this.data.cartData.depositPrice) {
        orderPrice = orderPrice - this.data.cartData.imb + this.data.cartData.earnestImb;
      } else {
        //没有定金产品
        orderPrice -= this.data.cartData.imb;
      }
    } else {
      useImb = false;
    }

    //判断是否勾选优惠券
    if (~this.data.checkedArray.indexOf("优惠券")) {
      useConpon = true;
      //有定金产品
      if(this.data.cartData.depositPrice) {
        orderPrice = orderPrice - this.data.cartData.couponTotleDiscount + this.data.cartData.earnestCouponDiscount;
      } else {
        //没有定金产品
        orderPrice -= this.data.cartData.couponTotleDiscount;
      }
    } else {
      useConpon = false;
    }

    //活动优惠
    if(this.data.cartData.promotionDiscount) {
      orderPrice -= this.data.cartData.promotionDiscount;
    }

    let showBtn;

    if (~this.data.checkedArray.indexOf("售后协议") && ~this.data.checkedArray.indexOf("服务协议")) {
      showBtn = true;
    } else {
      showBtn = false;
    }

    //设置阿母币和优惠券的显示状态
    this.setData({
      useImb,
      useConpon,
      orderPrice,
      showBtn: showBtn
    });
  },

  getSelfPick(data) {
    getSelfPickAddress("GET", { productIds: data }).then(res => {
      let selfAddress = res.data.selfPickAddresses;
      if (selfAddress.length > 0) {
        this.setData({
          selfAddress
        });
      } else {
        this.setData({
          list: [{
            id: 101,
            title: "物流发货"
          }]
        });
      }
    });
  },

  //控制切换
  handleTabChange(e) {
    if (e.detail === 101) {
      this.setData({
        pick: false,
        selfAddressId: ""
      });
    } else {
      this.setData({
        pick: true
      });
    }
  },

  //修改备注信息
  handleRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  //设置自提订单的自提点
  handleRadioChange(e) {
    this.setData({
      selfAddressId: e.detail.value
    });
  },

  //提交订单
  addOrder() {
    if (this.data.showBtn) {
      let cartData = this.data.cartData;
      let cartId = "";
      for (let i = 0; i < cartData.orderCartProductSkus.length; i++) {
        cartId = cartId + String(cartData.orderCartProductSkus[i].cartId) + ",";
      }
      cartId = cartId.slice(0, cartId.length - 1);

      let db = {
        UserOrderShipId: this.data.addrInfo.id,
        UserReceiptShipId: this.data.invoiceInfo.id,
        UseImb: this.data.useImb,
        UseCoupons: this.data.useConpon,
        Remark: this.data.remark,
        selfAddressId: this.data.selfAddressId
      }
      if(this.data.status === 1) {
        db.cartIds = cartId
      } 

      if(this.data.status === 2 ) {
        db.collageId = this.data.collageId;
      }

      if(this.data.status === 3) {
        db.skuId = this.data.skuId;
        db.num = this.data.num;
      }

      console.log(db);
      addOrder("POST", db).then(res => {
        if (res.data.status === 20) {
          wx.redirectTo({
            url: "/pages/checkPay/checkPay?orderId=" + res.data.orderId
          });
        } else {
          wx.showToast({
            title: String(res.data.errMsg),
            image: "/static/icons/warning-white.png"
          });
        }
      });
    } else {
      wx.showToast({
        title: "请查看协议",
        image: "/static/icons/warning-white.png"
      })
    }
  }
});



