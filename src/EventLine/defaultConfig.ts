export default {
  // canvas的padding
  padding: [24, 24, 48, 0],
  // 折线图左侧指示文案
  lineTitle: '趋势图',
  // 坐标轴
  axis: {
    height: 15,
    color: '#666',
  },
  axisX: {
    height: 15,
    color: '#666',
  },
  axisY: {
    value: {
      width: 40,
      fontSize: 12,
      formatter: (num: number) => num,
    },
    rate: {
      width: 40,
      fontSize: 12,
      formatter: (num: number) => num,
    },
  },
  // x轴刻度
  scale: {
    lineWidth: 1,
    space: 10,
    textSpace: 6,
    textSize: 6,
    firstHeight: 15,
    firstColor: '#333',
    secondHeight: 10,
    secondColor: '#666',
    thirdHeight: 6,
    thirdColor: '#999',
  },
  // events, lines数据别名
  fieldNames: {
    eventUniqueField: 'id',
    eventTitleField: 'title',
    eventStartField: 'startDate',
    eventEndField: 'endDate',
    eventSeriesField: 'type',
    lineUniqueField: 'id',
    lineXField: 'dt',
    lineYField: 'value',
    lineSeriesField: 'type',
  },
  // 事件类型样式
  eventTypeStyle: {
    width: 100,
    height: 40,
    textStyle: {
      font: 'bold 14px "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
    },
  },
  // 事件样式
  eventStyle: {
    height: 30,
    minWidth: 60,
    radius: 4,
    textStyle: {
      fillStyle: '#fff',
      font: '14px "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
    },
  },
  // 折线样式
  lineStyle: {
    yScaleSpace: 50, // 通过space乘以count获取折线的高度
    yScaleCount: 6,
  },
};
