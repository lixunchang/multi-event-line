---
nav:
  title: Components
  path: /components
---

## EventLine 复合事件线组件

多种类型事件和折线图同步展示、滑动；

#### React 事件线组件：同步展示事件和折线图。

#### A React component that displays multiple types of events and line charts synchronously.

![一期示意图](https://cdn.nlark.com/yuque/0/2022/png/117339/1659539184462-e7cd1ba6-1860-442b-a4dd-b96935b988d7.png)

### 主要功能：(The main function)

- 展示多个事件（开始结束时间、标题、内容等）； (A lot of events.)
- 支持事件区分类型展示（展示位置、颜色）；(Multiple types of events)
- 展示折线（时间，值）；(The line charts)
- 折线和事件时间同步，并支持同时拖拽滑动；(Synchronously, Drag the slide.)
- 鼠标 hover 查看事件/折线详细信息；(Mouse hover)

### 体验 Demo

- StackBlitz demo 地址：https://stackblitz.com/edit/react-ts-5wc5jt?file=index.tsx

Demo 演示:

```tsx
import React from 'react';
import EventLine, { EMouseStatus } from 'multi-event-line';

interface IEventType {
  label: string;
  value: string;
  sort: number;
  primaryColor?: string;
  secondaryColor?: string;
}

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

const EVENT_DATA: any = [
  {
    id: 1,
    startDate: '20211201',
    endDate: '20211220',
    title: '事件文本一',
    desc: '211201事件详情20211220',
    type: 'one', //事件类型
  },
  {
    id: 2,
    startDate: '20211214',
    endDate: '20220228',
    title: '事件文本二',
    desc: '20211214事件详情20220228',
    type: 'one', //事件类型
  },
  {
    id: 3,
    startDate: '20211209',
    endDate: '20220102',
    title: '事件文本三',
    desc: '20211209事件详情20220102',
    type: 'two', //事件类型
  },
  {
    id: 4,
    startDate: '20220101',
    endDate: '20220220',
    title: '事件文本四',
    desc: '20220101事件详情20220220',
    type: 'three', //事件类型
  },
  {
    id: 5,
    startDate: '20220301',
    endDate: '20220420',
    title: '事件文本五',
    desc: '20220301事件详情20220420',
    type: 'five', //事件类型
  },
];

const LINELIST: any = [
  {
    id: 1,
    dt: '20211201',
    value: 400,
  },
  {
    id: 2,
    dt: '20211214',
    value: 600,
  },
  {
    id: 3,
    dt: '20220101',
    value: 200,
  },
  {
    id: 4,
    dt: '20220215',
    value: 500,
  },
];

export default () => (
  <EventLine
    id="event-line"
    events={EVENT_DATA}
    eventTypes={eventTypes}
    lines={LINELIST}
    config={{}}
  />
);
```

## API

| 属性       | 说明                           | 类型         | 默认值        | 版本  |
| ---------- | ------------------------------ | ------------ | ------------- | ----- |
| id         | canvas 的 ID                   | string       | 'event-line'  | 1.0.0 |
| events     | 事件数据                       | EventItem[]  | -             | 1.0.0 |
| eventTypes | 枚举所有事件类型，并配置主题色 | IEventType[] | -             | 1.0.0 |
| lines      | 折线数据                       | LineItem []  | -             | 1.0.0 |
| config     | 配置项                         | IConfig      | defaultConfig | 1.0.0 |

上面 API 所涉及的类型如下：

```ts
interface EventItem {
  start: string;
  end?: string;
  title: string;
  desc?: string;
  [_: string]: any;
}

interface LineItem {
  dt: string;
  value: number;
  [_: string]: any;
}

interface IEventType {
  label: string;
  value: string;
  sort: number;
  primaryColor?: string;
  secondaryColor?: string;
}

// 默认配置，目前只支持这么多，更多配置在开发中

const defaultConfig: IConfig = {
  padding: [0, 0, 25, 0], // canvas的padding
  axis: {
    // 坐标轴
    height: 15,
    color: '#666',
  },
  scale: {
    // 刻度
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
  fieldNames: {
    // 字段别名
    eventTitleField: 'title',
    eventStart: 'startDate',
    eventEnd: 'endDate',
    eventSeriesField: 'type',
    lineXField: 'dt',
    lineYField: 'value',
    lineSeriesField: 'type',
  },
  eventTypeStyle: {
    // 事件类型样式
    width: 100,
    height: 40,
    textStyle: {
      font: 'bold 14px "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
    },
  },
  eventStyle: {
    // 事件样式
    height: 30,
    minWidth: 60,
    textStyle: {
      font: '14px "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
    },
  },
  lineStyle: {
    // 折线样式
    yScaleSpace: 50, // 通过space乘以count获取折线的高度
    yScaleCount: 6,
  },
};
```
