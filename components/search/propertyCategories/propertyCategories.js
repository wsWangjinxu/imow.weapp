Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    }
  },
  data: {
    isFoldClass: "fold",
    name: "分类",
    itemList: "",
    selected: "",
    selectedStack: [],
    iconShow: false
  },
  ready() {
    console.log("这里");
    // //将第一个节点存入栈中
    let tempStack = this.data.selectedStack;
    tempStack.push({ id: this.data.ctn.key, name: this.data.ctn.key});

    //将第一次的key赋值给name
    // this.setData({
    //   name:  this.data.ctn.key,
    //   selectedStack: tempStack
    // });
    console.log("这里");
    console.log(this.data.ctn);
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

      //把当前选中的元素入栈
      tempStack.push({id: id, name: name});

      //更新栈
      this.setData({
        selectedStack: tempStack,
        name: name
      });

      //触发事件
      this.triggerEvent("searchClass",tempStack);
      if(tempStack.length > 1) {
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
        selectedStack: tempStack,
        name: tempStack[tempStack.length-1].name
      });

      if(tempStack.length <= 1) {
        //当前栈没有元素了，点击以后要屏蔽回退按钮
        this.setData({
          iconShow: false
        });
      }
      this.triggerEvent("searchClass", tempStack);     
    }
  }
})