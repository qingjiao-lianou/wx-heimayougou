import { chooseAddress, openAuth, getAuth } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/cart/index.js
Page({


  data: {
    address: {}
  },

  onShow() {
    const address = wx.getStorageSync('address');
    this.setData({
      address
    })
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
  }
})