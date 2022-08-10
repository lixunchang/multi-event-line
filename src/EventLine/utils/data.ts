import moment from 'moment';

export const getLineDashYList = (count: number, space: number) => {
  const dashList: number[] = [];
  for (let i = 1; i <= count; i++) {
    dashList.push(i * space);
  }
  return dashList.reverse();
};

export const analysisEventData = (events: any, fieldNames: any = {}) => {
  const { startField = 'start', endField = 'end' } = fieldNames || {};
  return events.reduce(({ min, max }: any, event: any) => {
    return {
      min: Math.min(min || parseInt(event?.[startField]), parseInt(event?.[startField])),
      max: Math.max(max || 0, parseInt(event?.[endField])),
    };
  }, {});
};

// TODO seriesField 暂未开发
export const analysisLineData = (lines: any, fieldNames: any = {}) => {
  const { lineXField = 'dt', lineYField = 'value', lineY2Field = 'rate' } = fieldNames || {};
  return lines?.reduce(
    ({ minDt, maxDt, minValue, maxValue, min2Value, max2Value }: any, event: any) => {
      return {
        minDt: Math.min(minDt || parseInt(event?.[lineXField]), parseInt(event?.[lineXField])),
        maxDt: Math.max(maxDt || 0, parseInt(event?.[lineXField])),
        minValue: Math.min(
          minValue === 0 ? 0 : minValue || event?.[lineYField],
          event?.[lineYField],
        ),
        maxValue: Math.max(maxValue || 0, event?.[lineYField]),
        min2Value: Math.min(
          min2Value === 0 ? 0 : min2Value || event?.[lineY2Field],
          event?.[lineY2Field],
        ),
        max2Value: Math.max(max2Value || 0, event?.[lineY2Field]),
      };
    },
    {},
  );
};

// 向上取整十，整百，整千，整万
export const turnNumber = (value: number, method: 'ceil' | 'floor' = 'ceil') => {
  if (value === 0) return 0;
  let absValue = Math.abs(value);
  let plusMinus = value / absValue;
  let bite = 0;
  if (absValue < 10) {
    return method === 'ceil' ? 10 : 0;
  }
  while (absValue >= 10) {
    value /= 10;
    bite += 1;
  }
  return Math[method](absValue) * Math.pow(10, bite);
};

export const analysisEventLineData = (
  events: any,
  lines: any,
  { axisX, event, line }: Record<string, any> = {},
) => {
  const { forward = 30, behind = 30, unit = 'day', scale } = axisX || {};
  const { startField, endField } = event.fieldNames;
  const { xField, yField } = line;
  const [lineYField, lineY2Field, seriesField] = yField;

  const { min: eventMinDate, max: eventMaxDate } = analysisEventData(events, {
    startField,
    endField,
  });
  const {
    minDt: lineMinDate,
    maxDt: lineMaxDate,
    minValue: lineMinValue,
    maxValue: lineMaxValue,
    min2Value: lineMin2Value,
    max2Value: lineMax2Value,
  } = analysisLineData(lines, { xField, lineYField, lineY2Field, seriesField });
  const minDate = `${Math.min(eventMinDate, lineMinDate || eventMinDate)}`; //存在折线没有数据的情况
  const maxDate = `${Math.max(eventMaxDate, lineMaxDate || eventMaxDate)}`;
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
    axisYMin: lineMinValue === 0 ? 0 : turnNumber(lineMinValue, 'floor'),
    axisY2Max: Math.ceil(lineMax2Value),
    axisY2Min: Math.floor(lineMin2Value),
    eventMinDate,
    eventMaxDate,
    lineMinDate,
    lineMaxDate,
    lineMinValue,
    lineMaxValue,
  };
};
