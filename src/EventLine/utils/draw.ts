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

export const drawYAxisText = (ctx: any, offsetX = 0, offsetYs: number[] = [], config: any = {}) => {
  const { axisYMin, axisYMax, font, formatter, width, space = 4, fillStyle = '#999' } = config;
  const every = (axisYMax - axisYMin) / (offsetYs.length - 1);
  offsetYs.forEach((offsetY, i) => {
    const text = formatter(axisYMin + every * i);
    const textWidth = ctx.measureText(text).width;
    ctx.fillStyle = fillStyle;
    ctx.font = font;
    ctx.fillText(text, offsetX - (width - space || textWidth + space), offsetY, 120); // (len > 2 ? len * 12 - 8 : 26)
  });
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
    lineWidth = 1,
    strokeStyle = '#999',
    isDashLine = false,
    dash = [5, 5],
    offset = 0,
    scaleSpace,
  } = config;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;

  offsetYs.forEach((offsetY, i) => {
    ctx.beginPath();
    ctx.lineDashOffset = 0;
    if (isDashLine && i !== 0) {
      ctx.setLineDash(dash);
      ctx.lineDashOffset = offset;
    }
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + (axisXData.length - 1) * scaleSpace, offsetY);
    ctx.stroke();
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
  fillStyle: string;
  font: string;
  unit: string;
}
// 绘制x轴刻度
export const drawAxisScale = (
  ctx: any,
  offsetX = 0,
  offsetY = 0,
  { axisXData, scale, fillStyle, font, unit }: IScaleConfig,
) => {
  axisXData.forEach((item: any, i: number) => {
    const { height, color, text, textHalfWidth } = judgeDayScaleStyle(item, scale);
    ctx.strokeStyle = color;
    (ctx.lineWidth = scale.lineWidth), ctx.beginPath();
    ctx.moveTo(offsetX + i * scale.space, offsetY);
    ctx.lineTo(offsetX + i * scale.space, offsetY - height);
    // ctx.closePath();
    ctx.stroke(); // 刻度线
    if (text) {
      ctx.font = font;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = fillStyle;
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
  const {
    font = '16px PingFang SC',
    fillStyle = '#fff',
    textBaseline = 'middle',
    direction,
    paddingLeft = 8,
    paddingRight = 8,
  } = style || {};
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textBaseline = textBaseline;
  if (direction === 'vertical') {
    fillTextVertical(ctx, x + paddingLeft, y, text, { font, space: 6 });
  } else {
    const limitText = limitTextWidth(ctx, text, maxWidth - paddingLeft - paddingRight);
    ctx.fillText(limitText, x + paddingLeft, y, maxWidth);
  }
};

/**
 * 文本超出最大宽度限制...
 * @param ctx
 * @param text
 * @param limit
 * @param ellipsis
 * @returns
 */
export const limitTextWidth = (ctx: any, text: string, limit: number, ellipsis = '...') => {
  const textWidth = ctx.measureText(text).width;
  if (textWidth < limit) {
    return text;
  }
  const ellipsisWidth = ctx.measureText(ellipsis).width;
  const limitWidth = limit - ellipsisWidth;
  return (
    [...text].reduce((result = '', item: string) => {
      const currentWidth = ctx.measureText(result + item).width;
      if (currentWidth < limitWidth) {
        return result + item;
      }
      return result;
    }, '') + ellipsis
  );
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
    createTextInSchedule(ctx, x, y + h / 2, w, text || '', { ...textStyle });
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
    scaleSpace,
    axisYMin,
    axisYMax,
    dashLineSpace = 50,
    dashLineCount = 5,
    showTooltip,
    dtKey = 'dt',
    valueKey = 'value',
    lineStyle,
  } = config || {};
  const every = (axisYMax - axisYMin) / (dashLineCount - 1);
  const { dash = [], offset = 0, lineWidth = 2 } = lineStyle || {};
  ctx.setLineDash(dash);
  ctx.lineDashOffset = offset;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  list
    .sort((a: any, b: any) => a?.[dtKey] - b?.[dtKey])
    .forEach((item: any) => {
      const len = moment(item?.[dtKey]).diff(axisXStart, 'days');
      const pointX = zeroX + len * scaleSpace;
      const pointY = zeroY - ((item?.[valueKey] - axisYMin) / every) * dashLineSpace;
      ctx.lineTo(pointX, pointY);
      // ctx.arc(pointX, pointY, 2, 0, 2*Math.PI)
      showTooltip('line', { x: pointX - 3, y: zeroY - 300, w: 6, h: 300, pointX, pointY }, item);
    });
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineDashOffset = 0;
};

export const drawActiveEventGuides = (
  ctx: any,
  x: number,
  y: number,
  w: number,
  axisY: number,
  style: Record<string, any> = {},
) => {
  const { strokeStyle = '#eee', rectRadius = 2 } = style || {};
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, axisY);
  if (w !== 0) {
    ctx.moveTo(x + w, y);
    ctx.lineTo(x + w, axisY);
  }
  ctx.stroke();
};

export const fillTextVertical = (
  ctx: any,
  offsetX: number,
  offsetY: number,
  text: string,
  { font = '14 PingFang SC', space = 2 },
) => {
  [...text].forEach((t, i) => {
    ctx.fillText(t, offsetX, offsetY + i * (parseInt(font) + space));
  });
};

export const drawLegend = (
  ctx: any,
  offsetX: number,
  offsetY: number,
  { legend, font, lineColor = [], types = [] }: any,
) => {
  let prevLength = 0;
  // const [left, right] = lineColor;
  const legendLabel = types?.length > 0 ? types : legend.label || [];
  legendLabel.reverse().forEach((label: string, i: number) => {
    const width = ctx.measureText(label).width + legend.labelSpace;
    const offX = offsetX - prevLength - width;
    ctx.fillStyle = lineColor[legendLabel.length - 1 - i];
    ctx.fillRect(
      offX - legend.height - legend.labelRectSpace,
      offsetY + legend.marginTop,
      legend.height,
      legend.height,
    );
    ctx.fillStyle = legend.color;
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.fillText(label, offX, offsetY + legend.marginTop);
    prevLength = prevLength + width + legend.height + legend.labelRectSpace;
  });
};
