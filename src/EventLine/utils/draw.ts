import moment from 'moment';

export const roundRectPath = (
  ctx: any,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number = 0,
) => {
  ctx.beginPath();
  ctx.arc(x + r, y + r, r, Math.PI, (3 * Math.PI) / 2);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w - r, y + r, r, (3 * Math.PI) / 2, 2 * Math.PI);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
  ctx.closePath();
};

// 绘制水平线
export const drawHorizontalLine = (
  ctx: any,
  offsetX = 0,
  offsetYs: number[] = [],
  config: any = {},
) => {
  const {
    axisXData,
    // lineMinValue,
    // lineMaxValue,
    lineWidth = 1,
    strokeStyle = '#999',
    fillStyle = '#999',
    isDashLine = false,
    isAxis = false,
    lineDash = [5, 5],
    lineDashOffset = 0,
    scale,
    axisYMax,
    axisYMin,
  } = config;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = fillStyle;
  //TOOD 折线辅助性值
  const every = (axisYMax - axisYMin) / (offsetYs.length - 1);
  offsetYs.forEach((offsetY, i) => {
    ctx.beginPath();
    ctx.lineDashOffset = 0;
    if (isDashLine) {
      ctx.setLineDash(lineDash);
      ctx.lineDashOffset = lineDashOffset;
    }
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + (axisXData.length - 1) * scale.space, offsetY);
    // ctx.closePath();
    ctx.stroke(); //坐标轴
    if (!isAxis) {
      ctx.fillText(axisYMin + every * i, offsetX - 36, offsetY, 90);
    }
    ctx.setLineDash([]);
  });
  ctx.lineDashOffset = 0;
};

export const drawYAxisValue = (
  ctx: any,
  offsetX: number,
  list: number[],
  { min, max, fontSize = 12, formatter, fillStyle = '#999', maxWidth = 90 }: any,
) => {
  ctx.fillStyle = fillStyle;
  ctx.font = `${fontSize}px Airal`;
  const every = (max - min) / (list.length - 1);
  list.forEach((y, i) => {
    const text = formatter(min + every * i);
    console.log('xxx', min, every * i, text);
    ctx.fillText(text, offsetX - (text + '').length * fontSize, y, maxWidth);
  });
};

/**
 *
 * @param text 日期文本
 * @param index 日期所在数组下标
 * @returns 日期刻度高度、日期刻度颜色、是否展示日期文本，日期文本颜色，日期文本字体(含文字大小)
 */
const judgeDayScaleStyle = (
  text: string,
  {
    textSize,
    textSpace,
    firstHeight,
    firstColor,
    secondHeight,
    secondColor,
    thirdHeight,
    thirdColor,
  }: any,
) => {
  const style = {
    height: thirdHeight,
    color: thirdColor,
    text: '',
    textHalfWidth: 0,
  };
  if (text.endsWith('0101')) {
    style.height = firstHeight;
    style.color = firstColor;
    style.text = moment(text).format('YYYY');
    style.textHalfWidth = (textSize * 4) / 2;
  } else if (text.endsWith('01')) {
    style.height = secondHeight;
    style.color = secondColor;
    style.text = moment(text).format('YYYY-MM');
    style.textHalfWidth = (textSize * 7) / 2;
  } else {
    const dayNum = parseInt(text.substring(text.length - 2));
    if (dayNum > 5 && dayNum < 26 && dayNum % textSpace === 0) {
      style.color = secondColor;
      style.text = moment(text).format('MM-DD');
      style.textHalfWidth = (textSize * 5) / 2;
    }
  }

  return { ...style };
};

interface IScaleConfig {
  axisXData: any;
  scale: Record<string, any>;
}
// 绘制x轴刻度
export const drawAxisScale = (
  ctx: any,
  offsetX = 0,
  offsetY = 0,
  { axisXData, scale }: IScaleConfig,
) => {
  axisXData.forEach((item: any, i: number) => {
    const { height, color, text, textHalfWidth } = judgeDayScaleStyle(item, scale);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.font = '10px microsoft yahe';
    ctx.textBaseline = 'middle';
    ctx.beginPath();
    ctx.moveTo(offsetX + i * scale.space, offsetY);
    ctx.lineTo(offsetX + i * scale.space, offsetY - height);
    // ctx.closePath();
    ctx.stroke(); // 刻度线
    if (text) {
      ctx.fillText(text, offsetX + i * scale.space - textHalfWidth, offsetY + 12); // 刻度文本
    }
  });
};

const createTextInSchedule = (
  ctx: any,
  x: number,
  y: number,
  maxWidth: number,
  text: string,
  style?: Record<string, any>,
) => {
  const { font = '16px microsoft yahe', fillStyle = '#fff', textBaseline = 'middle' } = style || {};
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textBaseline = textBaseline;
  // ctx.measureText(text).width
  ctx.fillText(text, x, y, maxWidth);
};

export const drawEventRectWidthText = (
  ctx: any,
  x: number,
  y: number,
  w: number,
  h: number,
  text: string,
  style?: Record<string, any>,
) => {
  // TODO监听鼠标hover事件
  const {
    strokeStyle = '#fff',
    fillStyle = '#1890ff',
    radius = 4,
    lineWidth = 2,
    textStyle = {},
  } = style || {};
  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = fillStyle;
  ctx.lineWidth = lineWidth;
  // 圆角
  roundRectPath(ctx, x, y, w, h, radius);
  // ctx.strokeRect(x, y, w, h);
  // ctx.fillRect(x, y, w, h);]
  ctx.stroke();
  ctx.fill();
  if (text) {
    createTextInSchedule(ctx, x + 8, y + h / 2, w, text || '', { ...textStyle });
  }
};

export const drawChartLines = (
  ctx: any,
  axisXStart: string,
  zeroX: number,
  zeroY: number,
  list: any,
  config?: any,
) => {
  const {
    strokeStyle = '#1890ff',
    lineWidth = 2,
    scaleSpace,
    axisYMin,
    axisYMax,
    dashLineSpace = 50,
    dashLineCount = 5,
    showTooltip,
  } = config || {};
  const every = (axisYMax - axisYMin) / (dashLineCount - 1);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  list.forEach((item: any) => {
    const len = moment(item.dt).diff(axisXStart, 'days');
    const pointX = zeroX + len * scaleSpace;
    const pointY = zeroY - ((item.value - axisYMin) / every) * dashLineSpace;
    ctx.lineTo(pointX, pointY);
    // ctx.arc(pointX, pointY, 2, 0, 2*Math.PI)
    showTooltip('line', { x: pointX - 2, y: zeroY - 300, w: 4, h: 300, pointX, pointY }, item);
  });
  ctx.stroke();
};

export const drawActiveEventGuides = (
  ctx: any,
  x: number,
  y: number,
  w: number,
  axisY: number,
  style: Record<string, any> = {},
) => {
  const { strokeStyle = 'red', rectRadius = 2 } = style || {};
  ctx.strokeStyle = strokeStyle;
  // ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, axisY);
  if (w !== 0) {
    ctx.moveTo(x + w, y);
    ctx.lineTo(x + w, axisY);
  }
  ctx.stroke();
};
