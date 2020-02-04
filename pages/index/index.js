import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
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
  async getSwiperData() {
    const res = await request({
      url: '/home/swiperdata',
    })
    this.setData({
      swiperData: res.data.message
    })
  },
  // 获取导航菜单
  async getTapMenu() {
    const res = await request({
      url: '/home/catitems',
    })
    this.setData({
      tapMenu: res.data.message
    })
  },
  // 获取楼层数据
  async getFloorData() {
    const res = await request({
      url: '/home/floordata',
    })
    this.setData({
      floorList: res.data.message
    })
  }

})