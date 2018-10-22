import { confirmGroupBuyRecord, deleteGroupBuyRecord, saveLeaderRemark } from "../../../api/groupBuy/index";

Component({
  properties: {
    ctn: {
      type: Object,
      value: {}
    },
    isLeader: {
      type: Boolean,
      value: false
    },
    index: {
      type: Number,
      value: -1
    }
  },

  data: {
    canEdit: true
  },

  

  methods: {
    handleRingUp() {
      let phone = this.data.ctn.phone
      wx.makePhoneCall({
        phoneNumber: String(phone),
        success() {
          console.log("电话拨打成功！");
        }
      });
    },
    //编辑
    edit() {
      this.setData({
        canEdit: false
      });
    },

    //取消编辑
    cancelEdit(e) {
      console.log(e.target.dataset.id);
      saveLeaderRemark("POST", {
        leaderRemark: e.detail.value,
        id: e.target.dataset.id
      }).then(res => {
        console.log(res);
        if (res.data.status == true) {
          this.setData({
            canEdit: true,
            "ctn.leaderRemark": e.detail.value
          });
          wx.showToast({
            title: "修改成功！",
            icon: "success"
          });
        } else {
          this.setData({
            canEdit: true
          });
          wx.showToast({
            title: "修改失败！",
            image: "/static/icons/warning-white.png"
          });
        }
      });

    },

    //删除一条团购记录
    delete(e) {
      let id = e.target.dataset.id;
      let _this = this;
      wx.showModal({
        title: "确认删除拼单？",
        content: "删除之后拼单状态将变为已取消状态",
        success(data) {
          if (data.confirm === true) {
            deleteGroupBuyRecord("GET", { id }).then(res => {
              console.log(res);
              if (res.data.status == true) {
                wx.showToast({
                  title: "删除成功！",
                  icon: "success"
                });
                _this.setData({
                  "ctn.status": "cancel"
                });
                _this.triggerEvent("listUpdate");
              } else {
                wx.showToast({
                  title: "删除失败！",
                  image: "/static/icons/warning-white.png"
                });
              }
            })
          }
        }
      })
    },

    //确认定金
    confirm(e) {
      let id = e.target.dataset.id;
      let _this = this;
      wx.showModal({
        title: "确认收到定金？",
        content: "如果您确认收到对方定金，请按确定键，如未收到请取消。",
        success(data) {
          if (data.confirm === true) {
            confirmGroupBuyRecord("POST", { id }).then(res => {
              console.log(res);
              if (res.data.status == true) {
                wx.showToast({
                  title: "确认成功！",
                  icon: "success"
                });

                _this.setData({
                  "ctn.status": "confirmed"
                });
                _this.triggerEvent("listUpdate");
              } else {
                wx.showToast({
                  title: "确认失败！",
                  image: "/static/icon/warning-white,pne"
                })
              }
            })
          }
        }
      })
    }
  }
})