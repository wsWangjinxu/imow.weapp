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
      type: Array,
      value: []
    }
  },
  data: {
    isFoldClass: "fold",
    searchData:{
      minPrice:"",
      maxPrice: "",
      PorpertyList: []
    },
    cities:""
  },
  ready(){
    getCities("POST").then(res => {
      console.log(res);
      this.setData({
        cities: res.data.cities
      });
    });
    
  },
  methods: {
    //监听子元素触发的搜索事件
    handleSearch(e) {
      console.log(e);
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
      console.log(this.data.searchData);
    },

    //获取用户选择的品牌的数据
    handleBrand(e) {
      this.setData({
        "searchData.brand0": e.detail.name
      });
      //调用最终的搜索
      console.log(this.data.searchData);
    },

    //获取用户选择的分类的数据
    handleClass(e) {
      this.setData({
        "searchData.category": e.detail 
      });
      //调用最终的搜索
      console.log(this.data.searchData);
    },

    //价格区间更新
    handleMinInput(e) {
      console.log(e.detail.value);
      this.setData({
        "searchData.minPrice": e.detail.value
      });
      //调用最终的搜索
      console.log(this.data.searchData);
    },
    handleMaxInput(e) {
      this.setData({
        "searchData.maxPrice": e.detail.value
      });
      //调用最终的搜索
      console.log(this.data.searchData);
    },

    //获取用户选择的城市
    handleCity(e) {
      console.log(e.detail.name);
      this.setData({
        "searchData.shipArea": e.detail.name
      });
      //调用最终的搜索
      console.log(this.data.searchData);
    },

    //获取用户选择的属性
    searchProperties(e){
      console.log(e.detail);
      let tempPropertyList = this.data.searchData.PorpertyList;
      tempPropertyList.push(e.detail);
      this.setData({
        "searchData.PorpertyList": tempPropertyList
      });

      //调用最终的搜索
      console.log(this.data.searchData);
    }
  }
})