import { EMouseStatus, ILocation } from '../type';
declare const useMouseMove: (
  selector: string,
  min: any,
  max: any,
) => {
  mouseMoveX: number;
  mouseXY: ILocation | undefined;
  mouseStatus: EMouseStatus;
};
export default useMouseMove;
