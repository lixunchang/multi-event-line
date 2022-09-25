import React, { useCallback, useEffect, useRef, useState } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import useMouseMove from './hooks/useMouseMove';
import { EMouseStatus, ETooltipStatus, IConfig, IEventItem, ILineItem } from './type';
import { analysisEventLineData, getLineDashYList } from './utils/data';
import defaultConfig, { combineConfig } from './defaultConfig';
import {
  drawActiveEventGuides,
  drawAxisScale,
  drawChartLines,
  drawEventRectWidthText,
  drawHorizontalLine,
  drawLegend,
  drawYAxisText,
  visibilityDraw,
} from './utils/draw';
import Tooltip from './components/Tooltip';
import './index.css';

let linePointList: any = [];
let canvasWidth = 960;

const moment = extendMoment(Moment as any);

interface IProps {
  id?: string;
  events: IEventItem[];
  eventTypes?: any;
  lines?: ILineItem[][];
  [_: string]: any;
}

interface IArea {
  x: number;
  y: number;
  w?: number;
  h?: number;
  pointX?: number;
  pointY?: number;
}

const eventType0 = {
  value: 'zero',
  label: '趋势图',
  sort: 0,
  primaryColor: '#fff',
  secondaryColor: '#fff',
};

export default React.memo(
  ({
    id = 'event-line',
    events,
    eventTypes: eTypes,
    lines = [],
    customTooltip,
    config: customConfig,
  }: IProps) => {
    const withLine = lines?.length > 0; // 是否展示折线
    const { padding, font, axisX, event, line }: IConfig = combineConfig(
      defaultConfig,
      customConfig,
    ); //若要完全融合需要递归，或枚举

    const eventTypes = [{ ...eventType0, ...line.title }, ...eTypes];
    const [paddingTop = 0, paddingRight, paddingBottom = 25, paddingLeft] = padding || [];
    const { width: eventTypeWidth, height: eventTypeHeight } = event.type || {};
    const { height: axisXheight } = axisX || {}; // 公共部分
    const { height: eventHeight } = event || {};
    const { space: dashLineSpace = 50, count: dashLineCount = 5 } = line.dashLine || {};
    //事件高度计算；
    const eventsHeight = eventTypeHeight * eTypes.length;
    const lineHeight = withLine ? dashLineSpace * (dashLineCount + 1) : 0; // 加上X轴
    const dashLineList = getLineDashYList(dashLineCount + 1, dashLineSpace) || [
      300, 250, 200, 150, 100, 50,
    ];

    const canvasRef = useRef<any>(null);
    const getContext = useCallback(() => {
      return canvasRef.current?.getContext('2d');
    }, [canvasRef.current]);
    const [tooltipStatus, setTooltipStatus] = useState(ETooltipStatus.NOTHING);
    const [tooltipData, setTooltipData] = useState<any>();
    const [linePoint, setLinePoint] = useState<any>([]);
    const [activeEventId, setActiveEventId] = useState();

    const {
      axisXStart,
      axisXEnd,
      axisYMax,
      axisYMin,
      axisY2Max,
      axisY2Min,
      axisXWidth,
      leftLineTypes,
      rightLineTypes,
    } = analysisEventLineData(events, lines, { axisX, event, line });
    const axisXData = Array.from(
      moment.range(moment(axisXStart), moment(axisXEnd)).by(axisX.unit),
    ).map((item) => item.format('YYYYMMDD'));
    const { mouseMoveX, mouseXY, mouseStatus } = useMouseMove(
      `#${id}`,
      0 - axisX.emptyLeft - paddingLeft,
      axisXWidth - axisX.emptyRight - paddingRight,
    );
    const canvasHeight =
      paddingTop +
      eventsHeight +
      axisXheight +
      axisX.scale.textHeight +
      paddingBottom +
      (withLine
        ? lineHeight +
          axisXheight +
          axisX.scale.textHeight +
          line.legend.height +
          line.legend.marginTop +
          line.legend.marginBottom
        : 0);

    const showTooltip = (
      type: ETooltipStatus,
      area: IArea,
      data: any,
      {
        dataType = '', // 左侧或右侧
        color = '#1890ff', // 颜色
        label = '',
        yField = '',
        key = '',
      }: any = {},
    ) => {
      if (
        mouseStatus === EMouseStatus.SCROLL_X ||
        mouseStatus === EMouseStatus.MOVE ||
        mouseStatus === EMouseStatus.DRAG ||
        (mouseXY && mouseXY.x < paddingLeft + eventTypeWidth) ||
        (mouseXY && mouseXY.x > canvasWidth - paddingRight) ||
        (mouseXY &&
          type === ETooltipStatus.LINE &&
          mouseXY.y > eventsHeight + axisXheight &&
          mouseXY.x > canvasWidth - paddingRight - line.axis.y.right.width)
      ) {
        linePointList = [];
        setLinePoint([]);
        setTooltipStatus(ETooltipStatus.NOTHING);
        setTooltipData(undefined);
        return false;
      }
      if (
        mouseXY &&
        mouseXY.x >= area.x &&
        mouseXY.x <= area.x + (area.w || 2) &&
        mouseXY.y >= area.y &&
        mouseXY.y <= area.y + (area.h || 2)
      ) {
        if (type === ETooltipStatus.LINE && !linePointList.find((ite: any) => ite?.key === key)) {
          linePointList.push({
            x: area?.pointX,
            y: area?.pointY,
            color,
            key,
            data,
            dataType,
            label,
            yField,
          });
          setLinePoint(linePointList); //TOOD 重置操作
        }
        if (mouseStatus === EMouseStatus.HOVER) {
          setTooltipStatus(type);
          setTooltipData(data);
        }
        return true;
      } else if (
        tooltipStatus === type &&
        ((type === ETooltipStatus.LINE && tooltipData?.[line?.xField] === data?.[line?.xField]) ||
          (type === ETooltipStatus.EVENT &&
            tooltipData?.[event.fieldNames.key] === data?.[event.fieldNames.key]))
      ) {
        linePointList = [];
        setLinePoint([]);
        setTooltipStatus(ETooltipStatus.NOTHING);
        setTooltipData(undefined);
      }
      return false;
    };

    const clearCanvas = () => {
      const context = getContext();
      context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const drawXAxis = (
      offsetX: number,
      offsetY: number,
      moveX: number,
      scale: any,
      { strokeStyle = '#999', fillStyle = '#666', font = '' },
    ) => {
      const context = getContext();
      if (!context) return;
      // 事件x轴
      drawHorizontalLine(context, offsetX, [offsetY], {
        isAxis: true,
        axisXData,
        strokeStyle,
        scaleSpace: scale.space,
        visibleXLeft: eventTypeWidth + paddingLeft,
        visibleXRight: canvasWidth - paddingRight,
      });
      drawAxisScale(context, offsetX - moveX, offsetY, {
        axisXData,
        scale,
        fillStyle,
        font,
        unit: axisX.unit,
        visibleXLeft: eventTypeWidth + paddingLeft,
        visibleXRight: canvasWidth - paddingRight,
      }); // 绘制刻度
    };

    const drawAxisAndLine = (offsetX: number, offsetY: number, moveX: number) => {
      const context = getContext();
      if (!context) return;
      const [lineYField, lineY2Field] = line.yField;
      drawXAxis(
        offsetX,
        offsetY + axisXheight,
        moveX,
        { ...axisX.scale, ...event.axis.x.scale },
        {
          strokeStyle: event.axis.x.lineColor,
          fillStyle: event.axis.x.color,
          font: `${event.axis.x.fontSize || axisX.fontSize}px ${font}`,
        },
      ); // 事件x轴
      withLine &&
        drawXAxis(
          offsetX,
          offsetY + lineHeight + axisXheight,
          moveX,
          { ...axisX.scale, ...line.axis.x.scale },
          {
            strokeStyle: line.axis.x.lineColor || axisX.lineColor,
            fillStyle: line.axis.x.color || axisX.color,
            font: `${line.axis.x.fontSize || axisX.fontSize}px ${font}`,
          },
        ); // + 间距
      // 画事件类型 不加间距
      drawEventTypes(offsetX, offsetY);
      if (withLine) {
        const offsetYs = dashLineList.map((val: number) => offsetY + axisXheight + val);
        // 画辅助线 + 间距
        if (lineYField) {
          drawHorizontalLine(context, offsetX, offsetYs, {
            lineWidth: 1,
            strokeStyle: line.dashLine.color,
            dash: line.dashLine.dash,
            offset: line.dashLine.offset,
            isDashLine: true,
            axisXData,
            scaleSpace: axisX.scale.space,
            axisYMax,
            axisYMin,
            yTextFormatter: line.axis.y.left.formatter,
            visibleXLeft: eventTypeWidth + paddingLeft,
            visibleXRight: canvasWidth - paddingRight,
          });
          drawYAxisText(context, offsetX, offsetYs, {
            axisYMax: axisYMax,
            axisYMin: axisYMin,
            ...line.axis.y.left,
            fillStyle: line.axis.y.left.color,
            font: `${line.axis.y.left.fontSize}px ${font}`,
          });
        }

        if (lineY2Field) {
          context.fillStyle = '#fff';
          context.fillRect(
            canvasWidth - paddingRight - line.axis.y.right.width,
            offsetY + axisXheight + axisX.scale.textHeight,
            line.axis.y.right.width + paddingRight,
            lineHeight,
          );

          // drawHorizontalLine(context, canvasWidth, offsetYs, {
          //   lineWidth: 1,
          //   strokeStyle: '#999',
          //   isDashLine: true,
          //   axisXData,
          //   scaleSpace: axisX.scale.space,
          //   visibleXLeft: eventTypeWidth + paddingLeft,
          //   visibleXRight: canvasWidth - paddingRight,
          // });
          drawYAxisText(context, canvasWidth, offsetYs, {
            axisYMax: axisY2Max,
            axisYMin: axisY2Min,
            ...line.axis.y.right,
            width: line.axis.y.right.width + paddingRight,
            fillStyle: line.axis.y.right.color,
            font: `${line.axis.y.right.fontSize}px ${font}`,
          });
        }
        drawLegend(
          context,
          canvasWidth - paddingRight,
          offsetY + lineHeight + axisXheight + axisX.height + 10,
          {
            lineColor: line.lineColor,
            legend: line.legend,
            font: `${line.legend.fontSize}px ${font}`,
            types: [...(leftLineTypes || []), ...(rightLineTypes || [])],
          },
        );
      }
      // 绘制paddingLeft;
      if (paddingLeft > 0) {
        context.fillStyle = '#fff';
        context.fillRect(
          0,
          0,
          paddingLeft,
          paddingTop + eventsHeight + axisX.height + axisX.scale.textHeight + lineHeight,
        );
      }
      // 绘制paddingRight;
      if (paddingRight > 0) {
        context.fillStyle = '#fff';
        context.fillRect(
          canvasWidth - paddingRight,
          0,
          paddingRight,
          paddingTop + eventsHeight + axisX.height + axisX.scale.textHeight + lineHeight,
        );
      }
    };

    const drawEventTypes = (offsetX: number, offsetY: number) => {
      const context = getContext();
      if (!context) return;
      eventTypes.forEach(({ label, sort, primaryColor, secondaryColor, ...rest }: any) => {
        if (sort === 0) {
          drawEventRectWidthText(
            context,
            offsetX - eventTypeWidth,
            offsetY - eventTypeHeight * sort,
            eventTypeWidth,
            axisXheight + lineHeight + paddingBottom, // 0趋势图背景覆盖折线图左侧区域
            withLine ? label : '',
            {
              strokeStyle: primaryColor,
              fillStyle: secondaryColor,
              radius: 0,
              textStyle: {
                ...rest,
                font: `${rest.fontSize}px ${font}`,
                fillStyle: rest.color || '#999',
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
            radius: 0,
            textStyle: {
              ...event.type,
              font: `${event.type.fontSize}px ${font}`,
              fillStyle: event.type.color || primaryColor,
            },
          },
        );
      });
    };

    const drawEvents = (offsetX: number, offsetY: number) => {
      const context = getContext();
      if (!context) return;
      const { scale } = axisX;
      const { minWidth, height, radius } = event;
      const { startField, endField, seriesField, titleField, key } = event.fieldNames;
      let activeEvent: any;
      events.forEach((item, index) => {
        const { sort, primaryColor, secondaryColor } = eventTypes.find(
          ({ value }: any) => value === item?.[seriesField],
        ) || {
          sort: 1,
        };
        const rangeStartX = moment(item?.[startField]).diff(moment(axisXStart), 'days');
        const count = moment(item?.[endField]).diff(moment(item?.[startField]), 'days');
        const startX = offsetX + rangeStartX * scale.space;
        const rectY = offsetY - eventTypeHeight * (eventTypes.length - sort); // 使用事件类型高度
        let eventW = count * scale.space;
        let guideW = count * scale.space;

        if (!item?.[endField] || eventW < minWidth) {
          if (!item?.[endField]) {
            guideW = 0;
          }
          eventW = minWidth;
        }
        const {
          visible,
          rectX = 0,
          rectW = 0,
        } = visibilityDraw('event', {
          rectX: startX,
          rectW: eventW,
          visibleXLeft: eventTypeWidth + paddingLeft,
          visibleXRight: canvasWidth - paddingRight,
        });
        if (!visible) {
          return;
        }
        console.log('====', rectX, rectW);
        const rectH = height;
        const isActive = showTooltip(
          ETooltipStatus.EVENT,
          { x: rectX - 1, y: rectY - 1, w: rectW + 1, h: rectH + 1 }, // +1 -1为了方便感应
          item,
        );
        if (isActive && mouseStatus === EMouseStatus.CLICK) {
          setActiveEventId(item?.[key] || `mel_id_${index}`);
        }
        if (isActive || activeEventId === (item?.[key] || `mel_id_${index}`)) {
          // 如果事件重合，则后绘制的事件优先级更高, 需要先绘制前此事件，不展示辅助线
          if (activeEvent) {
            activeEvent();
          }
          activeEvent = () => {
            if (activeEventId === (item?.[key] || `mel_id_${index}`)) {
              drawActiveEventGuides(
                context,
                rectX,
                rectY + radius,
                guideW,
                offsetY + axisXheight - 4,
                {
                  strokeStyle: primaryColor,
                },
              );
            }
            drawEventRectWidthText(
              context,
              rectX, // x
              rectY, // y
              rectW, // 宽
              rectH, // 高
              item?.[titleField] || '',
              {
                strokeStyle: primaryColor,
                fillStyle: secondaryColor,
                lineWidth: 2,
                radius,
                textStyle: {
                  font: `${event.fontSize}px ${font}`,
                  fillStyle: event.color || primaryColor,
                  paddingLeft: event.paddingLeft,
                  paddingRight: event.paddingRight,
                },
              },
            );
          };
          return;
        }
        drawEventRectWidthText(
          context,
          rectX, // x
          rectY, // y
          rectW, // 宽
          rectH, // 高
          item?.[titleField] || '',
          {
            strokeStyle: primaryColor,
            fillStyle: secondaryColor,
            lineWidth: 2,
            radius,
            textStyle: {
              font: `${event.fontSize}px ${font}`,
              fillStyle: event.color || primaryColor,
              paddingLeft: event.paddingLeft,
              paddingRight: event.paddingRight,
            },
          },
        );
      });
      activeEvent && activeEvent();
    };
    const drawLines = (offsetX: number, offsetY: number) => {
      const context = getContext();
      if (!context) return;
      const [leftLines, rightLines] = lines;
      const [lineYField, lineY2Field] = line.yField;
      const { left, right } = line.axis.y;
      const leftTypes = leftLineTypes?.length > 0 ? leftLineTypes : [''];
      const rightTypes = rightLineTypes?.length > 0 ? rightLineTypes : [''];
      lineYField &&
        leftLines?.length > 0 &&
        leftTypes.forEach((type, i) => {
          const current =
            type === '' || !type
              ? leftLines
              : leftLines.filter((item) => item?.[left?.seriesField] === type);

          drawChartLines(context, axisXStart, offsetX, offsetY, current, {
            scaleSpace: axisX.scale.space,
            axisYMax,
            axisYMin,
            dashLineSpace,
            dashLineCount: dashLineList.length,
            strokeStyle: line.lineColor[i],
            dtKey: line.xField,
            valueKey: lineYField,
            lineStyle: left.lineStyle,
            visibleXLeft: eventTypeWidth + paddingLeft,
            visibleXRight: canvasWidth - paddingRight,
            showTooltip: (status: ETooltipStatus, area: IArea, data: any) =>
              showTooltip(
                status,
                area,
                {
                  ...data,
                  lineTooltipLabel:
                    data?.[left?.label] ||
                    left?.label ||
                    data?.[left?.seriesField] ||
                    left?.seriesField,
                },
                {
                  dataType: 'left',
                  color: line.lineColor[i],
                  key: `${lineYField}-${type}`,
                  label: type,
                  yField: lineYField,
                },
              ),
          });
        });
      lineY2Field &&
        rightLines.length > 0 &&
        rightTypes.forEach((type, i) => {
          const current =
            type === ''
              ? rightLines
              : rightLines.filter((item) => item?.[right?.seriesField] === type);
          const lineColor = line.lineColor[leftTypes?.length + i];
          drawChartLines(context, axisXStart, offsetX, offsetY, current, {
            scaleSpace: axisX.scale.space,
            axisYMax: axisY2Max,
            axisYMin: axisY2Min,
            dashLineSpace,
            dashLineCount: dashLineList.length,
            strokeStyle: lineColor,
            dtKey: line.xField,
            valueKey: lineY2Field,
            seriesField: `${lineY2Field}-${type}`,
            lineStyle: right.lineStyle,
            visibleXLeft: eventTypeWidth + paddingLeft,
            visibleXRight: canvasWidth - paddingRight,
            showTooltip: (status: ETooltipStatus, area: IArea, data: any) =>
              showTooltip(
                status,
                area,
                {
                  ...data,
                  lineTooltipLabel:
                    data?.[right?.label] ||
                    right?.label ||
                    data?.[right?.seriesField] ||
                    right?.seriesField,
                },
                {
                  dataType: 'right',
                  color: lineColor,
                  key: `${lineY2Field}-${type}`,
                  yField: lineY2Field,
                  label: type,
                },
              ),
          });
        });
    };

    const draw = (startX: number, startY: number, moveX: number) => {
      clearCanvas();
      // const context = getContext();
      // context.rect(200, 100, canvasWidth - 300, canvasHeight - 100);
      // context.clip();
      // 画事件 不考虑事件和折线之间的间距
      drawEvents(paddingLeft + startX - moveX, startY + (eventTypeHeight - eventHeight) / 2);
      // 画折线 + 事件和折线之间的间距
      withLine && drawLines(paddingLeft + startX - moveX, startY + lineHeight + axisXheight);
      // 画X轴 Y轴 和 辅助线
      drawAxisAndLine(paddingLeft + startX, startY, moveX);
    };
    // 进行可见宽度限制
    useEffect(() => {
      const ele = document.querySelector('.EventLine');
      canvasWidth = ele?.clientWidth || 960;
      canvasRef.current.width = canvasWidth;
      // canvasRef.current.height = ele?.clientHeight;
      console.log('useEffect', mouseMoveX, mouseXY, mouseStatus);
      draw(eventTypeWidth, eventsHeight + paddingTop, mouseMoveX);
    }, [mouseMoveX, mouseXY, mouseStatus, activeEventId]);

    return (
      <div className="EventLine">
        <canvas id={id} ref={canvasRef} width="900" height={canvasHeight} />
        <Tooltip
          type={tooltipStatus}
          canvasSize={{ width: canvasWidth, height: canvasHeight }}
          location={mouseXY}
          pointLocation={linePoint}
          customContent={customTooltip}
          data={tooltipData}
          fieldNames={{
            event: {
              ...event.fieldNames,
            },
            line: {
              xField: line.xField,
              yField: line.yField,
            },
          }}
          guideLineStyle={{
            top: paddingTop + eventsHeight + axisXheight,
            height: lineHeight,
          }}
        />
      </div>
    );
  },
);
