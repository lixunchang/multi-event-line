import React from 'react';
import { ETooltipStatus } from "../../type";
import styles from "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default /*#__PURE__*/React.memo(function (_ref) {
  var location = _ref.location,
      pointLocation = _ref.pointLocation,
      title = _ref.title,
      desc = _ref.desc,
      type = _ref.type,
      label = _ref.label;
  if (!location || !title || type === ETooltipStatus.NOTHING) return null;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: styles.Tooltip,
      style: {
        left: (location === null || location === void 0 ? void 0 : location.x) + 10,
        top: location === null || location === void 0 ? void 0 : location.y
      },
      children: [/*#__PURE__*/_jsx("div", {
        className: styles.title,
        children: title
      }), /*#__PURE__*/_jsxs("div", {
        className: styles.desc,
        children: [type === ETooltipStatus.LINE && label && /*#__PURE__*/_jsxs("span", {
          children: [label, ":"]
        }), /*#__PURE__*/_jsx("span", {
          children: desc
        })]
      })]
    }), type === ETooltipStatus.LINE && pointLocation && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("span", {
        className: styles.tooltipLine,
        style: {
          left: pointLocation === null || pointLocation === void 0 ? void 0 : pointLocation.x
        }
      }), /*#__PURE__*/_jsx("span", {
        className: styles.linePoint,
        style: {
          left: (pointLocation === null || pointLocation === void 0 ? void 0 : pointLocation.x) - 3,
          top: (pointLocation === null || pointLocation === void 0 ? void 0 : pointLocation.y) - 2
        }
      })]
    })]
  });
}, function (prev, next) {
  var _prev$location, _next$location, _prev$location2, _next$location2;

  if (Math.abs(((_prev$location = prev.location) === null || _prev$location === void 0 ? void 0 : _prev$location.x) - ((_next$location = next.location) === null || _next$location === void 0 ? void 0 : _next$location.x)) > 4 || Math.abs(((_prev$location2 = prev.location) === null || _prev$location2 === void 0 ? void 0 : _prev$location2.y) - ((_next$location2 = next.location) === null || _next$location2 === void 0 ? void 0 : _next$location2.y)) > 4 || prev.title !== next.title || prev.desc !== next.desc) {
    return false;
  }

  return true;
});