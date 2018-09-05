
 
 export function wxRequest(requestObj) {
  return new Promise(function (resolve, reject) {
    let session = wx.getStorageSync("session");
    //DS:带有session的data
    let DS = requestObj.data;
    if(session) {
      //解决没有传递data时候，data为空的情况
      if(DS === undefined) {
        DS = {};
      }
      DS.session = session;
    }
    wx.request({
      url: requestObj.url,
      method: requestObj.type,
      data: DS,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  })
}