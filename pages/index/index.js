// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperData: []
  },


  onLoad: function (options) {
    this.getSwiperData()
  },

  // 获取轮播图数据
  getSwiperData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.log(result);
        this.setData({
          swiperData:result.data.message
        })
      },

    });

  }

})