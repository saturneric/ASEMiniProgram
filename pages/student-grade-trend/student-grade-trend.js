// pages/student-grade-trend/student-grade-trend.js
import {searchStudents, getUserProfileSupervisor} from '../../api/document'
import {getStudentWeightedAveragesSemesterValues} from '../../api/course'
import * as echarts from '../../ec-canvas/echarts';

var option = {
  title: {
    text: '各学期学分绩折线图',
    left: 'center'
  },
  color: ["#37A2DA"],
  legend: {
    data: ['学分绩'],
    top: 50,
    left: 'center',
    backgroundColor: 'red',
    z: 100
  },
  grid: {
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    // show: false
  },
  yAxis: {
    x: 'center',
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
    // show: false
  },
  series: [{
    name: '学分绩',
    type: 'line',
    smooth: true,
    data: [18, 36, 65, 30, 78, 40, 33]
  }]
};


function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    searchStudentsList: [],
    showGraph: false,
    ec: {
      onInit: initChart
    },
    realName: '',
    numbering: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  showInput: function () {
    this.setData({
        inputShowed: true
    });
  }, 

  hideInput: function () {
    this.setData({
        inputVal: "",
        inputShowed: false
    });
  },

  clearInput: function () {
    this.setData({
        inputVal: ""
    });
  },

  onClickShowDocument(e) {
    let showIndex = e.currentTarget.dataset['index']
    let userDocument = this.data.searchStudentsList[showIndex]
    this.setData({
      realName: userDocument.realName,
      numbering: userDocument.numbering
    })
    getUserProfileSupervisor(userDocument.id).then(res => {
      console.log(res)
      return res.openid
    }).then(res => {
      return getStudentWeightedAveragesSemesterValues(res).then(res => {
        console.log(res)
        let values = []
        let sems = []
        res.forEach((v, i) => { 
          values.push(v.value)
          const sem = v.semesterItem
          sems.push(`${sem.startYear} ${sem.springAutumn ? '春' : '秋'}` )
        })

        console.log(values)
        console.log(sems)

        option.xAxis.data = sems
        option.series.data = values

        this.setData({
          showGraph: true,
          ec: {
            onInit: initChart
          }
        })
      })
    })
  },

  inputTyping: function (e) {
    let inputVal = e.detail.value
    this.setData({
        inputVal
    });
    searchStudents(inputVal).then(res => {
      console.log(res)
      this.setData({
        searchStudentsList: res
      })
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },

  onClickBack() {
    this.setData({
      showGraph: false
    })
  }
})