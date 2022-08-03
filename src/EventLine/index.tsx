// import MultiEventLine from './components/MultiEventLine';

// export default MultiEventLine;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import useMouseMove from './hooks/useMouseMove';
import { EMouseStatus, ETooltipStatus, IEventItem, IEventType, ILineItem, ILocation } from './type';
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

const moment = extendMoment(Moment as any);

interface IProps {
  id?: string;
  events: IEventItem[];
  eventTypes?: any;
  lines: ILineItem[];
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
  ({ id = 'event-line', events, eventTypes: eTypes, lines, config: customConfig }: IProps) => {
    const eventTypes = [eventType0, ...eTypes];
    const config = {
      ...defaultConfig,
      ...customConfig,
      axis: { ...defaultConfig?.axis, ...customConfig?.axis },
      scale: { ...defaultConfig?.scale, ...customConfig?.scale },
      fieldNames: { ...defaultConfig?.fieldNames, ...customConfig?.fieldNames },
      eventTypeStyle: { ...defaultConfig?.eventTypeStyle, ...customConfig?.eventTypeStyle },
      eventStyle: { ...defaultConfig?.eventStyle, ...customConfig?.eventStyle },
      lineStyle: { ...defaultConfig?.lineStyle, ...customConfig?.lineStyle },
    };
    const [paddingTop = 0, paddingRight, paddingLeft, paddingBottom = 25] = config?.padding || {};
    const { width: eventTypeWidth, height: eventTypeHeight } = config?.eventTypeStyle || {};
    const { height: axisXHeight } = config?.axis || {};
    const { height: eventHeight, minWidth: eventMinWidth } = config?.eventStyle || {};
    const { yScaleSpace: scaleLineSpace = 50, yScaleCount: scaleLineCount = 6 } =
      config?.lineStyle || {};
    //事件高度计算；
    const eventsHeight = eventTypeHeight * eTypes.length;
    const lineHeight = scaleLineSpace * scaleLineCount;
    const dashLineList = getLineDashYList(scaleLineCount, scaleLineSpace) || [
      250, 200, 150, 100, 50,
    ];

    const canvasRef = useRef<any>(null);
    const getContext = useCallback(() => {
      return canvasRef.current.getContext('2d');
    }, [canvasRef.current]);
    const [tooltipStatus, setTooltipStatus] = useState(ETooltipStatus.NOTHING);
    const [tooltipData, setTooltipData] = useState<any>();
    const [linePoint, setLinePoint] = useState<any>();

    const { axisXStart, axisXEnd, lineMinValue, lineMaxValue, axisYMax, axisYMin, axisXWidth } =
      analysisEventLineData(events, lines, config);
    const axisXData = Array.from(moment.range(moment(axisXStart), moment(axisXEnd)).by('days')).map(
      (item) => item.format('YYYYMMDD'),
    );

    const { mouseMoveX, mouseXY } = useMouseMove(`#${id}`, -100, axisXWidth - 200);

    const showTooltip = (type: ETooltipStatus, area: IArea, data: any) => {
      if (
        mouseXY &&
        mouseXY.x >= area.x &&
        mouseXY.x <= area.x + (area.w || 2) &&
        mouseXY.y >= area.y &&
        mouseXY.y <= area.y + (area.h || 2)
      ) {
        if (type === ETooltipStatus.LINE) {
          setLinePoint({ x: area?.pointX, y: area?.pointY });
        }
        setTooltipStatus(type);
        setTooltipData(data);
      } else if (tooltipStatus === type && tooltipData?.id === data.id) {
        setTooltipStatus(ETooltipStatus.NOTHING);
        setTooltipData(undefined);
      }
    };

    const clearCanvas = () => {
      const context = getContext();
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const drawXAxis = (offsetX: number, offsetY: number, moveX: number) => {
      const context = getContext();
      // 事件x轴
      drawHorizontalLine(context, offsetX, [offsetY], {
        isAxis: true,
        axisXData,
        strokeStyle: '#999',
        lineMinValue,
        lineMaxValue,
        scale: config.scale,
      });
      drawAxisScale(context, offsetX - moveX, offsetY, { axisXData, scale: config.scale }); // 绘制刻度
    };

    const drawAxisAndLine = (offsetX: number, offsetY: number, moveX: number) => {
      const context = getContext();
      drawXAxis(offsetX, offsetY + axisXHeight, moveX); // + 间距
      drawXAxis(offsetX, offsetY + lineHeight + axisXHeight, moveX); // + 间距
      // 画事件类型 不加间距
      drawEventTypes(offsetX, offsetY);
      // 画辅助线 + 间距
      drawHorizontalLine(
        context,
        offsetX,
        dashLineList.map((val: number) => offsetY + axisXHeight + val),
        {
          lineWidth: 1,
          strokeStyle: '#999',
          isDashLine: true,
          axisXData,
          lineMinValue,
          lineMaxValue,
          scale: config.scale,
          axisYMax,
          axisYMin,
        },
      );
    };

    const drawEventTypes = (offsetX: number, offsetY: number) => {
      const context = getContext();
      const { eventTypeStyle } = config;
      eventTypes.forEach(({ label, sort, primaryColor, secondaryColor }: any) => {
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
            textStyle: {
              fillStyle: primaryColor,
              ...eventTypeStyle,
            },
          },
        );
      });
    };

    const drawEvents = (offsetX: number, offsetY: number) => {
      const context = getContext();
      const { scale, fieldNames, eventStyle } = config;
      const { eventStart, eventEnd, eventSeriesField, eventTitleField } = fieldNames;
      events.forEach((item) => {
        const { sort, primaryColor, secondaryColor } = eventTypes.find(
          ({ value }: any) => value === item?.[eventSeriesField],
        ) || {
          sort: 1,
        };
        const rangeStartX = moment(item?.[eventStart]).diff(moment(axisXStart), 'days');
        const count = moment(item?.[eventEnd]).diff(moment(item?.[eventStart]), 'days');
        const rectX = offsetX + rangeStartX * scale.space;
        const rectY = offsetY - eventTypeHeight * (eventTypes.length - sort); // 使用事件类型高度
        const rectW = count * scale.space;
        const rectH = 30;
        showTooltip(
          ETooltipStatus.EVENT,
          { x: rectX - 1, y: rectY - 1, w: rectW + 1, h: rectH + 1 }, // +1 -1为了方便感应
          item,
        );
        drawEventRectWidthText(
          context,
          rectX, // x
          rectY, // y
          rectW, // 宽
          rectH, // 高
          item?.[eventTitleField] || '',
          {
            strokeStyle: primaryColor,
            fillStyle: secondaryColor,
            lineWidth: 2,
            textStyle: {
              fillStyle: primaryColor,
              ...eventStyle.textStyle,
            },
          },
        );
      });
    };
    const drawLines = (offsetX: number, offsetY: number) => {
      const context = getContext();
      drawChartLines(context, axisXStart, offsetX, offsetY, lines, {
        scaleSpace: config.scale.space,
        axisYMax,
        axisYMin,
        scaleLineSpace,
        dashLineCount: dashLineList.length,
        showTooltip,
      });
    };

    const draw = (startX: number, startY: number, moveX: number) => {
      clearCanvas();
      // 画事件 不考虑事件和折线之间的间距
      drawEvents(startX - moveX, startY + (eventTypeHeight - eventHeight) / 2);
      // 画折线 + 事件和折线之间的间距
      drawLines(startX - moveX, startY + lineHeight + axisXHeight);
      // 画X轴 Y轴 和 辅助线
      drawAxisAndLine(startX, startY, moveX);
    };

    useEffect(() => {
      draw(eventTypeWidth, eventsHeight + paddingTop, mouseMoveX);
    }, [mouseMoveX, mouseXY]);
    console.log('axisXWidth', axisXWidth, mouseMoveX);
    const canvasHeight = eventsHeight + lineHeight + axisXHeight + paddingTop + paddingBottom;
    return (
      <div className={styles.EventLine}>
        <canvas id={id} ref={canvasRef} width="950" height={canvasHeight} />
        <Tooltip
          type={tooltipStatus}
          location={mouseXY}
          pointLocation={linePoint}
          title={tooltipData?.title || tooltipData?.dt}
          label="value"
          desc={tooltipData?.desc || tooltipData?.value}
          guideLineStyle={{
            top: eventsHeight + axisXHeight,
            height: lineHeight,
          }}
        />
      </div>
    );
  },
);
