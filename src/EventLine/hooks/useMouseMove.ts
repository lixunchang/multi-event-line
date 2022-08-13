import { useEffect, useState } from 'react';
import { EMouseStatus, ILocation } from '../type';

const wheelEventType = (e: any) => {
  if (Math.abs(e.deltaX) !== 0 && Math.abs(e.deltaY) !== 0) return 'none';
  if (e.deltaX < 0) return 'right';
  if (e.deltaX > 0) return 'left';
  if (e.ctrlKey) {
    if (e.deltaY > 0) return 'inner';
    if (e.deltaY < 0) return 'outer';
  } else {
    if (e.deltaY > 0) return 'up';
    if (e.deltaY < 0) return 'down';
  }
};

const stopPropagationAndDefault = (event: any) => {
  event.stopPropagation();
  event.cancelBubble = true;
  event.preventDefault();
  event.returnValue = false;
};

const useMouseMove = (selector: string, min: any, max: any) => {
  const [mouseXY, setMouseXY] = useState<ILocation>();
  const [mouseStatus, setMouseStatus] = useState<EMouseStatus>(EMouseStatus.NONE);
  const [moveStartX, setMoveStartX] = useState<number>(0);
  const [moveXLength, setMoveXLength] = useState<number>(0);

  const handleMouseDown = (event: any) => {
    const canvas = document.querySelector(selector);
    if (!canvas) {
      return;
    }
    setMouseStatus(EMouseStatus.DOWN);
    setMoveStartX(moveXLength + event.clientX - canvas.getBoundingClientRect().left);
  };

  const handleMouseMove = (event: any) => {
    const canvas = document.querySelector(selector);
    if (!canvas) {
      return;
    }
    if (moveStartX === 0) {
      setMouseXY({
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top,
      });
    } else {
      let length = moveStartX - (event.clientX - canvas.getBoundingClientRect().left);
      if (min && length < min) {
        length = min;
      }
      if (max && length > max) {
        length = max;
      }
      setMoveXLength(length);
      setMouseXY(undefined);
    }
    if (mouseStatus !== EMouseStatus.DRAG && mouseStatus !== EMouseStatus.HOVER) {
      setMouseStatus(mouseStatus === EMouseStatus.DOWN ? EMouseStatus.DRAG : EMouseStatus.HOVER);
    }
  };

  const handleMouseUp = () => {
    setMouseStatus(mouseStatus === EMouseStatus.DOWN ? EMouseStatus.CLICK : EMouseStatus.NONE);
    setMoveStartX(0);
  };

  const handleScroll = (event: any) => {
    //停止事件冒泡和默认事件
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      //停止事件冒泡和默认事件
      stopPropagationAndDefault(event);
      let length = moveXLength + event.deltaX;
      if (min && length < min) {
        length = min;
      }
      if (max && length > max) {
        length = max;
      }
      setMouseStatus(EMouseStatus.SCROLL_X);
      setMoveXLength(length);
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

  return { mouseMoveX: moveXLength, mouseXY, mouseStatus };
};

export default useMouseMove;
