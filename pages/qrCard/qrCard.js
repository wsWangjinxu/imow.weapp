import { getQRCard } from "../../api/qr/index";

Page({
  data: {
    status: true,
    show: false
  },

  onLoad(option) {
    let shopId = option.shopId;
    getQRCard("POST", { shopId }).then(res => {
      console.log(res);
      this.setData({
        info: res.data
      });
    });
  },

  //查看营业执照
  handleLicense() {
    this.setData({
      show: true,
      status: true
    });
  },

  //查看微信名片
  handleCard() {
    this.setData({
      show: true,
      status: false
    })
  },

  //关闭弹出层
  onClose() {
    this.setData({
      show: false
    });
  }
})
