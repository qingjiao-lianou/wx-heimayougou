// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],// 轮播图数据
    tapMenu:[],//导航数组
  },


  onLoad: function (options) {
    this.getSwiperData(),
      this.getTapMenu()
  },

  // 获取轮播图数据
  getSwiperData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.log(result);
        this.setData({
          swiperData: result.data.message
        })
      },

    });

  },
  // 获取导航菜单
  getTapMenu() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (result) => {
       this.setData({
         tapMenu:result.data.message
       })
      },
    });

  }

})