import React, { CSSProperties, ReactNode } from 'react';
import { ETooltipStatus } from '../../type';
import './index.css';

interface IProps {
  location: any;
  pointLocation: any;
  title: string;
  desc: string;
  label?: string;
  type: ETooltipStatus;
  data: Record<string, any>;
  customContent?: { style: CSSProperties; event?: ReactNode; line?: string | ReactNode };
  guideLineStyle: CSSProperties;
}
export default React.memo(
  ({ location, pointLocation, title, desc, type, guideLineStyle, customContent, data }: IProps) => {
    if (!location || !title || type === ETooltipStatus.NOTHING) return null;
    const { style, event, line } = customContent || {};
    return (
      <>
        <div className="Tooltip" style={{ left: location?.x + 10, top: location?.y, ...style }}>
          {type === ETooltipStatus.LINE && (
            <>
              {typeof line === 'function' ? (
                line(data)
              ) : (
                <>
                  <div className="title">{title}</div>
                  <div className="desc">
                    <span>{line || 'value'}:</span>
                    <span>{desc}</span>
                  </div>
                </>
              )}
            </>
          )}
          {type === ETooltipStatus.EVENT && (
            <div>
              {typeof event === 'function' ? (
                event(data)
              ) : (
                <>
                  <div className="title">{title}</div>
                  <div className="desc">
                    <span>{desc}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {type === ETooltipStatus.LINE && pointLocation && (
          <>
            <span
              className="tooltipLine"
              style={{ left: pointLocation?.x - 1, ...guideLineStyle }}
            />
            <span
              className="linePoint"
              style={{ left: pointLocation?.x - 4, top: pointLocation?.y - 4 }}
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
