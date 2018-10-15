import { getCities } from "../../../api/search/search"

Component({
  properties:{
    //品牌
    brandList: {
      type: Array,
      value: []
    },
    //属性
    propertyList: {
      type: Array,
      value: []
    },
    //分类
    propertyCategories: {
      type: Object,
      value: {}
    },
    selectedId: {
      type: String,
      value: ""
    }
  },
  data: {
    isFoldClass: "fold",
    searchData:{
      minPrice:"",
      maxPrice: "",
      propertyList: []
    },
    cities:""
  },
  ready(){
    getCities("POST").then(res => {
      //获取城市列表
      this.setData({
        cities: res.data.cities
      });
    });
    
  },
  methods: {
    //控制页面滚动
    move() {},

    //点击重置
    reset() {
      this.triggerEvent("reset");
    },

    //点击关闭筛选面板
    close() {
      this.triggerEvent("close", { val: 1});
    },

    //获取用户选择的可享服务
    handleService(e) {
      //更新可享服务的数据
      this.setData({
        "searchData.useEarnest": Boolean(e.detail.useEarnest),
        "searchData.useImb": Boolean(e.detail.useImb),
        "searchData.useCrePoint": Boolean(e.detail.useCrePoint)
      });
      //调用最终的搜索
      this.search();
    },

    //获取用户选择的品牌的数据
    handleBrand(e) {
      this.setData({
        "searchData.brand0": e.detail.name
      });
      //调用最终的搜索
      this.search();
    },

    //获取用户选择的分类的数据
    handleClass(e) {
      this.setData({
        "searchData.category": e.detail 
      });
      //调用最终的搜索
      this.search();
    },

    //价格区间更新
    handleMinInput(e) {
      this.setData({
        "searchData.minPrice": e.detail.value
      });
      //调用最终的搜索
      this.search();
    },
    handleMaxInput(e) {
      this.setData({
        "searchData.maxPrice": e.detail.value
      });
      //调用最终的搜索
      this.search();
    },

    //获取用户选择的城市
    handleCity(e) {
      this.setData({
        "searchData.shipArea": e.detail.name
      });
      //调用最终的搜索
      this.search();
    },

    //获取用户选择的属性
    searchProperties(e){
      let tempPropertyList = this.data.searchData.propertyList;
      if(e.detail.name === false) {
        tempPropertyList.forEach(element => {
          if(element.id === e.detail.id) {
            //点击的是取消，把id相同的元素从数组中删除
            tempPropertyList.pop(element);
          }
        });
      } else {
        tempPropertyList.push(e.detail);
      }
      
      //设置属性列表
      this.setData({
        "searchData.propertyList": tempPropertyList
      });

      //调用最终的搜索
      this.search();
    },

    //这里触发搜索事件,在这里将搜索的数据全部传递到list页面中，然后执行搜索，根据properties的内容修改组件的值
    search() {
      this.triggerEvent("search", this.data.searchData);
    }
  }
})