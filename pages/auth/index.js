import { request, login } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  // 获取用户信息
  bindgetuserinfo(e) {

    this.getToken(e)

  },

  // 获取用户token
  async getToken(e) {
    const { signature, rawData, encryptedData, iv } = e.detail
    const { code } = await login()
    const tokenData = { signature, rawData, encryptedData, iv, code }
    // console.log(tokenData);
    // 此接口失效
    const res = await request({
      url: '/users/wxlogin',
      method: "post",
      data: tokenData
    })
    console.log(res);

  }
})