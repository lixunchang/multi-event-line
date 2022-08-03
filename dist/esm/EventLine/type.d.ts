export interface IEventItem {
  start: string;
  end?: string;
  title: string;
  desc?: string;
  [_: string]: any;
}
export interface ILineItem {
  dt: string;
  value: number;
  [_: string]: any;
}
export interface IEventType {
  label: string;
  value: string;
  sort: number;
  primaryColor?: string;
  secondaryColor?: string;
}
export declare enum EMouseStatus {
  NOTHING = 'nothing',
  DRAGING = 'draging',
  MOVEING = 'moveing',
}
export interface ILocation {
  x: number;
  y: number;
}
export declare enum ETooltipStatus {
  NOTHING = 'nothing',
  EVENT = 'event',
  LINE = 'line',
}
export interface IConfig {
  padding: number[];
  axis: Record<string, any>;
  scale: Record<string, any>;
  fieldNames: Record<string, any>;
  eventTypeStyle: Record<string, any>;
  eventStyle: Record<string, any>;
  lineStyle: Record<string, any>;
}
