import { useEffect, useState } from 'react';
import { EMouseStatus, ILocation } from '../type';

// const wheelEventType = (e: any) => {
//   if (Math.abs(e.deltaX) !== 0 && Math.abs(e.deltaY) !== 0) return 'none';
//   if (e.deltaX < 0) return 'right';
//   if (e.deltaX > 0) return 'left';
//   if (e.ctrlKey) {
//     if (e.deltaY > 0) return 'inner';
//     if (e.deltaY < 0) return 'outer';
//   } else {
//     if (e.deltaY > 0) return 'up';
//     if (e.deltaY < 0) return 'down';
//   }
// };

const stopPropagationAndDefault = (event: any) => {
  event.stopPropagation();
  event.cancelBubble = true;
  event.preventDefault();
  event.returnValue = false;
};

let moveXLength = 0;
let moveXLength2 = 0;

const useMouseMove = (selector: string, min: any, max: any) => {
  // const [mouseXY, setMouseXY] = useState<ILocation>();
  // const [mouseStatus, setMouseStatus] = useState<EMouseStatus>(EMouseStatus.NONE);
  // const [moveStartX, setMoveStartX] = useState<number>(0);
  // const [moveXLength, setMoveXLength] = useState<number>(0);

  const [mouseState, setMouseState] = useState<any>({
    startX: 0,
    mouseMoveX: 0,
    mouseXY: {
      x: 0,
      y: 0,
    },
    mouseStatus: EMouseStatus.NONE,
  });

  const handleMouseDown = (event: any) => {
    const canvas = document.querySelector(selector);
    if (!canvas) {
      return;
    }
    setMouseState({
      ...mouseState,
      mouseStatus: EMouseStatus.DOWN,
      startX: moveXLength + event.clientX - canvas.getBoundingClientRect().left,
    });
    // setMouseStatus(EMouseStatus.DOWN);
    // setMoveStartX(moveXLength + event.clientX - canvas.getBoundingClientRect().left);
  };

  const handleMouseMove = (event: any) => {
    const canvas = document.querySelector(selector);
    if (!canvas) {
      return;
    }
    const { startX, mouseStatus } = mouseState;
    if (startX === 0) {
      setMouseState({
        ...mouseState,
        mouseXY: {
          x: event.clientX - canvas.getBoundingClientRect().left,
          y: event.clientY - canvas.getBoundingClientRect().top,
        },
      });
      // setMouseXY({
      //   x: event.clientX - canvas.getBoundingClientRect().left,
      //   y: event.clientY - canvas.getBoundingClientRect().top,
      // });
    } else {
      const { mouseMoveX } = mouseState;
      let length = startX - (event.clientX - canvas.getBoundingClientRect().left);
      if (min && length < min) {
        length = min;
      }
      if (max && length > max) {
        length = max;
      }
      moveXLength = length;
      if (Math.abs(moveXLength - mouseMoveX) < 12) {
        return;
      }
      setMouseState({
        ...mouseState,
        mouseMoveX: moveXLength,
        mouseXY: undefined,
      });
    }
    if (mouseStatus !== EMouseStatus.DRAG && mouseStatus !== EMouseStatus.HOVER) {
      setMouseState({
        ...mouseState,
        mouseStatus: mouseStatus === EMouseStatus.DOWN ? EMouseStatus.DRAG : EMouseStatus.HOVER,
      });
      // setMouseStatus(mouseStatus === EMouseStatus.DOWN ? EMouseStatus.DRAG : EMouseStatus.HOVER);
    }
  };

  const handleMouseUp = () => {
    const { mouseStatus } = mouseState;
    setMouseState({
      ...mouseState,
      mouseStatus: mouseStatus === EMouseStatus.DOWN ? EMouseStatus.CLICK : EMouseStatus.NONE,
      startX: 0,
    });
    // setMouseStatus(mouseStatus === EMouseStatus.DOWN ? EMouseStatus.CLICK : EMouseStatus.NONE);
    // setMoveStartX(0);
  };

  const handleScroll = (event: any) => {
    //停止事件冒泡和默认事件
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      //停止事件冒泡和默认事件
      stopPropagationAndDefault(event);
      const { mouseMoveX } = mouseState;
      let length = moveXLength + event.deltaX;
      if (min && length < min) {
        length = min;
      }
      if (max && length > max) {
        length = max;
      }
      moveXLength = length;
      if (Math.abs(moveXLength - mouseMoveX) < 12) {
        return;
      }
      setMouseState({
        ...mouseState,
        mouseMoveX: moveXLength,
        mouseStatus: EMouseStatus.SCROLL_X,
      });
      // setMoveXLength(length);
      // setMouseStatus(EMouseStatus.SCROLL_X);
      return;
    }
  };

  useEffect(() => {
    const canvas = document.querySelector(selector);
    if (!canvas) {
      return;
    }
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('DOMMouseScroll', handleScroll, false);
    canvas.addEventListener('mousewheel', handleScroll, false);
    canvas.addEventListener('wheel', handleScroll, false);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('DOMMouseScroll', handleScroll, false);
      canvas.removeEventListener('mousewheel', handleScroll, false);
      canvas.removeEventListener('wheel', handleScroll, false);
    };
  });
  return { ...mouseState };
};

export default useMouseMove;
