export interface IEventItem {
  startDate?: string;
  endDate?: string;
  title: string;
  desc?: string;
  [_: string]: any;
}

export interface ILineItem {
  dt?: string;
  value?: number;
  [_: string]: any;
}

export interface IEventType {
  label: string;
  value: string;
  sort: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export enum EMouseStatus {
  NONE = 'none',
  DRAG = 'drag',
  SCROLL_X = 'scroll_x',
  SCROLL_Y = 'scroll_y',
  HOVER = 'hover',
  CLICK = 'click',
  DOWN = 'down',
  MOVE = 'move',
  UP = 'up',
}

export interface ILocation {
  x: number;
  y: number;
}

export enum ETooltipStatus {
  NOTHING = 'nothing',
  EVENT = 'event',
  LINE = 'line',
}

export interface IConfig {
  padding: number[]; //同css设置，目前只上下有效，左右待开发
  font: string;
  axisX: Record<string, any>;
  event: any;
  line: any;
}
