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
    goodsList:[], //商品列表
  },

  //请求商品列表参数
  listParams: {
    query: '',
    cid: '',
    pagesize: 20,
    pagenum: 1
  },


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
  getGoodsList(){
   request({
     url:"/goods/search",
     params:this.listParams
   }).then(res => {
     this.setData({
       goodsList:res.data.message.goods
     })
     
   })
  }

})