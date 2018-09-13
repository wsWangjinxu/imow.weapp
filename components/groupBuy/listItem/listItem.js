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
    }
  },

  data: {
    canEdit: true
  },

  methods: {
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
        if(res.data.status == true) {
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
            image: "/static/icon/warning-white.png"
          });
        }
      });
      
    },

    //删除一条团购记录
    delete(e) {
      let id = e.target.dataset.id;
      deleteGroupBuyRecord("POST", {id}).then(res => {
        console.log(res);
        if(res.data.status == true) {
          wx.showToast({
            title: "删除成功！",
            icon: "success"
          });
          this.setData({
            "ctn.status": "cancel"
          });
        } else {
          wx.showToast({
            title: "删除失败！",
            image: "/static/icon/warning-white.png"
          });
        }
      })
    },

    //确认定金
    confirm(e) {
      let id = e.target.dataset.id;
      confirmGroupBuyRecord("POST", {id}).then(res => {
        console.log(res);
        if(res.data.status == true) {
          wx.showToast({
            title: "确认成功！",
            icon: "success"
          });

          this.setData({
            "ctn.status": "confirmed"
          });
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