# multi-event-line

---

## React 事件线组件：同步展示事件和折线图。（A React component that displays multiple types of events and line charts synchronously.）

### 主要功能：(The main function)

- 展示多个事件（开始结束时间、标题、内容等）； (A lot of events.)
- 支持事件区分类型展示（展示位置、颜色）；(Multiple types of events)
- 展示折线（时间，值）；(The line charts)
- 折线和事件时间同步，并支持同时拖拽滑动；(Synchronously, Drag the slide.)
- 鼠标 hover 查看事件/折线详细信息；(Mouse hover)

### 开发中：
- 样式优化；(Style optimization.)
- 事件选择；(Select event.)
- 折线缩略轴；(The line charts thumbnail.)

## 使用指南：( Use guide )

### 安装 ( Install )

```bash
$ npm i multi-event-line
```

## 使用示例 ( Demo )

```bash
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
  />
);

```

## 温馨提示：(Tips)

- 目前组件还在开发中，生产环境谨慎使用;
- At present, the components are still under development and should be used cautiously in the production environment.

- 不过还是欢迎大家试用，有问题欢迎提 issues;
- However, you are welcome to try it out. Please raise issues if you have any questions
