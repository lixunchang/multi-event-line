# multi-event-line

A React component that displays multiple types of events and line charts synchronously.

React 事件线组件：同步展示事件和折线图，并联动。

![一期示意图](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/950bf3b04cfc47db807bd63c2d9b686c~tplv-k3u1fbpfcp-watermark.image?)

### 主要功能：(The main function)

- 展示多个事件（开始/结束时间、标题、内容等）； (A lot of events.)
- 支持只有开始时间没有结束时间的的事件；(Event without endDate)
- 支持设置事件展示最小宽度；(Event min with)
- 支持事件区分类型展示（展示位置、颜色）；(Multiple types of events)
- 展示折线（时间，值）；(The line charts)
- 折线和事件时间同步，并支持同时拖拽滑动；(Synchronously, Drag the slide.)
- 鼠标 hover 查看事件/折线详细信息；(Mouse hover)
- 事件选择；(Select event.)；
- 自定义 tooltip；（To custom tooltip）
- 绘制事件圆角边框；(Draw rect radius)
- 鼠标滚轮滚动、触摸板双指左右滑动；(Move with mouse)
- 宽度自动获取父级宽度；（Width Auto width）

### 体验 Demo

- StackBlitz demo 地址：https://stackblitz.com/edit/multi-event-line-demo?file=App.tsx

### 二期方向：

- canvas 缩放下载等功能区的实现；(Zoom, Download，etc Toolbar.)
- 折线缩略轴；(The line charts thumbnail.)；

## 使用指南：( Use guide )

### 安装 ( Install )

```bash
$ npm i multi-event-line --save
```

## 使用示例 ( Demo )

```tsx
import React from 'react';
import { EventLine } from 'multi-event-line';

export default () => (
  <EventLine
    id="event-line"
    events={
      [
        {
          id: string|number,
          startDate: string,
          endDate: string,
          title: string,
          desc: string,
          type: string
        }
      ]
    }
    eventTypes={
      [
        {
          value: string,
          label: string,
          sort: number,
          primaryColor: string, // 事件类型主题色，边框文字颜色
          secondaryColor: string, // 事件类型次主题色，背景颜色
        }
      ]
    }
    lines={
      [
        {
          id: string|number;
          dt: string;
          value: number;
        }
      ]
    }
    config={{}}
  />
);

```

## API

| 属性       | 说明                           | 类型         | 是否必传 | 默认值        | 版本  |
| ---------- | ------------------------------ | ------------ | -------- | ------------- | ----- |
| id         | canvas 的 ID                   | string       | 非必传   | 'event-line'  | 1.0.0 |
| events     | 事件数据                       | EventItem[]  | 必传     | -             | 1.0.0 |
| eventTypes | 枚举所有事件类型，并配置主题色 | IEventType[] | 必传     | -             | 1.0.0 |
| lines      | 折线数据                       | LineItem []  | 非必传   | -             | 1.0.0 |
| config     | 配置项                         | IConfig      | 非必传   | defaultConfig | 1.0.0 |

> events 和 eventTypes 是必传项，lines 可不传

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
  // canvas的padding
  padding: [24, 24, 48, 0],
  // 折线图左侧指示文案
  lineTitle: '趋势图',
  // 坐标轴
  axis: {
    height: 15,
    color: '#666',
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
```

## 温馨提示：(Tips)

- 目前组件基础功能已经调试完毕，欢迎大家试用;
- At present, the components are still under development and should be used cautiously in the production environment.

- 有问题欢迎提 issues;
- However, you are welcome to try it out. Please raise issues if you have any questions
