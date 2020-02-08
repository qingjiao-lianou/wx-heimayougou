import { chooseAddress, openAuth, getAuth, showModal } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/cart/index.js
Page({


  data: {
    address: {}, //用户地址
    carts: [], //购物车数据
    totalNum: 0,//总数
    totalPrice: 0,//总价
  },

  onShow() {
    const address = wx.getStorageSync('address');
    let carts = wx.getStorageSync('carts');
    carts = carts.filter(v => v.checked)
    this.setData({
      address, carts
    })
    this.computerPrice(carts)
  },
  // 计算价格
  computerPrice(carts) {
    let totalNum = 0;
    let totalPrice = 0;
   
    carts.forEach((v, i) => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num
      } else {
       
      }
    })
   
    this.setData({
       totalNum, totalPrice
    })
  },

// 支付
handlePay(){
  wx.navigateTo({
    url: '/pages/auth/index',
  });
    
}

})