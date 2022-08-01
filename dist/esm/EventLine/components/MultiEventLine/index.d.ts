import React from 'react';
import { EventItem, LineItem } from '../../type';
interface IProps {
    id?: string;
    events: EventItem[];
    eventTypes?: any;
    lines: LineItem[];
    [_: string]: any;
}
declare const _default: React.MemoExoticComponent<({ id, events, eventTypes, lines, ...restConfig }: IProps) => JSX.Element>;
export default _default;
