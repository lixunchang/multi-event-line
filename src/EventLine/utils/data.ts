import moment from 'moment';

export const getLineDashYList = (count: number, space: number) => {
  const dashList: number[] = [];
  for (let i = 1; i < count; i++) {
    dashList.push(i * space);
  }
  return dashList;
};

export const analysisEventData = (events: any, fieldNames: any = {}) => {
  const { eventStart = 'startDate', eventEnd = 'endDate' } = fieldNames || {};
  return events.reduce(({ min, max }: any, event: any) => {
    return {
      min: Math.min(min || parseInt(event?.[eventStart]), parseInt(event?.[eventStart])),
      max: Math.max(max || 0, parseInt(event?.[eventEnd])),
    };
  }, {});
};
// TODO seriesField 暂未开发
export const analysisLineData = (lines: any, fieldNames: any = {}) => {
  const { lineXField = 'dt', lineYField = 'value', lineSeriesField = 'type' } = fieldNames || {};
  return lines.reduce(({ minDt, maxDt, minValue, maxValue }: any, event: any) => {
    return {
      minDt: Math.min(minDt || parseInt(event?.[lineXField]), parseInt(event?.[lineXField])),
      maxDt: Math.max(maxDt || 0, parseInt(event?.[lineXField])),
      minValue: Math.min(minValue || event?.[lineYField], event?.[lineYField]),
      maxValue: Math.max(maxValue || 0, event?.[lineYField]),
    };
  }, {});
};

// 向上取整十，整百，整千，整万
export const turnNumber = (value: number, method: 'ceil' | 'floor' = 'ceil') => {
  let bite = 0;
  if (value < 10) {
    return 10;
  }
  while (value >= 10) {
    value /= 10;
    bite += 1;
  }
  return Math[method](value) * Math.pow(10, bite);
};

export const analysisEventLineData = (
  events: any,
  lines: any,
  config: Record<string, any> = {},
) => {
  const { forward = 30, behind = 30, unit = 'day', fieldNames = {}, scale } = config || {};
  const {
    eventStart = 'startDate',
    eventEnd = 'endDate',
    lineXField = 'dt',
    lineYField = 'value',
    lineSeriesField = 'type',
  } = fieldNames || {};

  const { min: eventMinDate, max: eventMaxDate } = analysisEventData(events, {
    eventStart,
    eventEnd,
  });
  const {
    minDt: lineMinDate,
    maxDt: lineMaxDate,
    minValue: lineMinValue,
    maxValue: lineMaxValue,
  } = analysisLineData(lines, { lineXField, lineYField, lineSeriesField });
  const minDate = `${Math.min(eventMinDate, lineMinDate)}`;
  const maxDate = `${Math.max(eventMaxDate, lineMaxDate)}`;
  const axisXStart = moment(minDate).subtract(forward, unit).format('YYYYMMDD');
  const axisXEnd = moment(maxDate).add(behind, unit).format('YYYYMMDD');
  const axisXTotal = moment(axisXEnd).diff(moment(axisXStart), unit);
  return {
    minDate,
    maxDate,
    axisXStart,
    axisXEnd,
    axisXWidth: axisXTotal * scale.space,
    axisXTotal,
    axisYMax: turnNumber(lineMaxValue, 'ceil'),
    axisYMin: turnNumber(lineMinValue, 'floor'),
    eventMinDate,
    eventMaxDate,
    lineMinDate,
    lineMaxDate,
    lineMinValue,
    lineMaxValue,
  };
};
