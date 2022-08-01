export declare const analysisEventData: (events: any, fieldNames?: any) => any;
export declare const analysisLineData: (lines: any, fieldNames?: any) => any;
export declare const turnNumber: (value: number, method?: 'ceil' | 'floor') => number;
export declare const analysisEventLineData: (events: any, lines: any, config?: Record<string, any>) => {
    minDate: string;
    maxDate: string;
    axisXStart: string;
    axisXEnd: string;
    axisXWidth: number;
    axisXTotal: number;
    axisYMax: number;
    axisYMin: number;
    eventMinDate: any;
    eventMaxDate: any;
    lineMinDate: any;
    lineMaxDate: any;
    lineMinValue: any;
    lineMaxValue: any;
};
