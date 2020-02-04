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

  },

  // 点击加入购物车
  addCarts() {
    let cartList = wx.getStorageSync('carts') || [];
    const { goodsInfo } = this.data
    const index = cartList.findIndex(v => v.goods_id === goodsInfo.goods_id)
    if (index === -1) {
      //  如果没有
      cartList.push({
        goods_id: goodsInfo.goods_id,
        goods_name: goodsInfo.goods_name,
        goods_price: goodsInfo.goods_price,
        goods_small_logo: goodsInfo.goods_small_logo,
        num: 1
      })
    } else {
      cartList[index].num++
    }
    wx.setStorageSync('carts', cartList);
    wx.showToast({
      title: '加入成功',
      mask: true,
    });
      
  }

})