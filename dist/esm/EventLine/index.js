function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

// import MultiEventLine from './components/MultiEventLine';
// export default MultiEventLine;
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import useMouseMove from './hooks/useMouseMove';
import { ETooltipStatus } from './type';
import { analysisEventLineData, getLineDashYList } from './utils/data';
import defaultConfig from './defaultConfig';
import {
  drawAxisScale,
  drawChartLines,
  drawEventRectWidthText,
  drawHorizontalLine,
} from './utils/draw';
import styles from './index.less';
import Tooltip from './components/Tooltip';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
var moment = extendMoment(Moment);
var eventType0 = {
  value: 'zero',
  label: '趋势图',
  sort: 0,
  primaryColor: '#fff',
  secondaryColor: '#fff',
};
export default /*#__PURE__*/ React.memo(function (_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? 'event-line' : _ref$id,
    events = _ref.events,
    eTypes = _ref.eventTypes,
    lines = _ref.lines,
    customConfig = _ref.config;
  var eventTypes = [eventType0].concat(_toConsumableArray(eTypes));

  var config = _objectSpread(
    _objectSpread(_objectSpread({}, defaultConfig), customConfig),
    {},
    {
      axis: _objectSpread(
        _objectSpread(
          {},
          defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.axis,
        ),
        customConfig === null || customConfig === void 0 ? void 0 : customConfig.axis,
      ),
      scale: _objectSpread(
        _objectSpread(
          {},
          defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.scale,
        ),
        customConfig === null || customConfig === void 0 ? void 0 : customConfig.scale,
      ),
      fieldNames: _objectSpread(
        _objectSpread(
          {},
          defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.fieldNames,
        ),
        customConfig === null || customConfig === void 0 ? void 0 : customConfig.fieldNames,
      ),
      eventTypeStyle: _objectSpread(
        _objectSpread(
          {},
          defaultConfig === null || defaultConfig === void 0
            ? void 0
            : defaultConfig.eventTypeStyle,
        ),
        customConfig === null || customConfig === void 0 ? void 0 : customConfig.eventTypeStyle,
      ),
      eventStyle: _objectSpread(
        _objectSpread(
          {},
          defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.eventStyle,
        ),
        customConfig === null || customConfig === void 0 ? void 0 : customConfig.eventStyle,
      ),
      lineStyle: _objectSpread(
        _objectSpread(
          {},
          defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.lineStyle,
        ),
        customConfig === null || customConfig === void 0 ? void 0 : customConfig.lineStyle,
      ),
    },
  );

  var _ref2 = (config === null || config === void 0 ? void 0 : config.padding) || {},
    _ref3 = _slicedToArray(_ref2, 4),
    _ref3$ = _ref3[0],
    paddingTop = _ref3$ === void 0 ? 0 : _ref3$,
    paddingRight = _ref3[1],
    paddingLeft = _ref3[2],
    _ref3$2 = _ref3[3],
    paddingBottom = _ref3$2 === void 0 ? 25 : _ref3$2;

  var _ref4 = (config === null || config === void 0 ? void 0 : config.eventTypeStyle) || {},
    eventTypeWidth = _ref4.width,
    eventTypeHeight = _ref4.height;

  var _ref5 = (config === null || config === void 0 ? void 0 : config.axis) || {},
    axisXHeight = _ref5.height;

  var _ref6 = (config === null || config === void 0 ? void 0 : config.eventStyle) || {},
    eventHeight = _ref6.height,
    eventMinWidth = _ref6.minWidth;

  var _ref7 = (config === null || config === void 0 ? void 0 : config.lineStyle) || {},
    _ref7$yScaleSpace = _ref7.yScaleSpace,
    scaleLineSpace = _ref7$yScaleSpace === void 0 ? 50 : _ref7$yScaleSpace,
    _ref7$yScaleCount = _ref7.yScaleCount,
    scaleLineCount = _ref7$yScaleCount === void 0 ? 6 : _ref7$yScaleCount; //事件高度计算；

  var eventsHeight = eventTypeHeight * eTypes.length;
  var lineHeight = scaleLineSpace * scaleLineCount;
  var dashLineList = getLineDashYList(scaleLineCount, scaleLineSpace) || [250, 200, 150, 100, 50];
  var canvasRef = useRef(null);
  var getContext = useCallback(
    function () {
      return canvasRef.current.getContext('2d');
    },
    [canvasRef.current],
  );

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

  var axisXData = Array.from(moment.range(moment(axisXStart), moment(axisXEnd)).by('days')).map(
    function (item) {
      return item.format('YYYYMMDD');
    },
  );

  var _useMouseMove = useMouseMove('#'.concat(id), -100, axisXWidth - 200),
    mouseMoveX = _useMouseMove.mouseMoveX,
    mouseXY = _useMouseMove.mouseXY;

  var showTooltip = function showTooltip(type, area, data) {
    if (
      mouseXY &&
      mouseXY.x >= area.x &&
      mouseXY.x <= area.x + (area.w || 2) &&
      mouseXY.y >= area.y &&
      mouseXY.y <= area.y + (area.h || 2)
    ) {
      if (type === ETooltipStatus.LINE) {
        setLinePoint({
          x: area === null || area === void 0 ? void 0 : area.pointX,
          y: area === null || area === void 0 ? void 0 : area.pointY,
        });
      }

      setTooltipStatus(type);
      setTooltipData(data);
    } else if (
      tooltipStatus === type &&
      (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.id) === data.id
    ) {
      setTooltipStatus(ETooltipStatus.NOTHING);
      setTooltipData(undefined);
    }
  };

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
      scale: config.scale,
    });
    drawAxisScale(context, offsetX - moveX, offsetY, {
      axisXData: axisXData,
      scale: config.scale,
    }); // 绘制刻度
  };

  var drawAxisAndLine = function drawAxisAndLine(offsetX, offsetY, moveX) {
    var context = getContext();
    drawXAxis(offsetX, offsetY + axisXHeight, moveX); // + 间距

    drawXAxis(offsetX, offsetY + lineHeight + axisXHeight, moveX); // + 间距
    // 画事件类型 不加间距

    drawEventTypes(offsetX, offsetY); // 画辅助线 + 间距

    drawHorizontalLine(
      context,
      offsetX,
      dashLineList.map(function (val) {
        return offsetY + axisXHeight + val;
      }),
      {
        lineWidth: 1,
        strokeStyle: '#999',
        isDashLine: true,
        axisXData: axisXData,
        lineMinValue: lineMinValue,
        lineMaxValue: lineMaxValue,
        scale: config.scale,
        axisYMax: axisYMax,
        axisYMin: axisYMin,
      },
    );
  };

  var drawEventTypes = function drawEventTypes(offsetX, offsetY) {
    var context = getContext();
    var eventTypeStyle = config.eventTypeStyle;
    eventTypes.forEach(function (_ref8) {
      var label = _ref8.label,
        sort = _ref8.sort,
        primaryColor = _ref8.primaryColor,
        secondaryColor = _ref8.secondaryColor;

      if (sort === 0) {
        drawEventRectWidthText(
          context,
          offsetX - eventTypeWidth,
          offsetY - eventTypeHeight * sort,
          eventTypeWidth,
          axisXHeight + lineHeight + paddingBottom, // 0趋势图背景覆盖折线图左侧区域
          label,
          {
            strokeStyle: primaryColor,
            fillStyle: secondaryColor,
            textStyle: {
              fillStyle: '#999',
            },
          },
        );
        return;
      }

      drawEventRectWidthText(
        context,
        offsetX - eventTypeWidth,
        offsetY - eventTypeHeight * (eventTypes.length - sort),
        eventTypeWidth,
        eventTypeHeight,
        label,
        {
          strokeStyle: primaryColor,
          fillStyle: secondaryColor,
          textStyle: _objectSpread(
            {
              fillStyle: primaryColor,
            },
            eventTypeStyle,
          ),
        },
      );
    });
  };

  var drawEvents = function drawEvents(offsetX, offsetY) {
    var context = getContext();
    var scale = config.scale,
      fieldNames = config.fieldNames,
      eventStyle = config.eventStyle;
    var eventStart = fieldNames.eventStart,
      eventEnd = fieldNames.eventEnd,
      eventSeriesField = fieldNames.eventSeriesField,
      eventTitleField = fieldNames.eventTitleField;
    events.forEach(function (item) {
      var _ref9 = eventTypes.find(function (_ref10) {
          var value = _ref10.value;
          return value === (item === null || item === void 0 ? void 0 : item[eventSeriesField]);
        }) || {
          sort: 1,
        },
        sort = _ref9.sort,
        primaryColor = _ref9.primaryColor,
        secondaryColor = _ref9.secondaryColor;

      var rangeStartX = moment(item === null || item === void 0 ? void 0 : item[eventStart]).diff(
        moment(axisXStart),
        'days',
      );
      var count = moment(item === null || item === void 0 ? void 0 : item[eventEnd]).diff(
        moment(item === null || item === void 0 ? void 0 : item[eventStart]),
        'days',
      );
      var rectX = offsetX + rangeStartX * scale.space;
      var rectY = offsetY - eventTypeHeight * (eventTypes.length - sort); // 使用事件类型高度

      var rectW = count * scale.space;
      var rectH = 30;
      showTooltip(
        ETooltipStatus.EVENT,
        {
          x: rectX - 1,
          y: rectY - 1,
          w: rectW + 1,
          h: rectH + 1,
        }, // +1 -1为了方便感应
        item,
      );
      drawEventRectWidthText(
        context,
        rectX, // x
        rectY, // y
        rectW, // 宽
        rectH, // 高
        (item === null || item === void 0 ? void 0 : item[eventTitleField]) || '',
        {
          strokeStyle: primaryColor,
          fillStyle: secondaryColor,
          lineWidth: 2,
          textStyle: _objectSpread(
            {
              fillStyle: primaryColor,
            },
            eventStyle.textStyle,
          ),
        },
      );
    });
  };

  var drawLines = function drawLines(offsetX, offsetY) {
    var context = getContext();
    drawChartLines(context, axisXStart, offsetX, offsetY, lines, {
      scaleSpace: config.scale.space,
      axisYMax: axisYMax,
      axisYMin: axisYMin,
      scaleLineSpace: scaleLineSpace,
      dashLineCount: dashLineList.length,
      showTooltip: showTooltip,
    });
  };

  var draw = function draw(startX, startY, moveX) {
    clearCanvas(); // 画事件 不考虑事件和折线之间的间距

    drawEvents(startX - moveX, startY + (eventTypeHeight - eventHeight) / 2); // 画折线 + 事件和折线之间的间距

    drawLines(startX - moveX, startY + lineHeight + axisXHeight); // 画X轴 Y轴 和 辅助线

    drawAxisAndLine(startX, startY, moveX);
  };

  useEffect(
    function () {
      draw(eventTypeWidth, eventsHeight + paddingTop, mouseMoveX);
    },
    [mouseMoveX, mouseXY],
  );
  console.log('axisXWidth', axisXWidth, mouseMoveX);
  var canvasHeight = eventsHeight + lineHeight + axisXHeight + paddingTop + paddingBottom;
  return /*#__PURE__*/ _jsxs('div', {
    className: styles.EventLine,
    children: [
      /*#__PURE__*/ _jsx('canvas', {
        id: id,
        ref: canvasRef,
        width: '950',
        height: canvasHeight,
      }),
      /*#__PURE__*/ _jsx(Tooltip, {
        type: tooltipStatus,
        location: mouseXY,
        pointLocation: linePoint,
        title:
          (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.title) ||
          (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.dt),
        label: 'value',
        desc:
          (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.desc) ||
          (tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.value),
        guideLineStyle: {
          top: eventsHeight + axisXHeight,
          height: lineHeight,
        },
      }),
    ],
  });
});
