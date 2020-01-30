import { request } from '../../request/index'
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
  getGoodsList() {
    request({
      url: "/goods/search",
      data: this.listParams
    }).then(res => {
      // 计算数据总页数
      this.sumPagenum = Math.ceil(res.data.message.total / this.listParams.pagesize)
      // 之前的数据
      const oldGoodsList = this.data.goodsList
      // 新的数据
      const newGoodsList = res.data.message.goods
      this.setData({
        goodsList: [...oldGoodsList, ...newGoodsList]
      })

    })
  },

  // 滚动条触底事件
  onReachBottom() {
    if (this.listParams.pagenum >= this.sumPagenum) {
      wx.showToast({
        title: '无',
        icon: 'none',
      });
    } else {
      // 有下一页数据
      this.listParams.pagenum++;
      this.getGoodsList()
    }

  }

})