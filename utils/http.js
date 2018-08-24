 export function wxRequest(requestObj) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: requestObj.url,
      method: requestObj.type,
      data: requestObj.data,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  })
}