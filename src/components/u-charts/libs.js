import echarts from "./backup/echarts";
import ucharts from "./backup/ucharts";

export function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

export function objectAssignDeep() {
  var isClone = function (data) {
    return ~["Array", "Object"].indexOf(getType(data));
  };

  var cloneStart = function (old, data) {
    if (isClone(data)) {
      for (var i in data) {
        if (isClone(data[i])) {
          if (!isClone(old[i])) old[i] = getType(data[i]) == "Array" ? [] : {};
          cloneStart(old[i], data[i]);
        } else {
          old[i] = data[i];
        }
      }
    }
  };

  var baseObject = isClone(arguments[0]) ? arguments[0] : {};
  for (var i = 1; i < arguments.length; i++) {
    cloneStart(baseObject, arguments[i]);
  }
  return baseObject;
}

export function mergeConfig(uConfig, configType) {
  switch (configType) {
    case "echarts":
      return objectAssignDeep(uConfig, echarts);
    case "ucharts":
      return objectAssignDeep(uConfig, ucharts);
    default:
      return uConfig;
  }
}
