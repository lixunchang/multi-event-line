import React from 'react';
import { ETooltipStatus } from '../../type';
interface IProps {
    location: any;
    pointLocation: any;
    title: string;
    desc: string;
    label?: string;
    type: ETooltipStatus;
}
declare const _default: React.MemoExoticComponent<({ location, pointLocation, title, desc, type, label }: IProps) => JSX.Element | null>;
export default _default;
