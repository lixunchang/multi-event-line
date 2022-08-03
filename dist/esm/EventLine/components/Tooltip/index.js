function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import React from 'react';
import { ETooltipStatus } from '../../type';
import styles from './index.less';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import { Fragment as _Fragment } from 'react/jsx-runtime';
export default /*#__PURE__*/ React.memo(
  function (_ref) {
    var location = _ref.location,
      pointLocation = _ref.pointLocation,
      title = _ref.title,
      desc = _ref.desc,
      type = _ref.type,
      label = _ref.label,
      guideLineStyle = _ref.guideLineStyle;
    if (!location || !title || type === ETooltipStatus.NOTHING) return null;
    return /*#__PURE__*/ _jsxs(_Fragment, {
      children: [
        /*#__PURE__*/ _jsxs('div', {
          className: styles.Tooltip,
          style: {
            left: (location === null || location === void 0 ? void 0 : location.x) + 10,
            top: location === null || location === void 0 ? void 0 : location.y,
          },
          children: [
            /*#__PURE__*/ _jsx('div', {
              className: styles.title,
              children: title,
            }),
            /*#__PURE__*/ _jsxs('div', {
              className: styles.desc,
              children: [
                type === ETooltipStatus.LINE &&
                  label &&
                  /*#__PURE__*/ _jsxs('span', {
                    children: [label, ':'],
                  }),
                /*#__PURE__*/ _jsx('span', {
                  children: desc,
                }),
              ],
            }),
          ],
        }),
        type === ETooltipStatus.LINE &&
          pointLocation &&
          /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
              /*#__PURE__*/ _jsx('span', {
                className: styles.tooltipLine,
                style: _objectSpread(
                  {
                    left:
                      (pointLocation === null || pointLocation === void 0
                        ? void 0
                        : pointLocation.x) - 1,
                  },
                  guideLineStyle,
                ),
              }),
              /*#__PURE__*/ _jsx('span', {
                className: styles.linePoint,
                style: {
                  left:
                    (pointLocation === null || pointLocation === void 0
                      ? void 0
                      : pointLocation.x) - 4,
                  top:
                    (pointLocation === null || pointLocation === void 0
                      ? void 0
                      : pointLocation.y) - 4,
                },
              }),
            ],
          }),
      ],
    });
  },
  function (prev, next) {
    var _prev$location, _next$location, _prev$location2, _next$location2;

    if (
      Math.abs(
        ((_prev$location = prev.location) === null || _prev$location === void 0
          ? void 0
          : _prev$location.x) -
          ((_next$location = next.location) === null || _next$location === void 0
            ? void 0
            : _next$location.x),
      ) > 4 ||
      Math.abs(
        ((_prev$location2 = prev.location) === null || _prev$location2 === void 0
          ? void 0
          : _prev$location2.y) -
          ((_next$location2 = next.location) === null || _next$location2 === void 0
            ? void 0
            : _next$location2.y),
      ) > 4 ||
      prev.title !== next.title ||
      prev.desc !== next.desc
    ) {
      return false;
    }

    return true;
  },
);
