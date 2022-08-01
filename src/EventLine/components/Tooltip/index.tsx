import React from 'react';
import { ETooltipStatus } from '../../type';
import styles from './index.less';

interface IProps {
  location: any;
  pointLocation: any;
  title: string;
  desc: string;
  label?: string;
  type: ETooltipStatus;
}
export default React.memo(
  ({ location, pointLocation, title, desc, type, label }: IProps) => {
    if (!location || !title || type === ETooltipStatus.NOTHING) return null;
    return (
      <>
        <div className={styles.Tooltip} style={{ left: location?.x + 10, top: location?.y }}>
          <div className={styles.title}>{title}</div>
          <div className={styles.desc}>
            {type === ETooltipStatus.LINE && label && <span>{label}:</span>}
            <span>{desc}</span>
          </div>
        </div>
        {type === ETooltipStatus.LINE && pointLocation && (
          <>
            <span className={styles.tooltipLine} style={{ left: pointLocation?.x }} />
            <span
              className={styles.linePoint}
              style={{ left: pointLocation?.x - 3, top: pointLocation?.y - 2 }}
            />
          </>
        )}
      </>
    );
  },
  (prev, next) => {
    if (
      Math.abs(prev.location?.x - next.location?.x) > 4 ||
      Math.abs(prev.location?.y - next.location?.y) > 4 ||
      prev.title !== next.title ||
      prev.desc !== next.desc
    ) {
      return false;
    }
    return true;
  },
);
