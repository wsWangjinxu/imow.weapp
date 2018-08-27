Component({
  properties: {
    ctn: {
      type: Object,
      value: {
        key: "分类",
        propertyCategories: [
        {
          id: 101,
          name: "手动搬运车"
        },
        {
          id: 102,
          name: "小金刚"
        },{
          id: 103,
          name: "小金刚"
        },{
          id: 104,
          name: "小金刚"
        },{
          id: 105,
          name: "小金刚"
        },
        {
          id: 106,
          name: "锂电一号"
        }]
      }
    }
  },
  onShow() {
    console.log("我已经准备好了");
  },
  data: {
    isFoldClass: "fold",
    name: "",
    itemList: "",
    selected: "",
    selectedStack: [],
    iconShow: false
  },
  methods: {
    //是否折叠分类
    fold: function () {
      if(this.data.isFoldClass === "fold") {
        this.setData({
          isFoldClass: "unfold"
        })
      } else {
        this.setData({
          isFoldClass: "fold"
        })
      }
    },

    //点击选中子元素的内容
    handleSelected(e){

      //获取点击元素的name和id
      let name = e.target.dataset.name;
      let id = e.target.dataset.id;

      //获取当前记录栈
      let tempStack = this.data.selectedStack;

      //如果是第一次点击的元素，将第一传入的key一并传入
      if(!tempStack.length) {
        tempStack.push(this.data.ctn.key);
      }

      //把当前选中的元素入栈
      tempStack.push(id);

      //更新栈
      this.setData({
        selectedStack: tempStack
      });

      //触发事件
      this.triggerEvent("search", {id: id});
      if(tempStack) {
        this.setData({
          iconShow: true
        });
      }
    },
    
    //点击title回退到上一级
    backKeyword(){
      
      //获取当前调用栈
      let tempStack = this.data.selectedStack;
      
      //弹出当前的栈顶元素（当前栈顶元素即为当前的分类）
      tempStack.pop();

      //用新的数组替换原来的数组
      this.setData({
        selectedStack: tempStack
      });

      if(tempStack.length==1) {
        //当前栈没有元素了，点击以后要屏蔽回退按钮
        this.setData({
          iconShow: false
        });
      }
      this.triggerEvent("search", {id: tempStack[tempStack.length-1]});     
    }
  }
})