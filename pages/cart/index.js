import { chooseAddress, openAuth, getAuth, showModal } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/cart/index.js
Page({


  data: {
    address: {}, //用户地址
    carts: [], //购物车数据
    totalChecked: false, //是否全选
    totalNum: 0,//总数
    totalPrice: 0,//总价
  },

  onShow() {
    const address = wx.getStorageSync('address');
    const carts = wx.getStorageSync('carts');
    this.setData({
      address, carts
    })
    this.computerPrice(carts)
  },

  // 获取用户地址
  async getUserAddress() {
    try {
      const res1 = await getAuth()
      let auth = res1.authSetting["scope.address"]
      if (auth === false) {
        await openAuth()
      } else {
        const res2 = await chooseAddress()
        res2.detailAddress = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
        this.setData({
          address: res2
        })
        wx.setStorageSync('address', res2);

      }
    } catch (error) {
      console.log(error);

    }
  },

  // 计算价格
  computerPrice(carts) {
    let totalNum = 0;
    let totalPrice = 0;
    let totalChecked = true;
    carts.forEach((v, i) => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num
      } else {
        totalChecked = false
      }
    })
    totalChecked = carts.length === 0 ? false : totalChecked
    this.setData({
      totalChecked, totalNum, totalPrice
    })
  },

  // 单选功能
  handleChange(e) {
    const { index } = e.currentTarget.dataset
    const { carts } = this.data
    carts[index].checked = !carts[index].checked
    this.setData({ carts })
    wx.setStorageSync('carts', carts);
    this.computerPrice(carts)

  },

  // 商品数量
  async handleNum(e) {
    const { index, count } = e.currentTarget.dataset
    const { carts } = this.data
    if (count === -1 && carts[index].num === 1) {
      const res = await showModal({ title: '警告', content: "您确定要删除吗？" })
      if (res) {
        carts.splice(index, 1)
      } else {
        return
      }
    } else {
      carts[index].num += count
    }
    this.setData({ carts })
    wx.setStorageSync('carts', carts);
    this.computerPrice(carts)
  },

  // 结算
  handleOrder(){
    const {address,carts} = this.data
    if(address === ''){
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        mask: true,
      });
        return
    }
    if(carts.length === 0){
      wx.showToast({
        title: '请选购商品',
        icon: 'none',
        mask: true,
      });
        return
    }
    // 跳转
    wx.navigateTo({
      url: '/pages/pay/index',
    });
      
  }
})