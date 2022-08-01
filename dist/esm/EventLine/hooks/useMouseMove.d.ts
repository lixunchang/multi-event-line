import { EMouseStatus, Location } from "../type";
declare const useMouseMove: (selector: string, min: any, max: any) => {
    mouseMoveX: number;
    mouseXY: Location | undefined;
    mouseStatus: EMouseStatus;
};
export default useMouseMove;
