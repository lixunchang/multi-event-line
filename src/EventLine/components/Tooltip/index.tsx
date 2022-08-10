import React, { CSSProperties, ReactNode } from 'react';
import { ETooltipStatus } from '../../type';
import './index.css';

interface IProps {
  location: any;
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
  ({ location, pointLocation, fieldNames, type, guideLineStyle, customContent, data }: IProps) => {
    if (!location || type === ETooltipStatus.NOTHING) return null;
    const { event: eventFields, line: lineFields } = fieldNames;
    const [leftField = 'value', rightField] = lineFields?.yField || [];
    const { style, event, line } = customContent || {};
    const pointColor = pointLocation.reduce(
      (total: any, { key, color }: any) => ({
        ...total,
        [key]: color,
      }),
      {},
    );
    return (
      <>
        <div
          className="Tooltip"
          style={{ left: location?.x + 10, top: location?.y + 14, ...style }}
        >
          {type === ETooltipStatus.LINE && (
            <>
              {typeof line === 'function' ? (
                line(data, location)
              ) : (
                <>
                  <div className="title">{data?.[lineFields?.xField || 'dt']}</div>
                  <div className="desc">
                    <span className="label">
                      <span className="labelPoint" style={{ background: pointColor.value }} />
                      <span>{Array.isArray(line) && line[0] ? line[0] : leftField}:</span>
                    </span>
                    <span>{data?.[leftField]}</span>
                  </div>
                  {rightField && (
                    <div className="desc">
                      <span className="label">
                        <span className="labelPoint" style={{ background: pointColor.rate }} />
                        <span>{Array.isArray(line) && line[1] ? line[1] : rightField}:</span>
                      </span>
                      <span>{data?.[rightField]}</span>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {type === ETooltipStatus.EVENT && (
            <div>
              {typeof event === 'function' ? (
                event(data, location)
              ) : (
                <>
                  <div className="title">1{data?.[eventFields?.titleField]}</div>
                  <div className="desc">
                    <span>1{data?.[eventFields?.detailField]}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {type === ETooltipStatus.LINE && pointLocation?.length > 0 && (
          <>
            {pointLocation?.map(({ x, y, color = '#1890ff' }: any) => (
              <span key={x + '_' + y}>
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
  // (prev, next) => {
  //   if (
  //     Math.abs(prev.location?.x - next.location?.x) > 4 ||
  //     Math.abs(prev.location?.y - next.location?.y) > 4 ||
  //     prev.title !== next.title ||
  //     prev.desc !== next.desc
  //   ) {
  //     return false;
  //   }
  //   return true;
  // },
);
