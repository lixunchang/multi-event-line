import moment from 'moment';

// 向上取整十，整百，整千，整万 ceil向上，floor向下
export const turnNumber = (value: number, method: 'ceil' | 'floor', rate = 1) => {
  if (value === 0) return 0;
  let plus = 1;
  let fun = method;
  if (value < 0) {
    plus = -1;
    fun = method === 'ceil' ? 'floor' : 'ceil';
  }
  let absValue = Math.abs(value * rate);
  let bite = 0;
  if (absValue < 10) {
    return fun === 'ceil' ? plus * 10 / rate : 0;
  }
  while (absValue >= 10) {
    absValue /= 10;
    bite += 1;
  }
  return (plus * Math[fun](absValue) * Math.pow(10, bite)) / rate;
};

export const momentMin = (date1: any, date2: any) => {
  if (moment(date1).isBefore(date2)) {
    return date1;
  }
  return date2;
};

export const momentMax = (date1: any, date2: any) => {
  if (moment(date1).isBefore(date2)) {
    return date2;
  }
  return date1;
};

export const getLineDashYList = (count: number, space: number) => {
  const dashList: number[] = [];
  for (let i = 1; i <= count; i++) {
    dashList.push(i * space);
  }
  return dashList.reverse();
};

export const analysisEventData = (events: any, fieldNames: any = {}) => {
  const { startField = 'start', endField = 'end' } = fieldNames || {};
  const { startMin, startMax, endMax } = events.reduce(
    ({ startMin, startMax, endMax }: any, event: any) => {
      return {
        startMin: momentMin(startMin || event?.[startField], event?.[startField]),
        startMax: momentMax(startMax || event?.[startField], event?.[startField]),
        endMax: momentMax(endMax || 0, event?.[endField]),
      };
    },
    {},
  );

  return {
    min: startMin,
    max: momentMax(startMax, endMax),
  };
};

export const analysisLineData = (lines: any=[], { xField, yField, axisY }: any = {}) => {
  return lines?.reduce(({ minDt, maxDt, minValue, maxValue, types }: any, item: any) => {
    return {
      minDt: momentMin(minDt || item?.[xField], item?.[xField]),
      maxDt: momentMax(maxDt || 0, item?.[xField]),
      minValue: Math.min(minValue === 0 ? 0 : minValue || item?.[yField], item?.[yField]),
      maxValue: Math.max(maxValue || 0, item?.[yField]),
      types: new Set([...(types || []), item?.[axisY?.seriesField]]),
    };
  }, {});
};

export const analysisEventLineData = (
  events: any,
  lines: any,
  { axisX, event, line }: Record<string, any> = {},
) => {
  const { forward = 30, behind = 30, unit = 'day', scale } = axisX || {};
  const [leftLines, rightLines] = lines;
  const [leftYField, rightYField] = line.yField;
  const { min: eventMinDate, max: eventMaxDate } = analysisEventData(events, event.fieldNames);
  // xField, yField, axisY
  const {
    minDt: leftLineMinDate,
    maxDt: leftLineMaxDate,
    minValue: leftLineMinValue,
    maxValue: leftLineMaxValue,
    types: leftLineTypes = [],
  } = analysisLineData(leftLines, {
    xField: line.xField,
    yField: leftYField,
    axisY: line.axis.y.left,
  });
  const {
    minDt: rightLineMinDate,
    maxDt: rightLineMaxDate,
    minValue: rightLineMinValue,
    maxValue: rightLineMaxValue,
    types: rightLineTypes = [],
  } = analysisLineData(rightLines, {
    xField: line.xField,
    yField: rightYField,
    axisY: line.axis.y.right,
  });

  const lineMinDate = momentMin(leftLineMinDate, rightLineMinDate);
  const lineMaxDate = momentMax(leftLineMaxDate, rightLineMaxDate);

  const { left: leftY, right: rightY } = line.axis.y;
  const minDate = momentMin(eventMinDate, lineMinDate || eventMinDate); //存在折线没有数据的情况
  const maxDate = momentMax(eventMaxDate, lineMaxDate || eventMaxDate);
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
    axisYMax: turnNumber(leftLineMaxValue, 'ceil', leftY?.isRate ? 100 : 1),
    axisYMin: turnNumber(leftLineMinValue, 'floor', leftY?.isRate ? 100 : 1),
    axisY2Max: turnNumber(rightLineMaxValue, 'ceil', rightY?.isRate ? 100 : 1),
    axisY2Min: turnNumber(rightLineMinValue, 'floor', rightY?.isRate ? 100 : 1),
    eventMinDate,
    eventMaxDate,
    lineMinDate,
    lineMaxDate,
    leftLineTypes: Array.from(leftLineTypes).filter((i) => i),
    rightLineTypes: Array.from(rightLineTypes).filter((i) => i),
  };
};
