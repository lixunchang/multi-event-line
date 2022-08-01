export interface EventItem {
    start: string;
    end?: string;
    title: string;
    desc?: string;
    [_: string]: any;
}
export interface LineItem {
    dt: string;
    value: number;
    [_: string]: any;
}
export interface IEventType {
    label: string;
    value: string;
    sort: number;
    themeColor?: string;
    borderColor?: string;
}
export declare enum EMouseStatus {
    NOTHING = "nothing",
    DRAGING = "draging",
    MOVEING = "moveing"
}
export interface Location {
    x: number;
    y: number;
}
export declare enum ETooltipStatus {
    NOTHING = "nothing",
    EVENT = "event",
    LINE = "line"
}
