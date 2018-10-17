import { getGroupBuyList } from "../../../api/groupBuy/index"

Page({
  data: {
    list: [
      {
        id: "101",
        title: "我参与的拼团"
      },
      {
        id: "102",
        title: "我发起的拼团"
      }
    ],
    selectedId: "101",
    statusList: [
      {
        id: "1101",
        title: "全部"
      },
      {
        id: "1102",
        title: "进行中"
      },
      {
        id: "1103",
        title: "已结束"
      }
    ],
    statusSelectedId: "1101",
    // isLeader: false,
    status: "all",
    type: "joined",
    page: 1
  },

  onLoad() {
    this.getList();
  },

  getList() {
    //收集数据
    let data = {
      page: this.data.page,
      status: this.data.status,
      type: this.data.type
    };

    //发送请求
    getGroupBuyList("GET", data).then(res => {
      // let isLeader = res.data.isLeader;
      let groupBuyList = res.data.groupBuyList;
      this.setData({
        // isLeader,
        groupBuyList
      });
    });
  },

  //更改我参与的拼团，我发起的拼团
  handleTabChange(e) {
    let id = e.detail;
    if (id == "101") {
      //请求我发起的拼团
      this.setData({
        type: "joined",
        page: 1
      });
      this.getList();
    } else {
      //请求我参与的拼团
      this.setData({
        type: "launch",
        page: 1
      });
      this.getList();
    }
  },

  //更改状态
  handleTabChange2(e) {
    let id = e.detail;

    //请求全部
    if (id == "1101") {
      this.setData({
        status: "all",
        page: 1
      });
      this.getList();
      return;
    }

    //请求进行中
    if (id == "1102") {
      this.setData({
        status: "underway",
        page: 1
      })
      this.getList();
      return;
    }

    //请求进行中
    if (id == "1103") {
      this.setData({
        status: "end",
        page: 1
      });
      this.getList();
    }
  },

  //下拉刷新
  onPullDownRefresh() {
    this.getList();
    wx.stopPullDownRefresh();
  },

  //上拉加载
  onReachBottom() {
    wx.showLoading({
      title: '玩命加载中'
    });
    //加载下一页的内容
    let page = this.data.page;

    this.setData({
      page: page + 1
    });

    let data = {
      page: this.data.page,
      status: this.data.status,
      type: this.data.type
    };

    //保存已经请求到的内容
    let tempArray = this.data.groupBuyList;
    getGroupBuyList("GET", data).then(res => {
      if (res.data.groupBuyList) {
        //拼接数据
        let groupBuyList = res.data.groupBuyList;
        groupBuyList.forEach(element => {
          tempArray.push(element);
        });
        //加载新的内容
        this.setData({
          groupBuyList: tempArray
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showToast({
          title: "加载失败！",
          image: "/static/icons/warning-white.png"
        });
      }
    }).catch(err => {
      wx.hideLoading();
        wx.showToast({
          title: "网络连接失败！",
          image: "/static/icons/warning-white.png"
        });
    });
  }
})
