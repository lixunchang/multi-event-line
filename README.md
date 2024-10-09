# EventLine 复合事件线组件

React 事件线组件：同步展示事件和折线图，并联动。

A React component that displays multiple types of events and line charts synchronously.

![示意图](https://camo.githubusercontent.com/3bf9667306cce7aa44778c3b7633f29d660c5a0031a36d91f2afbbc2762377fb/68747470733a2f2f70312d6a75656a696e2e62797465696d672e636f6d2f746f732d636e2d692d6b3375316662706663702f39353062663362303463666334376462383037626436336332643962363836637e74706c762d6b3375316662706663702d77617465726d61726b2e696d6167653f)

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

## 使用指南：( Use guide )

### 安装 ( Install )

```bash
$ npm i multi-event-line --save
```

### API

API 文档地址：https://lixunchang.github.io/multi-event-line/event-line

### 体验 Demo

- StackBlitz demo 地址：https://stackblitz.com/edit/multi-event-line-demo?file=App.tsx

### 使用示例 ( Demo )

```tsx
import React from 'react';
import EventLine from 'multi-event-line';

export default () => (
  <EventLine
    id="event-line"
    events={
      [
        {
          id: string|number,
          start: string,
          end: string,
          title: string,
          detail: string,
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

## 计划代办：(Todo List)

- canvas 缩放下载等功能区的实现；(Zoom, Download，etc Toolbar.)
- 折线缩略轴；(The line charts thumbnail.)；

## 温馨提示：(Tips)

- 目前组件基础功能已经调试完毕，欢迎大家试用;
- At present, the components are still under development and should be used cautiously in the production environment.

- 有问题欢迎提 issues;
- However, you are welcome to try it out. Please raise issues if you have any questions

## 版本迭代：（Versions）

- 1.2.10

  > -
  > -
  > -
  > - 简化事件类型字段名
  > - gh-pages 配置
  > -

- 1.2.9

  > - 删除首页 API；
  > - 新增 API 文档地址；

- 1.2.8
  > - 修复折线展示 bug;
  > - 优化滑动性能；
  > - 更新组件库首页文档；
