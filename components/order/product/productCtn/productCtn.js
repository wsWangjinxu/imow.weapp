import { changeNum } from "../../../../api/user/cart"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: -1
    },
    super: {
      type: Boolean,
      value: false
    },
    isChecked: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //当产品为套餐的时候修改套餐的数量
    handleChange(e){
      let that = this;
      debugger;
      changeNum("POST", {
        cartId: that.data.product.promotionModel.packageInfo.cartIds,
        cartNum: e.detail 
      }).then(res => {
        console.log(res);
        if(res.data.status == 20) {
          debugger
          that.setData({
            "product.promotionModel.packageInfo.num": e.detail
          });
          if(that.data.isChecked) {
            if(that.data.product.promotionModel) {
              that.triggerEvent("selectedProduct", { index: that.data.index, status: 1 , num: that.data.product.promotionModel.packageInfo.num});
            } else {
              that.triggerEvent("selectedProduct", { index: that.data.index, status: 1 , num: that.data.product.num});
            }
          }
        }
      });
    },

    handleNum(e) {
      debugger;
      //点击修改product.num的值，然后批量修改属具的数量
      console.log(this.data.product);
      this.setData({
        "product.num": e.detail.num
      });
      if(this.data.isChecked) {
        if(this.data.product.promotionModel) {
          this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.promotionModel.packageInfo.num});
        } else {
          this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.num});
        }
      }
    },

    //根据属具或者单品触发的事件，选中整个产品
    checkProduct(e) {
      if(e.detail.status === 1) {
        //选中单个产品包括属具
        this.setData({
          isChecked: true
        });
        if(this.data.product.promotionModel) {
          this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.promotionModel.packageInfo.num});
        } else {
          this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.num});
        }
      } else {
        //取消单个产品包括属具
        this.setData({
          isChecked: false,
          checkAll: false
        });
        this.triggerEvent("selectedProduct", { index: this.data.index, status: 0 });
      }
    }
  }
})
