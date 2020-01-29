import { request } from '../../request/index'

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
    request({
      url: '/home/swiperdata',
    }).then(res => {
      this.setData({
        swiperData: res.data.message
      })

    })

  },
  // 获取导航菜单
  getTapMenu() {
    request({
      url: '/home/catitems',
    }).then(res => {
      this.setData({
        tapMenu: res.data.message
      })

    })
  },
  // 获取楼层数据
  getFloorData() {
    request({
      url: '/home/floordata',
    }).then(res => {
      this.setData({
        floorList: res.data.message
      })

    })

  }

})