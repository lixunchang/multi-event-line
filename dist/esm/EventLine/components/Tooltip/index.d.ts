import React, { CSSProperties } from 'react';
import { ETooltipStatus } from '../../type';
interface IProps {
  location: any;
  pointLocation: any;
  title: string;
  desc: string;
  label?: string;
  type: ETooltipStatus;
  guideLineStyle: CSSProperties;
}
declare const _default: React.MemoExoticComponent<
  ({
    location,
    pointLocation,
    title,
    desc,
    type,
    label,
    guideLineStyle,
  }: IProps) => JSX.Element | null
>;
export default _default;
