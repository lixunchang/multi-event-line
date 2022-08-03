import React from 'react';
import { IEventItem, ILineItem } from './type';
interface IProps {
  id?: string;
  events: IEventItem[];
  eventTypes?: any;
  lines: ILineItem[];
  [_: string]: any;
}
declare const _default: React.MemoExoticComponent<
  ({ id, events, eventTypes: eTypes, lines, config: customConfig }: IProps) => JSX.Element
>;
export default _default;
