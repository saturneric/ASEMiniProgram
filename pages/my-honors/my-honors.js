// pages/my-honors/my-honors.js
import {createHonor, getHonors} from '../../api/honor'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHonor: false,
    showCreate: false,
    targetHonorInfo: {},
    honorsInfo: [],
    honorDescription: "",
    honorClass: "",
    honorCategory: "",
    honorTitle: "",
    toast: false,
    hideToast: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userDocument: app.globalData.userDocument
    })
    console.log(this.data)
    getHonors(app.globalData.userBaseInfo.openid)
    .then(res => {
      console.log(res)
      this.setData({
        honorsInfo: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onTitleInput(res) {
    this.setData({
      honorTitle: res.detail.value
    })
  },

  onCategoryInput(res) {
    this.setData({
      honorCategory: res.detail.value
    })
  },

  
  onDescriptionInput(res) {
    this.setData({
      honorDescription: res.detail.value
    })
  },

  onClassInput(res) {
    this.setData({
      honorClass: res.detail.value
    })
  },

  onClickAdd() {
    this.setData({
      showHonor: false,
      showCreate: true,
    })
  },
  

  showHonorsList() {
    this.setData({
      showHonor: false,
      showCreate: false,
    })
  },

  createHonor() {
    console.log(this.data)
    createHonor({
      title: this.data.honorTitle,
      description: this.data.honorDescription,
      honorClass: this.data.honorClass,
      category: this.data.honorCategory
    }).then(res => {
      let that = this
      console.log(res)
      if(res != null) {
        that.setData({
          toast: true,
          hideToast: false
        });
        that.setData({
          hideToast: true,
          honorTitle: "",
          honorCategory: "",
          honorsInfo: "",
          honorDescription: "",
          honorClass: ""
        });
        setTimeout(() => {
          that.setData({
              toast: false,
              hideToast: true,
          });
        }, 3000);
      }
    })
  },

})