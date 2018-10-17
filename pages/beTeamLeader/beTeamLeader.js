//index.js
import { addHeadGroup } from "../../api/beTeamLeader/beTeamLeader";

Page({
  data: {
    form: {
      name: "",
      phone: "",
      companyName: "",
      companyAddress: "",
      money: ""
    }
  },
  //事件处理函数
  onLoad: function (options) {

  },
  handleName(e) {
    this.setData({
      "form.name": e.detail.value
    });
  },
  handlePhone(e) {
    this.setData({
      "form.phone": e.detail.value
    });
  },
  handleCompanyName(e) {
    this.setData({
      "form.companyName": e.detail.value
    });
  },
  handleCompanyAddress(e) {
    this.setData({
      "form.companyAddress": e.detail.value
    });
  },
  handleMoney(e) {
    this.setData({
      "form.money": e.detail.value
    });
  },
  submit() {
    if (this.data.form.name === "") {
      wx.showToast({
        title: "联系人不能为空！",
        image: "/static/icons/warning-white.png"
      })
      return;
    }
    if (this.data.form.phone === "") {
      wx.showToast({
        title: "联系方式不为空！",
        image: "/static/icons/warning-white.png"
      })
      return;
    }
    if (this.data.form.companyName === "") {
      wx.showToast({
        title: "公司名称不为空！",
        image: "/static/icons/warning-white.png"
      })
      return;
    }
    if (this.data.form.companyAddress === "") {
      wx.showToast({
        title: "公司地址不为空！",
        image: "/static/icons/warning-white.png"
      })
      return;
    }
    if (this.data.form.money === "") {
      wx.showToast({
        title: "双十一预计采购金额不能为空！",
        image: "/static/icons/warning-white.png"
      })
      return;
    }
    // 收集数据
    let datas = {
      linkName: this.data.form.name,
      tel: this.data.form.phone,
      company: this.data.form.companyName,
      address: this.data.form.companyAddress,
      money: this.data.form.money
    };
    addHeadGroup("POST", datas).then(res => {
      if (res.data.status) {
        wx.showToast({
          title: "您已申请成功！客服稍后将会联系您！",
          icon: "success"
        })
        this.setData({
          "form.name": "",
          "form.phone": "",
          "form.companyName": "",
          "form.companyAddress": "",
          "form.money": ""
        });
      } else {
        wx.showToast({
          title: "申请失败，请重试！",
          image: "/static/icons/warning-white.png"
        })
      }
    });

  }
})