// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],// 轮播图数据
    tapMenu: [],//导航
    floorList: [],//楼层
  },


  onLoad: function (options) {
    this.getSwiperData(),
      this.getTapMenu(),
      this.getFloorData()
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
          tapMenu: result.data.message
        })
      },
    });

  },
  // 获取楼层数据
  getFloorData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: (result) => {
        this.setData({
          floorList: result.data.message
        })
      },
    });

  }

})