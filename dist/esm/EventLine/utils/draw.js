function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import moment from "moment"; // 绘制水平线

export var drawHorizontalLine = function drawHorizontalLine(ctx) {
  var offsetX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var offsetYs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var axisXData = config.axisXData,
      _config$lineWidth = config.lineWidth,
      lineWidth = _config$lineWidth === void 0 ? 1 : _config$lineWidth,
      _config$strokeStyle = config.strokeStyle,
      strokeStyle = _config$strokeStyle === void 0 ? '#999' : _config$strokeStyle,
      _config$fillStyle = config.fillStyle,
      fillStyle = _config$fillStyle === void 0 ? '#999' : _config$fillStyle,
      _config$isDashLine = config.isDashLine,
      isDashLine = _config$isDashLine === void 0 ? false : _config$isDashLine,
      _config$isAxis = config.isAxis,
      isAxis = _config$isAxis === void 0 ? false : _config$isAxis,
      _config$lineDash = config.lineDash,
      lineDash = _config$lineDash === void 0 ? [5, 5] : _config$lineDash,
      _config$lineDashOffse = config.lineDashOffset,
      lineDashOffset = _config$lineDashOffse === void 0 ? 0 : _config$lineDashOffse,
      scale = config.scale,
      axisYMax = config.axisYMax,
      axisYMin = config.axisYMin;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = '#999';
  strokeStyle;
  ctx.fillStyle = '#999';
  fillStyle; //TOOD 折线辅助性值

  var every = (axisYMax - axisYMin) / (offsetYs.length - 1);
  offsetYs.forEach(function (offsetY, i) {
    ctx.beginPath();
    ctx.lineDashOffset = 0;

    if (isDashLine) {
      ctx.setLineDash(lineDash);
      ctx.lineDashOffset = lineDashOffset;
    }

    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + (axisXData.length - 1) * scale.space, offsetY); // ctx.closePath();

    ctx.stroke(); //坐标轴

    if (!isAxis) {
      ctx.fillText(axisYMin + every * i, offsetX - 36, offsetY, 90);
    }

    ctx.setLineDash([]);
  });
  ctx.lineDashOffset = 0;
};
/**
 *
 * @param text 日期文本
 * @param index 日期所在数组下标
 * @returns 日期刻度高度、日期刻度颜色、是否展示日期文本，日期文本颜色，日期文本字体(含文字大小)
 */

var judgeDayScaleStyle = function judgeDayScaleStyle(text, _ref) {
  var textSize = _ref.textSize,
      textSpace = _ref.textSpace,
      firstHeight = _ref.firstHeight,
      firstColor = _ref.firstColor,
      secondHeight = _ref.secondHeight,
      secondColor = _ref.secondColor,
      thirdHeight = _ref.thirdHeight,
      thirdColor = _ref.thirdColor;
  var style = {
    height: thirdHeight,
    color: thirdColor,
    text: '',
    textHalfWidth: 0
  };

  if (text.endsWith('0101')) {
    style.height = firstHeight;
    style.color = firstColor;
    style.text = moment(text).format('YYYY');
    style.textHalfWidth = textSize * 4 / 2;
  } else if (text.endsWith('01')) {
    style.height = secondHeight;
    style.color = secondColor;
    style.text = moment(text).format('YYYY-MM');
    style.textHalfWidth = textSize * 7 / 2;
  } else {
    var dayNum = parseInt(text.substring(text.length - 2));

    if (dayNum > 5 && dayNum < 26 && dayNum % textSpace === 0) {
      style.color = secondColor;
      style.text = moment(text).format('MM-DD');
      style.textHalfWidth = textSize * 5 / 2;
    }
  }

  return _objectSpread({}, style);
};

// 绘制x轴刻度
export var drawAxisScale = function drawAxisScale(ctx) {
  var offsetX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var offsetY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var _ref2 = arguments.length > 3 ? arguments[3] : undefined,
      axisXData = _ref2.axisXData,
      scale = _ref2.scale;

  axisXData.forEach(function (item, i) {
    var _judgeDayScaleStyle = judgeDayScaleStyle(item, scale),
        height = _judgeDayScaleStyle.height,
        color = _judgeDayScaleStyle.color,
        text = _judgeDayScaleStyle.text,
        textHalfWidth = _judgeDayScaleStyle.textHalfWidth;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.font = '10px microsoft yahe';
    ctx.textBaseline = 'middle';
    ctx.beginPath();
    ctx.moveTo(offsetX + i * scale.space, offsetY);
    ctx.lineTo(offsetX + i * scale.space, offsetY - height); // ctx.closePath();

    ctx.stroke(); // 刻度线

    if (text) {
      ctx.fillText(text, offsetX + i * scale.space - textHalfWidth, offsetY + 12); // 刻度文本
    }
  });
};

var createTextInSchedule = function createTextInSchedule(ctx, x, y, maxWidth, text, style) {
  var _ref3 = style || {},
      _ref3$font = _ref3.font,
      font = _ref3$font === void 0 ? '16px microsoft yahe' : _ref3$font,
      _ref3$fillStyle = _ref3.fillStyle,
      fillStyle = _ref3$fillStyle === void 0 ? '#fff' : _ref3$fillStyle,
      _ref3$textBaseline = _ref3.textBaseline,
      textBaseline = _ref3$textBaseline === void 0 ? 'middle' : _ref3$textBaseline;

  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textBaseline = textBaseline; // ctx.measureText(text).width

  ctx.fillText(text, x, y, maxWidth);
};

export var drawEventRectWidthText = function drawEventRectWidthText(ctx, x, y, w, h, text, style) {
  // TODO监听鼠标hover事件
  var _ref4 = style || {},
      _ref4$strokeStyle = _ref4.strokeStyle,
      strokeStyle = _ref4$strokeStyle === void 0 ? '#fff' : _ref4$strokeStyle,
      _ref4$fillStyle = _ref4.fillStyle,
      fillStyle = _ref4$fillStyle === void 0 ? '#1890ff' : _ref4$fillStyle,
      _ref4$lineWidth = _ref4.lineWidth,
      lineWidth = _ref4$lineWidth === void 0 ? 2 : _ref4$lineWidth,
      _ref4$textStyle = _ref4.textStyle,
      textStyle = _ref4$textStyle === void 0 ? {} : _ref4$textStyle;

  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = fillStyle;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, w, h);
  ctx.fillRect(x, y, w, h);

  if (text) {
    createTextInSchedule(ctx, x + 8, y + h / 2, w, text || '', textStyle);
  }
};
export var drawChartLines = function drawChartLines(ctx, axisXStart, zeroX, zeroY, list, config) {
  var _ref5 = config || {},
      _ref5$strokeStyle = _ref5.strokeStyle,
      strokeStyle = _ref5$strokeStyle === void 0 ? '#1890ff' : _ref5$strokeStyle,
      _ref5$lineWidth = _ref5.lineWidth,
      lineWidth = _ref5$lineWidth === void 0 ? 2 : _ref5$lineWidth,
      scaleSpace = _ref5.scaleSpace,
      axisYMin = _ref5.axisYMin,
      axisYMax = _ref5.axisYMax,
      _ref5$dashLineSpace = _ref5.dashLineSpace,
      dashLineSpace = _ref5$dashLineSpace === void 0 ? 50 : _ref5$dashLineSpace,
      _ref5$dashLineCount = _ref5.dashLineCount,
      dashLineCount = _ref5$dashLineCount === void 0 ? 5 : _ref5$dashLineCount,
      showTooltip = _ref5.showTooltip;

  var every = (axisYMax - axisYMin) / (dashLineCount - 1);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  list.forEach(function (item) {
    var len = moment(item.dt).diff(axisXStart, 'days');
    var pointX = zeroX + len * scaleSpace;
    var pointY = zeroY - (item.value - (axisYMin - every)) / every * dashLineSpace;
    ctx.lineTo(pointX, pointY); // ctx.arc(pointX, pointY, 2, 0, 2*Math.PI)

    showTooltip('line', {
      x: pointX - 2,
      y: zeroY - 300,
      w: 4,
      h: 300,
      pointX: pointX,
      pointY: pointY
    }, item);
  });
  ctx.stroke();
};