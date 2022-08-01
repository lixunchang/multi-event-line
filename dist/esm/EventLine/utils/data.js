import moment from 'moment';
export var analysisEventData = function analysisEventData(events) {
  var fieldNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = fieldNames || {},
      _ref$eventStart = _ref.eventStart,
      eventStart = _ref$eventStart === void 0 ? 'startDate' : _ref$eventStart,
      _ref$eventEnd = _ref.eventEnd,
      eventEnd = _ref$eventEnd === void 0 ? 'endDate' : _ref$eventEnd;

  return events.reduce(function (_ref2, event) {
    var min = _ref2.min,
        max = _ref2.max;
    return {
      min: Math.min(min || parseInt(event === null || event === void 0 ? void 0 : event[eventStart]), parseInt(event === null || event === void 0 ? void 0 : event[eventStart])),
      max: Math.max(max || 0, parseInt(event === null || event === void 0 ? void 0 : event[eventEnd]))
    };
  }, {});
}; // TODO seriesField 暂未开发

export var analysisLineData = function analysisLineData(lines) {
  var fieldNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref3 = fieldNames || {},
      _ref3$lineXField = _ref3.lineXField,
      lineXField = _ref3$lineXField === void 0 ? 'dt' : _ref3$lineXField,
      _ref3$lineYField = _ref3.lineYField,
      lineYField = _ref3$lineYField === void 0 ? 'value' : _ref3$lineYField,
      _ref3$lineSeriesField = _ref3.lineSeriesField,
      lineSeriesField = _ref3$lineSeriesField === void 0 ? 'type' : _ref3$lineSeriesField;

  return lines.reduce(function (_ref4, event) {
    var minDt = _ref4.minDt,
        maxDt = _ref4.maxDt,
        minValue = _ref4.minValue,
        maxValue = _ref4.maxValue;
    return {
      minDt: Math.min(minDt || parseInt(event === null || event === void 0 ? void 0 : event[lineXField]), parseInt(event === null || event === void 0 ? void 0 : event[lineXField])),
      maxDt: Math.max(maxDt || 0, parseInt(event === null || event === void 0 ? void 0 : event[lineXField])),
      minValue: Math.min(minValue || (event === null || event === void 0 ? void 0 : event[lineYField]), event === null || event === void 0 ? void 0 : event[lineYField]),
      maxValue: Math.max(maxValue || 0, event === null || event === void 0 ? void 0 : event[lineYField])
    };
  }, {});
}; // 向上取整十，整百，整千，整万

export var turnNumber = function turnNumber(value) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ceil';
  var bite = 0;

  if (value < 10) {
    return 10;
  }

  while (value >= 10) {
    value /= 10;
    bite += 1;
  }

  return Math[method](value) * Math.pow(10, bite);
};
export var analysisEventLineData = function analysisEventLineData(events, lines) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _ref5 = config || {},
      _ref5$forward = _ref5.forward,
      forward = _ref5$forward === void 0 ? 30 : _ref5$forward,
      _ref5$behind = _ref5.behind,
      behind = _ref5$behind === void 0 ? 30 : _ref5$behind,
      _ref5$unit = _ref5.unit,
      unit = _ref5$unit === void 0 ? 'day' : _ref5$unit,
      _ref5$fieldNames = _ref5.fieldNames,
      fieldNames = _ref5$fieldNames === void 0 ? {} : _ref5$fieldNames,
      scale = _ref5.scale;

  var _ref6 = fieldNames || {},
      _ref6$eventStart = _ref6.eventStart,
      eventStart = _ref6$eventStart === void 0 ? 'startDate' : _ref6$eventStart,
      _ref6$eventEnd = _ref6.eventEnd,
      eventEnd = _ref6$eventEnd === void 0 ? 'endDate' : _ref6$eventEnd,
      _ref6$lineXField = _ref6.lineXField,
      lineXField = _ref6$lineXField === void 0 ? 'dt' : _ref6$lineXField,
      _ref6$lineYField = _ref6.lineYField,
      lineYField = _ref6$lineYField === void 0 ? 'value' : _ref6$lineYField,
      _ref6$lineSeriesField = _ref6.lineSeriesField,
      lineSeriesField = _ref6$lineSeriesField === void 0 ? 'type' : _ref6$lineSeriesField;

  var _analysisEventData = analysisEventData(events, {
    eventStart: eventStart,
    eventEnd: eventEnd
  }),
      eventMinDate = _analysisEventData.min,
      eventMaxDate = _analysisEventData.max;

  var _analysisLineData = analysisLineData(lines, {
    lineXField: lineXField,
    lineYField: lineYField,
    lineSeriesField: lineSeriesField
  }),
      lineMinDate = _analysisLineData.minDt,
      lineMaxDate = _analysisLineData.maxDt,
      lineMinValue = _analysisLineData.minValue,
      lineMaxValue = _analysisLineData.maxValue;

  var minDate = "".concat(Math.min(eventMinDate, lineMinDate));
  var maxDate = "".concat(Math.max(eventMaxDate, lineMaxDate));
  var axisXStart = moment(minDate).subtract(forward, unit).format('YYYYMMDD');
  var axisXEnd = moment(maxDate).add(behind, unit).format('YYYYMMDD');
  var axisXTotal = moment(axisXEnd).diff(moment(axisXStart), unit);
  return {
    minDate: minDate,
    maxDate: maxDate,
    axisXStart: axisXStart,
    axisXEnd: axisXEnd,
    axisXWidth: axisXTotal * scale.space,
    axisXTotal: axisXTotal,
    axisYMax: turnNumber(lineMaxValue, 'ceil'),
    axisYMin: turnNumber(lineMinValue, 'floor'),
    eventMinDate: eventMinDate,
    eventMaxDate: eventMaxDate,
    lineMinDate: lineMinDate,
    lineMaxDate: lineMaxDate,
    lineMinValue: lineMinValue,
    lineMaxValue: lineMaxValue
  };
};