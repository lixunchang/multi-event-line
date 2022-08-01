export declare const drawHorizontalLine: (ctx: any, offsetX?: number, offsetYs?: number[], config?: any) => void;
interface IScaleConfig {
    axisXData: any;
    scale: Record<string, any>;
}
export declare const drawAxisScale: (ctx: any, offsetX: number | undefined, offsetY: number | undefined, { axisXData, scale }: IScaleConfig) => void;
export declare const drawEventRectWidthText: (ctx: any, x: number, y: number, w: number, h: number, text: string, style?: Record<string, any> | undefined) => void;
export declare const drawChartLines: (ctx: any, axisXStart: string, zeroX: number, zeroY: number, list: any, config?: any) => void;
export {};
