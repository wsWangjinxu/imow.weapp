// components/index/navCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectedId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [{
      // tab 项 id
      id: '101',
      // tab 项展示文案
      title: '阿母币'
    }, {
      id: '102',
      title: '信用分'
    }, {
      id: '103',
      title: '店铺余额'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabChange(selectedId) {
      
      if (selectedId.detail == 101) {
        wx.redirectTo({
          url: '/pages/myAssetsCoin/myAssetsCoin'
        });
      } else if (selectedId.detail == 102) {    
        wx.redirectTo({
          url: '/pages/myAssetsScore/myAssetsScore'
        });
      } else {
        wx.redirectTo({
          url: '/pages/myAssetsYuMoney/myAssetsYuMoney'
        });
      }
    }
  }
})
