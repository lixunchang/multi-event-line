export var EMouseStatus;

(function (EMouseStatus) {
  EMouseStatus["NOTHING"] = "nothing";
  EMouseStatus["DRAGING"] = "draging";
  EMouseStatus["MOVEING"] = "moveing";
})(EMouseStatus || (EMouseStatus = {}));

export var ETooltipStatus;

(function (ETooltipStatus) {
  ETooltipStatus["NOTHING"] = "nothing";
  ETooltipStatus["EVENT"] = "event";
  ETooltipStatus["LINE"] = "line";
})(ETooltipStatus || (ETooltipStatus = {}));