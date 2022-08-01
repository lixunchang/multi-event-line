---
nav:
  title: Components
  path: /components
---

## EventLine

Demo 演示:

```tsx
import React from 'react';
import { EventLine } from 'multi-event-line';

interface IEventType {
  label: string;
  value: string;
  sort: number;
  themeColor?: string;
  borderColor?: string;
}

const eventTypes: IEventType[] = [
  {
    value: 'zero',
    label: '趋势图',
    sort: 0,
  },
  {
    value: 'one',
    label: '第一栏',
    sort: 1,
  },
  {
    value: 'two',
    label: '第二栏',
    sort: 2,
  },
  {
    value: 'three',
    label: '第三栏',
    sort: 3,
  },
  {
    value: 'four',
    label: '第四栏',
    sort: 4,
  },
  {
    value: 'five',
    label: '第五栏',
    sort: 5,
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
  <EventLine id="event-line" events={EVENT_DATA} eventTypes={eventTypes} lines={LINELIST} />
);
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
