let requestNum = 0

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
                resolve(res)
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