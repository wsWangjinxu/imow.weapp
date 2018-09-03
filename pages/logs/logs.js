//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    CA: "falseClass",
    CB: "falseClass"
  },
  handleTap() {
    let CA = this.data.CA;
    let CB = this.data.CB;
    if(CA === "trueClass") {
      CA = "falseClass"
    } else {
      CA = "trueClass"
      CB = "falseClass"
    }
    this.setData( {
      CA: CA,
      CB: CB
    })
  },

  handleTapB() {
    let CA = this.data.CA;
    let CB = this.data.CB;
    if(CB === "trueClass") {
      CB = "falseClass"
    } else {
      CB = "trueClass",
      CA = "falseClass"
    }
  }
}) 
