import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    scrollTop: 0, //右侧滚动条的位置
    currentIndex: 0,//左侧菜单当前索引
    muneList: [],//左菜单
    goodsList: [],//商品列表
  },

  cates: [],//分类数据
  onLoad: function (options) {
    this.loadStorage()
  },

  // 本地存储数据
  loadStorage() {
    // 获取本地数据
    const loadData = wx.getStorageSync('cates');
    // 判断有无数据
    if (loadData) {
      // 判断数据是否过期
      if (Date.now() - loadData.time > 1000 * 60) {
        //  数据过期
        this.getGoodsList()
      } else {
        // 若没过期则从本地获取数据并重新赋值
        this.cates = loadData.data
        const goodsList = this.cates[0].children
        const muneList = this.cates.map(v => v.cat_name)
        this.setData({
          muneList, goodsList
        })
      }
    } else {
      this.getGoodsList()
    }

  },

  // 获取分类数据
  async getGoodsList() {
    const res = await request({
      url: "/categories"
    })
    this.cates = res.data.message
    //  本地存储
    wx.setStorageSync('cates', {
      data: res.data.message,
      time: Date.now()
    });

    const goodsList = this.cates[0].children
    const muneList = this.cates.map(v => v.cat_name)
    this.setData({
      muneList, goodsList
    })
  },
  // 左侧菜单点击事件
  handleMenu(e) {
    const { index } = e.target.dataset
    const goodsList = this.cates[index].children
    this.setData({
      currentIndex: index,
      goodsList,
      scrollTop: 0
    })
  }
})