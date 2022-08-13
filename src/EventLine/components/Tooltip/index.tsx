import React, { CSSProperties, ReactNode } from 'react';
import { ETooltipStatus } from '../../type';
import TooltipContent from './Content';
import './index.css';

interface IProps {
  location: any;
  canvasSize: any;
  pointLocation: any;
  fieldNames: {
    event: Record<string, any>;
    line: Record<string, any>;
  };
  label?: string;
  type: ETooltipStatus;
  data: Record<string, any>;
  customContent?: { style: CSSProperties; event?: ReactNode; line?: string[] | ReactNode };
  guideLineStyle: CSSProperties;
}
export default React.memo(
  ({
    location,
    canvasSize,
    pointLocation,
    fieldNames,
    type,
    guideLineStyle,
    customContent,
    data,
  }: IProps) => {
    if (!location || !data || type === ETooltipStatus.NOTHING) return null;
    const { width, height } = canvasSize;
    const tooRight = location?.x * 4 > width * 3;
    const tooTop = location?.y * 4 < height;
    const positionStyle = {
      [tooRight ? 'right' : 'left']: tooRight ? width - location?.x + 10 : location?.x + 10,
      [tooTop ? 'top' : 'bottom']: tooTop ? location?.y + 10 : height - location?.y + 10,
    };
    return (
      <>
        <div
          className="Tooltip"
          style={{
            // left: location?.x + 10,
            // top: location?.y + 10,
            ...positionStyle,
            ...(customContent?.style || {}),
          }}
        >
          <TooltipContent
            type={type}
            data={data}
            customContent={customContent}
            fieldNames={fieldNames}
            pointLocation={pointLocation.map(({ key, label, yField, data, color }: any) => ({
              key,
              label,
              yField,
              data,
              color,
            }))}
          />
        </div>
        {type === ETooltipStatus.LINE && pointLocation?.length > 0 && (
          <>
            {pointLocation?.map(({ x, y, color = '#1890ff' }: any, index: number) => (
              <span key={index + '_' + x + '_' + y}>
                <span className="tooltipLine" style={{ left: x - 1, ...guideLineStyle }} />
                <span
                  className="linePoint"
                  style={{ background: color, left: x - 4, top: y - 4 }}
                />
              </span>
            ))}
          </>
        )}
      </>
    );
  },
  (prev, next) => {
    // return false 更新，true不更新
    return !(
      Math.abs((prev.location?.x || 0) - next.location?.x.toFixed(0)) >= 4 ||
      Math.abs((prev.location?.y || 0) - next.location?.y.toFixed(0)) >= 4
    );
  },
);
