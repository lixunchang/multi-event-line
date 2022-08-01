var _excluded = ["id", "events", "eventTypes", "lines"];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import useMouseMove from "../../hooks/useMouseMove";
import { ETooltipStatus } from "../../type";
import { analysisEventLineData } from "../../utils/data";
import defaultConfig from "../../config";
import { drawAxisScale, drawChartLines, drawEventRectWidthText, drawHorizontalLine } from "../../utils/draw";
import styles from "./index.less";
import Tooltip from "../Tooltip";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var moment = extendMoment(Moment);
var START_X = 100;
var START_Y = 300;
var dashLineSpace = 50;
var dashLineList = [250, 200, 150, 100, 50]; // const DAY_TEXT_RANGE = 6; // 日期文本间隔
// const DAY_SCALE_FONT_SIZE = 6;
// const DAY_SCALE = 10; // 日间隔
// const SCALE_LINE_WIDTH = 1;
// const TEXT_COLOR = '#222222';
// const YEAR_COLOR = '#000';
// const YEAR_HEIGHT = 15;
// const MONTH_COLOR = '#666';
// const MONTH_HEIGHT = 10;
// const DAY_COLOR = '#999';
// const DAY_HEIGHT = 6;
// const AXIS_COLOR = '#666';

export default /*#__PURE__*/React.memo(function (_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? 'event-line' : _ref$id,
      events = _ref.events,
      eventTypes = _ref.eventTypes,
      lines = _ref.lines,
      restConfig = _objectWithoutProperties(_ref, _excluded);

  var config = _objectSpread(_objectSpread({}, defaultConfig), restConfig);

  var canvasRef = useRef(null);
  var getContext = useCallback(function () {
    return canvasRef.current.getContext('2d');
  }, [canvasRef.current]);

  var _useState = useState(ETooltipStatus.NOTHING),
      _useState2 = _slicedToArray(_useState, 2),
      tooltipStatus = _useState2[0],
      setTooltipStatus = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      tooltipData = _useState4[0],
      setTooltipData = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      linePoint = _useState6[0],
      setLinePoint = _useState6[1];

  var _analysisEventLineDat = analysisEventLineData(events, lines, config),
      axisXStart = _analysisEventLineDat.axisXStart,
      axisXEnd = _analysisEventLineDat.axisXEnd,
      lineMinValue = _analysisEventLineDat.lineMinValue,
      lineMaxValue = _analysisEventLineDat.lineMaxValue,
      axisYMax = _analysisEventLineDat.axisYMax,
      axisYMin = _analysisEventLineDat.axisYMin,
      axisXWidth = _analysisEventLineDat.axisXWidth;

  var axisXData = Array.from(moment.range(moment(axisXStart), moment(axisXEnd)).by('days')).map(function (item) {
    return item.format('YYYYMMDD');
  });

  var _useMouseMove = useMouseMove("#".concat(id), -100, axisXWidth - 200),
      mouseMoveX = _useMouseMove.mouseMoveX,
      mouseXY = _useMouseMove.mouseXY;

  var showTooltip = function showTooltip(type, area, data) {
    if (mouseXY && mouseXY.x >= area.x && mouseXY.x <= area.x + (area.w || 2) && mouseXY.y >= area.y && mouseXY.y <= area.y + (area.h || 2)) {
      if (type === ETooltipStatus.LINE) {
        setLinePoint({
          x: area === null || area === void 0 ? void 0 : area.pointX,
          y: area === null || area === void 0 ? void 0 : area.pointY
        });
      }

      setTooltipStatus(type);
      setTooltipData(data);
    } else if (tooltipStatus === type && (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.id) === data.id) {
      setTooltipStatus(ETooltipStatus.NOTHING);
      setTooltipData(undefined);
    }
  }; // console.log(
  //   'analysis=',
  //   mouseMoveX,
  //   minDate,
  //   maxDate,
  //   axisXStart,
  //   axisXEnd,
  //   axisXTotal,
  //   lineMinValue,
  //   lineMaxValue,
  //   axisYMax,
  //   axisYMin,
  // );


  var clearCanvas = function clearCanvas() {
    var context = getContext();
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  var drawXAxis = function drawXAxis(offsetX, offsetY, moveX) {
    var context = getContext(); // 事件x轴

    drawHorizontalLine(context, offsetX, [offsetY], {
      isAxis: true,
      axisXData: axisXData,
      strokeStyle: '#999',
      lineMinValue: lineMinValue,
      lineMaxValue: lineMaxValue,
      scale: config.scale
    });
    drawAxisScale(context, offsetX - moveX, offsetY, {
      axisXData: axisXData,
      scale: config.scale
    }); // 绘制刻度
  };

  var drawAxisAndLine = function drawAxisAndLine(offsetX, offsetY, moveX) {
    var context = getContext();
    drawXAxis(offsetX, offsetY, moveX);
    drawXAxis(offsetX, offsetY + 300, moveX); // 画事件类型

    drawEventTypes(offsetX, offsetY); // 画辅助线

    drawHorizontalLine(context, offsetX, dashLineList.map(function (val) {
      return offsetY + val;
    }), {
      lineWidth: 1,
      strokeStyle: '#999',
      isDashLine: true,
      axisXData: axisXData,
      lineMinValue: lineMinValue,
      lineMaxValue: lineMaxValue,
      scale: config.scale,
      axisYMax: axisYMax,
      axisYMin: axisYMin
    });
  };

  var drawEventTypes = function drawEventTypes(offsetX, offsetY) {
    var context = getContext();
    eventTypes.forEach(function (_ref2) {
      var label = _ref2.label,
          sort = _ref2.sort;

      if (sort === 0) {
        drawEventRectWidthText(context, offsetX - 100, offsetY - 40 * sort, 100, 400, label, {
          strokeStyle: '#fff',
          fillStyle: '#fff',
          textStyle: {
            fillStyle: '#999'
          }
        });
        return;
      }

      drawEventRectWidthText(context, offsetX - 100, offsetY - 40 * sort, 100, 40, label);
    });
  };

  var drawEvents = function drawEvents(offsetX, offsetY) {
    var context = getContext();
    var scale = config.scale,
        fieldNames = config.fieldNames;
    var eventStart = fieldNames.eventStart,
        eventEnd = fieldNames.eventEnd,
        eventSeriesField = fieldNames.eventSeriesField,
        eventTitleField = fieldNames.eventTitleField;
    events.forEach(function (item) {
      var _ref3 = eventTypes.find(function (_ref4) {
        var value = _ref4.value;
        return value === (item === null || item === void 0 ? void 0 : item[eventSeriesField]);
      }) || {
        sort: 1
      },
          sort = _ref3.sort;

      var rangeStartX = moment(item === null || item === void 0 ? void 0 : item[eventStart]).diff(moment(axisXStart), 'days');
      var count = moment(item === null || item === void 0 ? void 0 : item[eventEnd]).diff(moment(item === null || item === void 0 ? void 0 : item[eventStart]), 'days');
      var rectX = offsetX + rangeStartX * scale.space;
      var rectY = offsetY - 40 * sort;
      var rectW = count * scale.space;
      var rectH = 30;
      showTooltip(ETooltipStatus.EVENT, {
        x: rectX - 1,
        y: rectY - 1,
        w: rectW + 1,
        h: rectH + 1
      }, item);
      drawEventRectWidthText(context, rectX, // x
      rectY, // y
      rectW, // 宽
      rectH, // 高
      (item === null || item === void 0 ? void 0 : item[eventTitleField]) || '', {
        strokeStyle: '#fff',
        fillStyle: '#1890ff',
        lineWidth: 2
      });
    });
  };

  var drawLines = function drawLines(offsetX, offsetY) {
    var context = getContext();
    drawChartLines(context, axisXStart, offsetX, offsetY, lines, {
      scaleSpace: config.scale.space,
      axisYMax: axisYMax,
      axisYMin: axisYMin,
      dashLineSpace: dashLineSpace,
      dashLineCount: dashLineList.length,
      showTooltip: showTooltip
    });
  };

  var draw = function draw(startX, startY, moveX) {
    clearCanvas(); // 画事件

    drawEvents(startX - moveX, startY); // 画折线

    drawLines(startX - moveX, startY + 300); // 画X轴 Y轴 和 辅助线

    drawAxisAndLine(startX, startY, moveX);
  };

  useEffect(function () {
    draw(START_X, START_Y, mouseMoveX);
  }, [mouseMoveX, mouseXY]);
  console.log('axisXWidth', axisXWidth, mouseMoveX);
  return /*#__PURE__*/_jsxs("div", {
    className: styles.EventLine,
    children: [/*#__PURE__*/_jsx("canvas", {
      id: id,
      ref: canvasRef,
      width: "2440",
      height: "700"
    }), /*#__PURE__*/_jsx(Tooltip, {
      type: tooltipStatus,
      location: mouseXY,
      pointLocation: linePoint,
      title: (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.title) || (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.dt),
      label: "value",
      desc: (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.desc) || (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.value)
    })]
  });
});