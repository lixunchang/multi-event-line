import { useCallback, useEffect, useState } from "react";
import { EMouseStatus, Location } from "../type";



const useMouseMove=(selector: string, min, max)=>{

  const [mouseXY, setMouseXY] = useState<Location>();
  const [mouseStatus, setMouseStatus] = useState<EMouseStatus>(EMouseStatus.NOTHING);
  const [moveStartX, setMoveStartX] = useState<number>(0);
  const [moveXLength, setMoveXLength] = useState<number>(0);


  const handleMouseDown=(event: any)=>{
    const canvas = document.querySelector(selector);
    if(!canvas){
      return;
    }
    setMouseStatus(EMouseStatus.DRAGING);
    setMoveStartX(moveXLength + event.clientX - canvas.getBoundingClientRect().left);
  }
  const handleMouseMove=(event: any)=>{
    const canvas = document.querySelector(selector);
    if (!canvas ) {
      return;
    }
    if(moveStartX === 0){
      setMouseXY({
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top,
      })
    }else{
      let length = moveStartX - (event.clientX - canvas.getBoundingClientRect().left);
      if(min && length < min){
        length = min;
      }
      if(max && length > max){
        length = max
      }
      setMoveXLength(length);
      setMouseXY(undefined);
    }
  };
  
  const handleMouseUp=()=>{
    setMouseStatus(EMouseStatus.NOTHING);
    setMoveStartX(0);
  }

  useEffect(()=>{
    const canvas = document.querySelector(selector);
    if(!canvas){
      return;
    }
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove',handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return {mouseMoveX: moveXLength, mouseXY, mouseStatus};
}


export default useMouseMove;