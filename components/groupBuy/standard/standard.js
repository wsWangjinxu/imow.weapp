import { joinGroupBuy, getGroupBuySku, getJoinedDetailList } from "../../../api/groupBuy/index";

let app = getApp();

Component({
  properties: {
    promotionId: {
      type: String,
      value: "",
      observer(val) {
        console.log(val);
        if (val) {
          getGroupBuySku("GET", { id: this.data.promotionId }).then(res => {
            console.log(res);
            let skuList = res.data.skuList;
            let category = res.data.categoryPropertys;
            let skus = res.data.skus;
            let tempArray = skuList;
            tempArray.forEach((ele, idx) => {
              //将对应的sku信息与skuList数组合并
              ele.skus = skus[idx];
            });
            
            //拼接完成的数据
            console.log(tempArray);

            this.setData({
              skuList: tempArray,
              num: skus.length ? (skus.length * 60 + 300) + 'px' : '100%'
            });
          });
        }
      }
    }
  },
  data: {
    name: "",
    phone: "",
    remark: ""
  },

  methods: {

    //确认参团
    submit() {
      let name = this.data.name;
      let phone = this.data.phone;
      let remark = this.data.remark;

      //获取选择产品的列表
      let skuList = this.data.skuList;
      console.log(skuList);
      let product = [];
      skuList.forEach((ele, idx) => {
        if (ele.num != 0) {
          product.push({
            skuCode: ele.skuCode,
            id: ele.skuId,
            num: ele.num ? ele.num : 0,
          });
        }
      });

      //验证选择的产品是否为空
      if (product.length === 0) {
        console.log("产品为空")
        wx.showToast({
          title: "请选择产品",
          image: "/static/icon/warning-white.png"
        });
        return;
      }

      //验证姓名不能为空
      if (!name) {
        wx.showToast({
          title: "姓名不能为空",
          image: "/static/icon/warning-white.png"
        });
        return;
      }

      //验证手机号码不能为空
      if (!phone) {
        wx.showToast({
          title: "手机号不能为空",
          image: "/static/icon/warning-white.png"
        });
        return;
      }

      //验证手机号是否正确
      if (!phone.match(/^1[3-9][0-9]{9}/)) {
        wx.showToast({
          title: "手机号码不正确",
          image: "/static/icon/warning-white.png"
        });
        return;
      }

      //收集用户的数据
      let data = {
        name,
        phone,
        remark,
        product,
        wxName: app.globalData.nickname,
        skuNum: product, 
        id: this.data.id
      }

      console.log(data);
      //通过验证以后提交拼团信息
      joinGroupBuy("POST", data).then(res => {
        if (res.data.status) {
          wx.showToast({
            title: "参团成功！",
            icon: "success"
          });
        }
      });
    },

    //更新不同元素的计数器的数量
    handleChange(e) {
      let index = e.currentTarget.dataset.id;
      let num = e.detail;
      let skuList = this.data.skuList;
      skuList[index].num = num;
      this.setData({
        skuList
      });
    },

    //更新姓名
    handleName(e) {
      let name = e.detail.value;
      this.setData({ name });
    },

    //更新电话
    handlePhone(e) {
      let phone = e.detail.value;
      this.setData({ phone });
    },

    //更新备注
    handleRemark(e) {
      let remark = e.detail.value;
      this.setData({ remark });
    }
  }
})