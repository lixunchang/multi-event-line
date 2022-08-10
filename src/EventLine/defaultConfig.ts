import type { IConfig } from './type';
// 将刻度拆分至事件和折线，是考虑到可能存在事件X轴单位和折线X轴单位可能不一致，但时间长度应该一直
const newConfig: IConfig = {
  padding: [24, 24, 24, 24],
  font: '"PingFang SC", "Microsoft YaHei",  Airal, sans-serif', // canvas字体配置
  axisX: {
    // 同步X轴设置
    height: 15,
    color: '#333', // 文字颜色
    lineColor: '#999', // 横线颜色
    fontSize: 12,
    forward: 30, // 前置空区域
    behind: 30,
    unit: 'day', // 只支持day, 只能统一配置，会覆盖event和line的unit配置
    emptyLeft: 100, // 刻度左侧空白区域
    emptyRight: 200, // 刻度右侧空白区域
    // x轴刻度
    scale: {
      lineWidth: 1, //
      space: 10,
      textSpace: 6, // 刻度文本间隔几个刻度
      textSize: 6, // 文字一半宽度
      textHeight: 20, //刻度文本高度
      firstHeight: 12,
      firstColor: '#333',
      secondHeight: 9,
      secondColor: '#666',
      thirdHeight: 6,
      thirdColor: '#999',
    },
  },
  // 事件部分设置
  event: {
    height: 30,
    minWidth: 120,
    paddingLeft: 8,
    paddingRight: 8,
    radius: 4,
    color: '#fff', // 空会使用事件类型主颜色
    fontSize: 14,
    fieldNames: {
      key: 'id',
      startField: 'start',
      endField: 'end',
      titleField: 'title',
      detailField: 'detail',
      seriesField: 'type',
    },
    axis: {
      // 只有x轴
      x: {
        color: '#666',
        lineColor: '#999',
        fontSize: 10,
        scale: {}, // 同公共axisX.scale
      },
    },
    // 事件类型方面设置
    type: {
      width: 100,
      height: 38,
      paddingLeft: 20, // 现在只支持左右padding
      paddingRight: 8,
      color: '#fff', // 为空会默认使用事件类型主题色
      fontSize: 14,
    },
  },
  // 折线部分设置
  line: {
    key: 'id', // 唯一键
    xField: 'dt',
    yField: ['value', 'rate'], // 左右双轴设置，传一个为左轴
    // seriesField: 'type', // TODO 多折线
    lineColor: ['#1890ff', '#009f5d'], // 颜色配置
    title: {
      label: '趋势图',
      fontSize: 16,
      color: '#1890ff',
      paddingLeft: 26,
      direction: 'vertical',
      primaryColor: '#fff', // 会作为边框颜色
      secondaryColor: '#fff', // 背景颜色
    },
    dashLine: {
      count: 5, // 除去x轴
      space: 50, // 间距
      color: '#999',
      dash: [5, 5],
      offset: 0,
    },
    legend: {
      height: 12,
      fontSize: 12,
      marginTop: 8,
      marginBottom: 12,
      labelRectSpace: 4,
      labelSpace: 16,
      color: '#666', // 文字
      position: 'bottomRight', // TODO 图例位置
      label: ['上证指数', '不良率'],
    },
    axis: {
      x: {
        height: 15,
        color: '#666', // 文字颜色
        lineColor: '#999', // 文字颜色
        fontSize: 10,
        scale: {}, // 同axisX.scale
      },
      y: {
        left: {
          color: '#999',
          fontSize: 12,
          formatter: (text: any) => text,
        },
        right: {
          color: '#666',
          fontSize: 12,
          width: 36, // 右轴文字宽度
          formatter: (text: any) => text,
        },
      },
    },
  },
};

export default newConfig;

export const combineConfig = (defaultConfig: IConfig, customConfig: IConfig) => {
  return {
    ...defaultConfig,
    ...customConfig,
    axisX: {
      ...defaultConfig.axisX,
      ...(customConfig?.axisX || {}),
      scale: {
        ...defaultConfig.axisX.scale,
        ...(customConfig?.axisX?.scale || {}),
      },
    },
    event: {
      ...defaultConfig.event,
      ...(customConfig?.event || {}),
      fieldNames: {
        ...defaultConfig.event.fieldNames,
        ...(customConfig?.event?.fieldNames || {}),
      },
      axis: {
        x: {
          ...defaultConfig.event.axis.x,
          ...(customConfig?.event?.axis?.x || {}),
          unit: customConfig?.axisX?.unit || defaultConfig.axisX.unit,
          scale: {
            ...defaultConfig.event.axis.x.scale,
            ...(customConfig?.event?.axis?.x?.scale || {}),
          },
        },
      },
      type: {
        ...defaultConfig.event.type,
        ...(customConfig?.event?.type || {}),
      },
    },
    line: {
      ...defaultConfig.line,
      ...(customConfig?.line || {}),
      title: {
        ...defaultConfig.line.title,
        ...(customConfig?.line?.title || {}),
      },
      dashLine: {
        ...defaultConfig.line.dashLine,
        ...(customConfig?.line?.dashLine || {}),
      },
      legend: {
        ...defaultConfig.line.legend,
        ...(customConfig?.line?.legend || {}),
      },
      axis: {
        x: {
          ...defaultConfig.line.axis.x,
          ...(customConfig?.line?.axis?.x || {}),
          unit: customConfig?.axisX?.unit || defaultConfig.axisX.unit,
          scale: {
            ...defaultConfig.line.axis.x.scale,
            ...(customConfig?.line?.axis?.x?.scale || {}),
          },
        },
        y: {
          left: {
            ...defaultConfig.line.axis.y.left,
            ...(customConfig?.line?.axis?.y?.left || {}),
          },
          right: {
            ...defaultConfig.line.axis.y.right,
            ...(customConfig?.line?.axis?.y?.right || {}),
          },
        },
      },
    },
  };
};
