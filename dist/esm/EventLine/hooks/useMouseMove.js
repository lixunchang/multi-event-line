function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useEffect, useState } from "react";
import { EMouseStatus } from "../type";

var useMouseMove = function useMouseMove(selector, min, max) {
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      mouseXY = _useState2[0],
      setMouseXY = _useState2[1];

  var _useState3 = useState(EMouseStatus.NOTHING),
      _useState4 = _slicedToArray(_useState3, 2),
      mouseStatus = _useState4[0],
      setMouseStatus = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      moveStartX = _useState6[0],
      setMoveStartX = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      moveXLength = _useState8[0],
      setMoveXLength = _useState8[1];

  var handleMouseDown = function handleMouseDown(event) {
    var canvas = document.querySelector(selector);

    if (!canvas) {
      return;
    }

    setMouseStatus(EMouseStatus.DRAGING);
    setMoveStartX(moveXLength + event.clientX - canvas.getBoundingClientRect().left);
  };

  var handleMouseMove = function handleMouseMove(event) {
    var canvas = document.querySelector(selector);

    if (!canvas) {
      return;
    }

    if (moveStartX === 0) {
      setMouseXY({
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top
      });
    } else {
      var length = moveStartX - (event.clientX - canvas.getBoundingClientRect().left);

      if (min && length < min) {
        length = min;
      }

      if (max && length > max) {
        length = max;
      }

      setMoveXLength(length);
      setMouseXY(undefined);
    }
  };

  var handleMouseUp = function handleMouseUp() {
    setMouseStatus(EMouseStatus.NOTHING);
    setMoveStartX(0);
  };

  useEffect(function () {
    var canvas = document.querySelector(selector);

    if (!canvas) {
      return;
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    return function () {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  });
  return {
    mouseMoveX: moveXLength,
    mouseXY: mouseXY,
    mouseStatus: mouseStatus
  };
};

export default useMouseMove;