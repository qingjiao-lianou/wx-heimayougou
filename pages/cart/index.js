import { chooseAddress, openAuth, getAuth } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/cart/index.js
Page({


  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      }
    } catch (error) {
      console.log(error);

    }
  }
})