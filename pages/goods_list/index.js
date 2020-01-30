// pages/goods_list/index.js
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

  },


  onLoad: function (options) {

  },

  handleItem(e){
   const {index} = e.detail
   this.setData({
    currentIndex:index
   })
  }

})