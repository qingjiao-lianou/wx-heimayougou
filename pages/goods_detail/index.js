import { request } from '../../request/index'
Page({

  data: {
    goodsInfo: {},//商品详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsInfo(options.goods_id)
  },

  // 获取商品详情数据
  getGoodsInfo(goods_id) {
    request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    }).then(res => {
      this.setData({
        goodsInfo: res.data.message
      })

    })
  },

  // 点击放大图片
  handleSwiper(e) {
    const urls = this.data.goodsInfo.pics.map(v => v.pics_mid_url)
    const { current } = e.currentTarget.dataset
    wx.previewImage({
      current,
      urls
    });

  }

})