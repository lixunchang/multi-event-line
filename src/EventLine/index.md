# EventLine 复合事件线组件

---

React 复合事件线组件：同时展示多种类型事件和关键指标折线图，同步滑动。

## 主要功能

- 支持多种类型事件展示;
- 支持只有开始时间没有结束时间的的事件，支持最小宽度设置;
- 支持事件区分类型设置主题色，次主题色;
- 支持事件点击选择;
- 支持双轴多折线;
- 支持折线和事件时间同步，同步拖拽 / 滚轮 / 触摸板双指左右滑动;
- 支持鼠标 hover 查看事件/折线详细信息;
- 支持自定义事件 / 折线 tooltip;

## Demo 演示

```tsx
import React from 'react';
import type { IEventType, IEventItem, ILineItem } from 'multi-event-line';
import EventLine from 'multi-event-line';

const eventTypes: IEventType[] = [
  {
    value: 'one',
    label: '第一栏',
    sort: 1,
    primaryColor: '#009f5d',
    secondaryColor: '#8cc540',
  },
  {
    value: 'two',
    label: '第二栏',
    sort: 2,
    primaryColor: '#007cdc',
    secondaryColor: '#019fde',
  },
  {
    value: 'three',
    label: '第三栏',
    sort: 3,
    primaryColor: '#887ddd',
    secondaryColor: '#cd7bdd',
  },
  {
    value: 'four',
    label: '第四栏',
    sort: 4,
    primaryColor: '#F4606C',
    secondaryColor: '#ECAD9E',
  },
  {
    value: 'five',
    label: '第五栏',
    sort: 5,
    primaryColor: '#19CAAD',
    secondaryColor: '#BEEDC7',
  },
];

const EVENT_DATA: IEventItem[] = [
  {
    id: 1,
    start: '20220301',
    end: '20220307',
    title: '事件文本',
    detail: '211201事件详情20211220',
    type: 'one', //事件类型
  },
  {
    id: 12,
    start: '20220306',
    end: '20220316',
    title: '事件文本六',
    detail: '211201事件详情20211220',
    type: 'one', //事件类型
  },
  {
    id: 13,
    start: '20220306',
    end: '20220316',
    title: '事件文本一',
    detail: '211201事件详情20211220',
    type: 'four', //事件类型
  },
  {
    id: 2,
    start: '20220314',
    end: '20220330',
    title: '事件文本二',
    detail: '20211214事件详情20220228',
    type: 'two', //事件类型
  },
  {
    id: 3,
    start: '20220409',
    title: '三：没有结束时间，文本超出最大宽度限制，文末显示省略号',
    detail: '20211209事件详情20220102',
    type: 'two', //事件类型
  },
  {
    id: 4,
    start: '20220501',
    end: '20220520',
    title: '事件文本四',
    detail: '20220101事件详情20220220',
    type: 'three', //事件类型
  },
  {
    id: 5,
    start: '20220320',
    end: '20220924',
    title: '事件文本五',
    detail: '20220301事件详情20220420',
    type: 'five', //事件类型
  },
];

const LeftLineData: ILineItem[] = [
  {
    id: 1,
    dt: '20211101',
    value: 99,
    type: '上证',
  },
  {
    id: 12,
    dt: '20211101',
    value: 10,
    type: '深证',
  },
  {
    id: 121,
    dt: '20211202',
    value: 10,
    type: '不良率',
  },
  {
    id: 1233,
    dt: '20211203',
    value: 12,
    type: '上证',
  },
  {
    id: 112,
    dt: '20211204',
    value: 783,
    type: '上证',
  },
  {
    id: 1212,
    dt: '20211209',
    value: 90,
    type: '深证',
  },
  {
    id: 3,
    dt: '20220101',
    value: 200,
    type: '上证',
  },
];

const RightLineData: ILineItem[] = [
  {
    id: 11,
    dt: '20211101',
    rate: 0.7,
    type: '不良率',
  },
  {
    id: 112,
    dt: '20211101',
    rate: 0.9,
    type: '不良率2',
  },
  {
    id: 123,
    dt: '20211203',
    rate: 0.3,
    type: '不良率',
  },
  {
    id: 2,
    dt: '20211214',
    rate: 0.4,
    type: '不良率',
  },
  {
    id: 3,
    dt: '20220101',
    rate: 0.5,
    type: '不良率',
  },
  {
    id: 33,
    dt: '20220101',
    rate: 0.5,
    type: '不良率2',
  },
  {
    id: 4,
    dt: '20220215',
    rate: 0.98,
    type: '不良率',
  },
];

const uvBillData = [
  {
    time: '2022-03-01',
    value: 350,
    type: 'uv',
  },
  {
    time: '2022-04-01',
    value: 900,
    type: 'uv',
  },
  {
    time: '2022-05-01',
    value: 300,
    type: 'uv',
  },
  {
    time: '2022-06-01',
    value: 450,
    type: 'uv',
  },
  {
    time: '2022-07-01',
    value: 470,
    type: 'uv',
  },
  {
    time: '2022-03-01',
    value: 220,
    type: 'bill',
  },
  {
    time: '2022-04-01',
    value: 300,
    type: 'bill',
  },
  {
    time: '2022-05-01',
    value: 250,
    type: 'bill',
  },
  {
    time: '2022-06-01',
    value: 220,
    type: 'bill',
  },
  {
    time: '2022-07-01',
    value: 362,
    type: 'bill',
  },
];
const transformData = [
  {
    time: '2022-03-01',
    count: 800,
    name: 'a',
  },
  {
    time: '2022-04-01',
    count: 600,
    name: 'a',
  },
  {
    time: '2022-05-01',
    count: 400,
    name: 'a',
  },
  {
    time: '2022-06-01',
    count: 380,
    name: 'a',
  },
  {
    time: '2022-07-01',
    count: 220,
    name: 'a',
  },
  {
    time: '2022-03-01',
    count: 750,
    name: 'b',
  },
  {
    time: '2022-04-01',
    count: 650,
    name: 'b',
  },
  {
    time: '2022-05-01',
    count: 450,
    name: 'b',
  },
  {
    time: '2022-06-01',
    count: 400,
    name: 'b',
  },
  {
    time: '2022-07-01',
    count: 320,
    name: 'b',
  },
  {
    time: '2022-03-01',
    count: 900,
    name: 'c',
  },
  {
    time: '2022-04-01',
    count: 600,
    name: 'c',
  },
  {
    time: '2022-05-01',
    count: 450,
    name: 'c',
  },
  {
    time: '2022-06-01',
    count: 300,
    name: 'c',
  },
  {
    time: '2022-07-01',
    count: 200,
    name: 'c',
  },
  {
    time: '2022-10-01',
    count: 0,
    name: 'c',
  },
];

export default () => (
  <EventLine
    id="event-line"
    events={EVENT_DATA}
    eventTypes={eventTypes}
    lines={[uvBillData, transformData]}
    customTooltip={{
      event: (data, location) => (
        <div>
          <div style={{ color: '#666' }}>{data.title}</div>
          <i style={{ color: '#999' }}>详情：{data.detail}</i>
        </div>
      ),
      // line: (t)=>ReactNode, 参数同event
    }}
    config={{
      event: {
        minWidth: 250,
        radius: 4,
      },
      line: {
        xField: 'time',
        yField: ['value', 'count'],
        title: {
          label: '趋势图',
          fontSize: 18,
          color: '#1890ff',
          direction: 'vertical',
          paddingLeft: 16,
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
        axis: {
          y: {
            left: {
              seriesField: 'type',
              formatter: (text) => text + '', //万
            },
            right: {
              seriesField: 'name',
              lineStyle: {
                lineWidth: 2,
                dash: [5, 5],
                offset: 0,
              },
              formatter: (text) => (text * 1).toFixed(0) + '', //%
            },
          },
        },
      },
    }}
  />
);
```

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| id | canvas 的 ID | string | 'event-line' | 1.0.0 |
| eventTypes | 枚举所有事件类型，并配置主题色 | IEventType[] | - | 1.0.0 |
| events | 事件数据 | IEventItem[] | - | 1.0.0 |
| lines | 折线数据 | ILineItem [] | - | 1.0.0 |
| customTooltip | 自定义 tooltip, 其中 line 可以传递字符串数组作为折线左右指标的名称 | { event: (data:IEventItem)=>ReactNode, line: string[] \| (data:ILineItem)=>ReactNode} | - | 1.0.0 |
| config | 配置项 | IConfig | defaultConfig | 1.0.0 |

### IEventType 事件类型

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label | 事件类型展示名称 | string | - |  |
| value | 事件类型值, 和 EventItem 的 type 值对应 | string | - |  |
| sort | 事件类型展示顺序，> 0, 从上至下排列 | number | 1 |  |
| primaryColor | 事件的主题色，会用在边框，在未特别指定文字颜色时是默认文字颜色 | string | '#666' |  |
| secondaryColor | 事件的次色，会用在事件类型背景和事件背景 | string | '#999' |  |

```ts
interface IEventType {
  label: string;
  value: string;
  sort: number;
  primaryColor?: string;
  secondaryColor?: string;
}
```

### IEventItem 事件节点

| 属性   | 说明                                      | 类型             | 默认值 | 版本 |
| ------ | ----------------------------------------- | ---------------- | ------ | ---- |
| id     | 事件唯一值                                | string ｜ number | -      |      |
| start  | 事件开始时间                              | string           | -      |      |
| end    | 事件结束时间，可选                        | string           | -      |      |
| title  | 事件标题                                  | string           | -      |      |
| detail | 事件详情                                  | string           | -      |      |
| type   | 事件类型，对应 IEventType 里的 value 字段 | string           | -      |      |

```ts
interface IEventItem {
  id?: string | number;
  start?: string;
  end?: string;
  title?: string;
  detail?: string;
  type?: string;
  [_: string]: any;
}
```

### ILineItem 趋势图节点

| 属性  | 说明               | 类型             | 默认值 | 版本 |
| ----- | ------------------ | ---------------- | ------ | ---- |
| id    | 唯一值             | string ｜ number | -      |      |
| dt    | 时间               | string           | -      |      |
| value | 值，对应左轴       | number           | -      |      |
| rate  | 值，对应右轴，可选 | number           | -      |      |

```ts
interface ILineItem {
  id?: string | number;
  dt?: string;
  value?: number;
  rate?: number;
  [_: string]: any;
}
```

### IConfig 配置项

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| padding | canvas 的 padding，长度是 4, 不支持简写, 对应 css 的 padding | number[] | [24, 24, 24, 1] |  |
| font | 默认字体，对应 canvas 的 font 字体字段 | string | '"PingFang SC", "Microsoft YaHei", Airal, sans-serif' |  |
| axisX | 事件和折线公共的 X 轴设置 | object | - |  |
| event | 事件相关的配置 | object | - |  |
| line | 折线相关的配置 | object | - |  |

### IConfig.axisX 配置项

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| height | x 轴刻度部分的高度 | number | 15 |  |
| color | 文字颜色 | string | '#333' |  |
| lineColor | 横线颜色 | string | '#999' |  |
| fontSize | 字体大小 | number | 12 |  |
| forward | 事件和折线最小时间，往前绘制多少刻度，单位 unit 字段 | number | 30 |  |
| behind | 事件和折线最大时间，往后绘制多少刻度，单位 unit 字段 | number | 30 |  |
| unit | 最小刻度单位, 暂不支持修改，会覆盖 event,line 里的对应配置 | string | 'day' |  |
| emptyLeft | 刻度外左侧可滑动距离, 单位 px | number | 100 |  |
| emptyRight | 刻度外右侧可滑动距离, 单位 px | number | 200 |  |
| scale | 刻度配置项 | object | - |  |
| scale.lineWidth | 刻度线的宽度, 单位 px | number | 1 |  |
| scale.space | 刻度线间距, 单位 px | number | 10 |  |
| scale.textSpace | 刻度下时间文字间距几个刻度 | number | 6 |  |
| scale.textSize | 刻度里一半文字宽度, 单位 px | number | 6 |  |
| scale.textHeight | 刻度下时间文字高度，用来计算事件和折线间距, 单位 px | number | 20 |  |
| scale.firstHeight | 第一级（比如年）刻度线的高度，单位 px | number | 15 |  |
| scale.firstColor | 第一级（比如年）刻度线颜色值 | string | '#333' |  |
| scale.secondHeight | 第二级（比如月）刻度线的高度，单位 px | number | 10 |  |
| scale.secondColor | 第二级（比如月）刻度线颜色值 | string | '#666' |  |
| scale.thirdHeight | 第三级（比如日）刻度线的高度，单位 px | number | 16 |  |
| scale.thirdColor | 第三级（比如日）刻度线颜色值 | string | '#999' |  |

### IConfig.event 配置项

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| height | 事件外框的高度，应小于事件类型的外框高度 | number | 30 |  |
| minWidth | 事件框最小宽度 | number | 60 |  |
| paddingLeft | 事件框的 paddingLeft | number | 8 |  |
| paddingRight | 事件框的 paddingRight | number | 8 |  |
| radius | 事件框 border-radius | number | 4 |  |
| color | 事件标题的文字颜色，会覆盖事件类型的 primaryColor | string | '#fff' |  |
| fontSize | 事件标题的文字大小 | number | 14 |  |
| fieldNames | 事件数据的字段映射 | object | { key: 'id', startField: 'start',endField: 'end', titleField: 'title', detailField: 'detail',seriesField: 'type',} |  |
| axis | 事件线 X 轴配置，同公共 X 轴 IConfig.axisX 配置，会覆盖公共配置项，谨慎使用 | object | - |  |
| type | 事件类型框的配置项，字段使用同事件框 | { width:number; height:number; paddingLeft:number; paddingRight:number; color:string;fontSize:number; } | - |  |

> event 的高度，是通过 eventTypes 事件类型的数量和单个 type 的 height 的高度相乘得来的。

### IConfig.line 折线配置项

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| key | 折线数据唯一键 | string | 'id' |  |
| xField | 映射折线 x 轴字段 | string | 'dt' |  |
| yField | 映射折线左侧 y 轴、右侧 y 轴字段，可配置一个 | number[] | ['value','rate'] |  |
| lineColor | 设置对应左侧 y 轴、右侧 y 轴折线颜色 | string[] | ['#1890ff', '#009f5d'] |  |
| title | 折线图左侧标题配置 | object | - |  |
| title.label | 折线图标题文本 | string | '趋势图' |  |
| title.fontSize | 折线图标题文字大小 | number | 14 |  |
| title.color | 折线图标题颜色 | string | '#1890ff' |  |
| title.direction | 折线图标题绘制方向 | 'vertical' | 'horizontal'\|'vertical' |  |
| title.paddingLeft | 折线图标题 paddingLeft | number | 8 |  |
| title.primaryColor | 折线图标题外框颜色 | string | #fff |  |
| title.secondColor | 折线图标题背景颜色 | string | #fff |  |
| dashLine.count | 折线图辅助线个数 | number | 5 |  |
| dashLine.space | 折线图辅助线间距 | number | 50 |  |
| dashLine.color | 折线图辅助线颜色 | string | '#999' |  |
| dashLine.dash | 折线图辅助线 dash, 对应 canvas 绘制虚线时 dash 配置 | number[] | [5, 5] |  |
| dashLine.offset | 折线图辅助线 offset, 对应 canvas 绘制虚线时 offset 配置 | number | 0 |  |
| legend | 图例相关的配置 | object | - |  |
| legend.height | 图例的高度 | number | 12 |  |
| legend.fontSize | 图例文字大小 | number | 12 |  |
| legend.marginTop | 图例的上间距 | object | 8 |  |
| legend.marginBottom | 图例的下间距 | object | 12 |  |
| legend.labelRectSpace | 图例文本距离颜色方块之间的间距 | number | 4 |  |
| legend.labelSpace | 多个图例之间的间距 | number | 10 |  |
| legend.color | 图例文本颜色 | number | '#999' |  |
| legend.position | 图例的展示位置，（暂不支持修改） | string | 'bottomRight' |  |
| legend.label | 图例的文本，对应左侧 Y 轴折线和右侧 Y 轴折线文本 | string [] | ['上证指数', '不良率'] |  |
| axis | 折线 X 轴 Y 轴相关配置 | object | - |  |
| axis.x | 折线 X 轴相关的配置，属性同公共 X 轴 IConfig.axisX 配置项，谨慎使用 | object | - |  |
| axis.y | 折线 Y 轴相关的配置 | object | - |  |
| axis.y.left | 折线左侧 Y 轴相关的配置 | object | - |  |
| axis.y.left.color | 折线左侧 Y 轴文本颜色 | string | #666 |  |
| axis.y.left.fontSize | 折线左侧 Y 轴文字大小 | number | 14 |  |
| axis.y.left.formatter | 折线左侧 Y 轴文本格式化 | (num:number)=>string\|number | - |  |
| axis.y.right | 折线右侧 Y 轴相关的配置 | object | - |  |
| axis.y.right.width | 折线右侧 Y 轴文本区域的宽度, 单位 px | number | 40 |  |
| axis.y.right.color | 折线右侧 Y 轴文本颜色 | string | #666 |  |
| axis.y.right.fontSize | 折线右侧 Y 轴文字大小 | number | 14 |  |
| axis.y.right.formatter | 折线右侧 Y 轴文本格式化 | (num:number)=>string\|number | - |  |

> 折线的高度，是通过 dashLine 里的 count 和 space 相乘得出。

### IConfig 默认配置一览

```ts
const defaultConfig: IConfig = {
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
```

## 二期计划

- 支持多折线展示；
- canvas 缩放、下载等功能区的实现；
- 折线缩略轴?；
