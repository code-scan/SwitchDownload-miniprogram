Page({
    onShareAppMessage() {
        return {
            title: 'image',
            path: 'page/component/pages/image/image'
        }
    },
    onLoad() {

    },
    downloadBtn() {
        wx.showToast({
            icon: "loading",
            title: '开始下载,共' + this.data.images.length + '个',
        })
        for (let index = 0; index < this.data.images.length; index++) {
            const element = this.data.images[index];
            console.log(element)
            wx.showToast({
                icon: "loading",
                title: '正在下载第' + index + '个',
            })
            wx.downloadFile({
                url: 'http://192.168.0.1/img/' + element,
                success: data => {
                    wx.saveImageToPhotosAlbum({
                        filePath: data.tempFilePath,
                        success: res => {
                            console.log('第' + index + '个,下载完成')
                            wx.showToast({
                                icon: "success",
                                title: '第' + index + '个,下载完成',
                            })
                        }
                    })
                },
                fail: data => {
                    console.log(data)
                }

            })
        }


    },
    onShow() {
        var that = this;
        wx.request({
            url: 'http://192.168.0.1/data.json',
            success: data => {
                that.setData({
                    images: data.data.FileNames
                })
                console.log(that.images)
            }
        })

    },
    data: {
        imageUrl: 'cloud://release-b86096.7265-release-b86096-1258211818/demo.jpg',
        webpImageURL: '',
        images: [],
    }
})