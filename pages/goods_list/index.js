import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //导航数据
    tabList: [
      { id: 0, text: "综合" },
      { id: 1, text: "销量" },
      { id: 2, text: "价格" }
    ],
    currentIndex: 0,//当前索引
    goodsList: [], //商品列表
    isShow: false
  },

  //请求商品列表参数
  listParams: {
    query: '',
    cid: '',
    pagesize: 10,
    pagenum: 1
  },

  // 总页数
  sumPagenum: 1,



  onLoad: function (options) {
    this.listParams.cid = options.cid
    this.getGoodsList()
  },

  // 切换导航
  handleItem(e) {
    const { index } = e.detail
    this.setData({
      currentIndex: index
    })
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.listParams
    })
    // 计算数据总页数
    this.sumPagenum = Math.ceil(res.total / this.listParams.pagesize)
    // 之前的数据
    const oldGoodsList = this.data.goodsList
    // 新的数据
    const newGoodsList = res.goods
    this.setData({
      goodsList: [...oldGoodsList, ...newGoodsList]
    })
    //  关闭下拉刷新窗口
    wx.stopPullDownRefresh()
  },

  // 滚动条触底事件
  onReachBottom() {
    if (this.listParams.pagenum >= this.sumPagenum) {
      // 没有下一页
      wx.showToast({
        title: '无',
        icon: 'none',
      });
      this.setData({
        isShow: true
      })
    } else {
      // 有下一页数据
      this.listParams.pagenum++;
      this.getGoodsList()
    }

  },

  // 下拉刷新
  onPullDownRefresh() {
    this.listParams.pagenum = 1;
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  }

})