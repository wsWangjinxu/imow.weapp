import {getUpdateAddress} from "../../api/user/address";

const app = getApp()

Page({
  data: {
    show: false,
    hasDelete: true,
    items: [
      {
        text: "所有城市",
        children: [
          {
            text: "温州",
            id: 1002
          },
          {
            text: "杭州",
            id: 1003
          }
        ]
      }
    ],
    name: "",
    phone: "",
    phoneCall: "",
    detail: "",
    postal: ""
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
        console.log(res.data)
        that.setData({
          name: res.data.consignee,
          phone: res.data.phone,
          phoneCall: res.data.phoneCall,
          detail: res.data.detail,
          postal: res.data.postal
        });
      })
    }
  },

  showTree() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    })
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({ detail = {} }) {
    this.setData({
      activeId: detail.id
    });
  }
})
