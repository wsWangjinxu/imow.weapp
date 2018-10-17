// components/index/navCircle.js
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
      value: false,
      observer: function(newVal) {
        console.log(this.data.product.isExpire);
        console.log(newVal);
        if(!this.data.product.isExpire) {
          if(newVal) {
            //判断是不是套餐，如果是套餐的话就按计算套餐的计算，如果不是套餐的就不按计算套餐的计算
            if(this.data.product.promotionModel) {
              this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.promotionModel.packageInfo.num});
            } else {
              this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.num});
            }
          } else {
            this.triggerEvent("selectedProduct", { index: this.data.index, status: 0 });
          }
        }
      }
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
      console.log(e);
      this.setData({
        "product.promotionModel.packageInfo.num": e.detail
      });
      if(this.data.isChecked) {
        if(this.data.product.promotionModel) {
          this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.promotionModel.packageInfo.num});
        } else {
          this.triggerEvent("selectedProduct", { index: this.data.index, status: 1 , num: this.data.product.num});
        }
      }
    },

    handleNum(e) {
      //点击修改product.num的值，然后批量修改属具的数量
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
