import React, { useCallback, useEffect, useRef, useState } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import useMouseMove from '../../hooks/useMouseMove';
import {
  EMouseStatus,
  ETooltipStatus,
  EventItem,
  IEventType,
  LineItem,
  Location,
} from '../../type';
import { analysisEventLineData } from '../../utils/data';
import defaultConfig from '../../config';
import {
  drawAxisScale,
  drawChartLines,
  drawEventRectWidthText,
  drawHorizontalLine,
} from '../../utils/draw';
import styles from './index.less';
import Tooltip from '../Tooltip';

const moment = extendMoment(Moment as any);

const START_X = 100;
const START_Y = 300;

const dashLineSpace = 50;
const dashLineList = [250, 200, 150, 100, 50];

// const DAY_TEXT_RANGE = 6; // 日期文本间隔

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

interface IProps {
  id?: string;
  events: EventItem[];
  eventTypes?: any;
  lines: LineItem[];
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

export default React.memo(
  ({ id = 'event-line', events, eventTypes, lines, ...restConfig }: IProps) => {
    const config = { ...defaultConfig, ...restConfig };

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

    const { mouseMoveX, mouseXY } = useMouseMove(`#${id}`, - 100, axisXWidth -200);

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
    // console.log(
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
      drawXAxis(offsetX, offsetY, moveX);
      drawXAxis(offsetX, offsetY + 300, moveX);
      // 画事件类型
      drawEventTypes(offsetX, offsetY);
      // 画辅助线
      drawHorizontalLine(
        context,
        offsetX,
        dashLineList.map((val: number) => offsetY + val),
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
      eventTypes.forEach(({ label, sort }: any) => {
        if (sort === 0) {
          drawEventRectWidthText(context, offsetX - 100, offsetY - 40 * sort, 100, 400, label, {
            strokeStyle: '#fff',
            fillStyle: '#fff',
            textStyle: {
              fillStyle: '#999',
            },
          });
          return;
        }
        drawEventRectWidthText(context, offsetX - 100, offsetY - 40 * sort, 100, 40, label);
      });
    };

    const drawEvents = (offsetX: number, offsetY: number) => {
      const context = getContext();
      const { scale, fieldNames } = config;
      const { eventStart, eventEnd, eventSeriesField, eventTitleField } = fieldNames;
      events.forEach((item) => {
        const { sort } = eventTypes.find(
          ({ value }: any) => value === item?.[eventSeriesField],
        ) || {
          sort: 1,
        };
        const rangeStartX = moment(item?.[eventStart]).diff(moment(axisXStart), 'days');
        const count = moment(item?.[eventEnd]).diff(moment(item?.[eventStart]), 'days');
        const rectX = offsetX + rangeStartX * scale.space;
        const rectY = offsetY - 40 * sort;
        const rectW = count * scale.space;
        const rectH = 30;
        showTooltip(
          ETooltipStatus.EVENT,
          { x: rectX - 1, y: rectY - 1, w: rectW + 1, h: rectH + 1 },
          item,
        );
        drawEventRectWidthText(
          context,
          rectX, // x
          rectY, // y
          rectW, // 宽
          rectH, // 高
          item?.[eventTitleField] || '',
          { strokeStyle: '#fff', fillStyle: '#1890ff', lineWidth: 2 },
        );
      });
    };
    const drawLines = (offsetX: number, offsetY: number) => {
      const context = getContext();
      drawChartLines(context, axisXStart, offsetX, offsetY, lines, {
        scaleSpace: config.scale.space,
        axisYMax,
        axisYMin,
        dashLineSpace,
        dashLineCount: dashLineList.length,
        showTooltip,
      });
    };

    const draw = (startX: number, startY: number, moveX: number) => {
      clearCanvas();
      // 画事件
      drawEvents(startX - moveX, startY);
      // 画折线
      drawLines(startX - moveX, startY + 300);
      // 画X轴 Y轴 和 辅助线
      drawAxisAndLine(startX, startY, moveX);
    };

    useEffect(() => {
      draw(START_X, START_Y, mouseMoveX);
    }, [mouseMoveX, mouseXY]);
    console.log('axisXWidth', axisXWidth, mouseMoveX);
    return (
      <div className={styles.EventLine}>
        <canvas id={id} ref={canvasRef} width="2440" height="700" />
        <Tooltip
          type={tooltipStatus}
          location={mouseXY}
          pointLocation={linePoint}
          title={tooltipData?.title || tooltipData?.dt}
          label="value"
          desc={tooltipData?.desc || tooltipData?.value}
        />
      </div>
    );
  },
);
