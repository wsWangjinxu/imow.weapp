import { getGroupBuyStage } from "../../../api/groupBuy/index";

Component({
  properties: {
    ctn: {
      type: Object,
      value: {},
      observer(val) {
        if (val) {
          this.clock();
        }
      }
    },
    stageId: {
      type: String,
      value: "",
      observer(val) {
        console.log(val);
        if (val) {
          //请求阶段信息
          this.getStage();
        }
      }
    }
  },
  data: {
    day: "",  //天
    hour: "", //时
    min: "",  //分
    sec: "",  //秒
    isOver: false,  //活动是否已经结束
    isIng: "",  //活动是否正在进行中,
    precent: 0
  },

  methods: {
    clock() {
      console.log(this.data);
      //获取服务器传过来的时间
      let startTime = this.data.ctn.startTime;
      let currentTime = this.data.ctn.currentTime;
      let endTime = this.data.ctn.endTime;
      //绑定this
      let _this = this;
      //时间差
      let temp;
      //判断活动是否已经结束
      if (currentTime >= endTime) {
        //设置结束状态
        this.setData({
          isOver: true
        });
      } else {
        //活动还没有开始,那么判断是正在进行中还是还未开始
        if (currentTime < startTime) {
          //活动还未开始
          _this.setData({
            isIng: false
          });
          temp = Number(startTime) - Number(currentTime);
        } else {
          _this.setData({
            isIng: true
          });
          temp = Number(endTime) - Number(currentTime);
        }
      }
      // console.log(temp);
      //倒计时
      let timer = setInterval(function () {
        //计算天，时，分，秒
        let day = parseInt(temp / 1000 / 60 / 60 / 24, 10);
        let hour = parseInt(temp / 1000 / 60 / 60, 10);
        let min = parseInt(temp / 1000 / 60, 10);
        let sec = parseInt(temp / 1000, 10);
        sec = sec - min * 60;
        min = min - hour * 60;
        hour = hour - day * 24;

        //基本上每隔一分钟获取一次进度条的状态
        if (sec == 0) {
          console.log("获取进度条的状态");
          _this.getStage();
        }

        //每个循环更新天，时，分，秒
        _this.setData({
          day,
          hour,
          min,
          sec
        });

        //进行中的活动完毕以后改变文字说明，结束活动，清除定时器，如果判断sec === 0，则会因为异步的问题，不显示时间用完为0的1瞬间
        if (_this.data.isIng && !day && !hour && !min && sec < 0) {
          _this.setData({
            isOver: true
          });
          clearInterval(timer);
        }

        //若果是未开始的活动在时间执行完以后改变文字说明进入进行中的状态
        if (!_this.data.isIng && !day && !hour && !min && !sec) {
          //因为设置完了以后就会直接减去1秒，所以后边直接加上1000与减掉的1000抵消
          temp = Number(endTime) - Number(startTime) + 1000;
          //设置活动为正在进行中
          _this.setData({
            isIng: true
          });
        }
        temp -= 1000;
        // console.log(temp);
      }, 1000);
      // console.log(day + "天" + hour + "小时" + min + "分钟" + sec + "秒");
    },

    getStage() {
      //请求阶段信息
      getGroupBuyStage("POST", { id: this.data.stageId }).then(res => {
        console.log(res);
        this.setData({
          stage: res.data
        });
        let precent;
        let current = this.data.stage.current;
        let sum = this.data.stage.next.limit;
        precent = Number(((current / sum).toFixed(2) * 100 * 0.35).toFixed(0)) + 15;
        this.setData({
          precent
        });
      });

    }
  }
});