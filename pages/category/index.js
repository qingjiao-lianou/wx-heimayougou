import {request} from '../../request/index'

Page({
  data: {
      currentIndex:0,//左侧菜单当前索引
      muneList:[],//左菜单
      goodsList:[],//商品列表
  },

  cates:[],//分类数据
  onLoad: function (options) {
    this.getGoodsList()
  },

  // 获取分类数据
  getGoodsList(){
    request({
      url:"/categories"
    }).then(res => {
     this.cates = res.data.message
      const goodsList = this.cates[0].children
      const muneList =this.cates.map(v => v.cat_name)
      this.setData({
        muneList,goodsList
      })
    })
  },
  // 左侧菜单点击事件
  handleMenu(e){
    const {index} = e.target.dataset
    const goodsList = this.cates[index].children
   this.setData({
    currentIndex:index,
    goodsList
   })
  }
})