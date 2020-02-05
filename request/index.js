let requestNum = 0

// 异步请求
export const request = (params) => {
    requestNum++;
    wx.showLoading({
        title: "加载中",
        mask: true
    });

    const baseUrl = "https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (res) => {
                // resolve(res)
                if(res.data.meta.status === 200){
                    resolve(res.data.message)
                }else{
                    reject(err)
                }
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                requestNum--;
                if (requestNum === 0) {
                    wx.hideLoading();
                }
            }
        });

    })
}

// 获取用户授权状态
export const getAuth = () => {
    return new Promise((resolve,reject) => {
        wx.getSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}

// 打开授权页面
export const openAuth = () => {
    return new Promise((resolve,reject) => {
       wx.openSetting({
        success: (res) => {
            resolve(res)
        },
        fail: (err) => {
            reject(err)
        },
        complete: () => {}
       });
         
          
    })
}

// 获取用户地址
export const chooseAddress = () => {
    return new Promise((resolve,reject) => {
        wx.chooseAddress({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}