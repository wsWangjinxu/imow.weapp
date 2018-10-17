import {getUpdateAddress, deleteAddress, addAddress} from "../../api/user/address";

const app = getApp()

Page({
  data: {
    show: false,
    hasDelete: true,
    name: "",         //姓名
    phone: "",        //手机号码
    phoneCall: "",    //电话
    detail: "",       //详细地址
    postal: "",       //邮政编码
    region: "",       //省市县
    verifyKey: false  //提交时候的验证key
  },
  onLoad(options) {
    let id = options.id;
    let that = this;
    //根据路径来设置头部导航条的文本，点击编辑过来的显示编辑地址，点击新增过来的显示新增地址
    if(!id) {
      wx.setNavigationBarTitle({
        title: "新增地址"
      });
      this.setData({
        hasDelete: false
      })
    } else {
      getUpdateAddress("POST", {
        id: id
      }).then(res=>{
        that.setData({
          id: id,
          name: res.data.consignee,
          phone: res.data.phone,
          phoneCall: res.data.phoneCall,
          detail: res.data.detail,
          postal: res.data.postal,
          region: res.data.address
        });
      });
    }
  },

  //保存一条地址
  saveAddress() {
    let form = this.data;
    let verifyKey = Boolean(form.name && form.phone && form.region && form.detail);
    console.log(verifyKey);
    if(verifyKey) {
      let data = {
        id: form.id,
        region: form.region,
        detail: form.detail,
        consignee: form.name,
        phone: form.phone,
        postal: form.postal,
        phoneCall: form.phoneCall
      }

      //这里发送请求保存地址
      addAddress("POST", data).then(res => {
        console.log(res.data.status);
        if(res.data.status) {
          wx.showToast({
            title: "保存成功！",
            icon: "success"
          });

          setTimeout( function (){
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        }
      });
    } else {
      //验证没有通过
      wx.showToast({
        title: "请填写必要信息",
        image: "/static/icons/warning-white.png"
      })
    }
  },

  //删除一条地址
  delete() {
    deleteAddress("POST", {
      id: this.data.id
    }).then(res => {
      if(res.data.status) {
        wx.showToast({
          title: "删除成功",
          icon: "success"
        });
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      } else {
        wx.showToast({
          title: "删除失败",
          image: "/static/icons/warning-white.png"
        });
      }
    });
  },

  //点击取消按钮跳转到上一页
  cancel() {
    wx.navigateBack({
      delta: 1
    });
  },

  //获取用户选择的地区
  bindRegionChange(e) {
    console.log(e.detail.value);
    this.setData({
      region: e.detail.value
    });
  },

  /************** 表单验证 **************/
  //验证姓名不能为空
  nameVerify(e) {
    console.log(this.data.name);
    let value = e.detail.detail.value;
    if(!value) {
      wx.showToast({
        title: "收货人不能为空",
        image: "/static/icons/warning-white.png"
      });
    } else {
      this.setData({
        name: value
      });
    }   
  },

  //验证手机号码的正确性
  phoneVerify(e) {
    let value = e.detail.detail.value;
    if(!value) {
      wx.showToast({
        title: "手机号不能为空",
        image: "/static/icons/warning-white.png"
      });
    } else {
      if(!value.match(/^1[3-9][0-9]{9}/)) {
        wx.showToast({
          title: "手机号码不正确",
          image: "/static/icons/warning-white.png"
        });
      } else {
        this.setData({
          phone: value
        });
      }
    }
  },

  regionVerify(e) {
    //地区的验证
    let  value = e.detail.detail.value;
    if(!value) {
      wx.showToast({
        title: "地区不能为空",
        image: "/static/icons/warning-white.png"
      });
    } else {
      this.setData({
        region: value
      });
    }
  },

  detailVerify(e) {
    //详细地址的验证
    let  value = e.detail.detail.value;
    if(!value) {
      wx.showToast({
        title: "详细地址为空",
        image: "/static/icons/warning-white.png"
      });
    } else {
      this.setData({
        detail: value
      });
    } 
  }
})
