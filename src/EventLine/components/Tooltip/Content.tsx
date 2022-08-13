import React from 'react';
import { ETooltipStatus } from '../../type';

export default React.memo(({ type, pointLocation, customContent, fieldNames, data }: any) => {
  const { event: eventFields, line: lineFields } = fieldNames;
  const { event, line } = customContent || {};
  return (
    <>
      {type === ETooltipStatus.LINE && (
        <>
          {typeof line === 'function' ? (
            line(data, location)
          ) : (
            <>
              <div className="title">{data?.[lineFields?.xField || 'dt']}</div>
              {pointLocation?.map(({ key, label, yField, data, color }: any) => {
                return (
                  <div key={key} className="desc">
                    <span className="label">
                      <span className="labelPoint" style={{ background: color }} />
                      <span>{label || yField}:</span>
                    </span>
                    <span>{data?.[yField]}</span>
                  </div>
                );
              })}
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
    </>
  );
});
