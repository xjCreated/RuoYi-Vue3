export function handleNumber(value, fixed = 2) {
  if (parseFloat(value).toString() === "NaN") {
    return "--";
  }
  const val = Number(value);
  if (Number.isInteger(val)) {
    return val.toString();
  }
  return val.toFixed(fixed);
}
import windbarb_1 from "@/views/largeScreen/img/weatherCock/windbarb_1.png";
export function handleImg(srcValue) {
  const img = windbarb_1;
  return img;
}
export function handleData(data, title) {
  let _data = [];
  switch (title) {
    case "综合气象站":
      _data = data.map((item) => {
        const { samplingTime, kqwd, kqsd, dqyl } = item;
        return {
          samplingTime,
          kqwd,
          kqsd,
          dqyl,
        };
      });
      break;
    case "雷达水位":
      _data = data.map((item) => {
        const { samplingTime, kg, sw } = item;
        return {
          samplingTime,
          kg,
          sw,
        };
      });
      break;
    case "雨量监测":
      _data = data.map((item) => {
        const { samplingTime, yl } = item;
        return {
          samplingTime,
          yl,
        };
      });
      break;
    case "风向风速":
      _data = data.map((item) => {
        const { samplingTime, fs, fj, fxjd, fx } = item;
        return {
          samplingTime,
          fs,
          fj,
          fxjd,
          fx,
        };
      });
      break;
    default:
      _data = data.map((item) => {
        const { samplingTime, trwsd1, trwsd2, trwsd3, trwsd4, trwsd5, trwsd6 } =
          item;
        return {
          samplingTime,
          trwsd1,
          trwsd2,
          trwsd3,
          trwsd4,
          trwsd5,
          trwsd6,
        };
      });
      break;
  }
  return _data;
}
export function handleYAxis(title, colors) {
  let yAxis = [];
  switch (title) {
    case "综合气象站":
      yAxis = [
        {
          type: "value", // 坐标轴类型:数值轴
          name: "温度", // 坐标轴名称
          position: "left", // 坐标轴位置:左侧
          // max: 1000,           // 坐标轴最大值(当前被注释掉)
          // min: 59,             // 坐标轴最小值(当前被注释掉)
          // interval: 8.2,      // 坐标轴刻度间隔(当前被注释掉)
          offset: 0, // 坐标轴相对于默认位置的偏移:无偏移
          axisLine: {
            show: true, // 是否显示坐标轴线
            lineStyle: {
              color: colors[0], // 坐标轴线颜色:使用颜色数组的第一个颜色
            },
          },
          splitLine: {
            show: true, // 是否显示分隔线
            lineStyle: {
              color: "rgba(255, 255, 255, 0.2)", // 浅色网格线
              // width: 4,          // 分隔线宽度(当前被注释掉)
              // type: "dotted", // 分隔线类型:点线
            },
          },
        },
        {
          type: "value", // 坐标轴类型:数值轴
          name: "气压", // 坐标轴名称
          position: "left", // 坐标轴位置:左侧
          offset: 30, // 坐标轴相对于默认位置的偏移:60像素
          axisLine: {
            show: true, // 是否显示坐标轴线
            lineStyle: {
              color: colors[1], // 坐标轴线颜色:使用颜色数组的第二个颜色
            },
          },
          splitLine: {
            show: false, // 是否显示分隔线:不显示
            lineStyle: {
              color: "rgba(255, 255, 255, 0.2)", // 浅色网格线
              // width: 4,         // 分隔线宽度(当前被注释掉)
              // type: "dotted", // 分隔线类型:点线
            },
          },
        },
        {
          type: "value", // 坐标轴类型:数值轴
          name: "湿度", // 坐标轴名称
          position: "left", // 坐标轴位置:左侧
          offset: 60, // 坐标轴相对于默认位置的偏移:120像素
          axisLine: {
            show: true, // 是否显示坐标轴线
            lineStyle: {
              color: colors[2], // 坐标轴线颜色:使用颜色数组的第三个颜色
            },
          },
          splitLine: {
            show: true, // 是否显示网格线:不显示
            lineStyle: {
              color: "rgba(255, 255, 255, 0.2)", // 浅色网格线
              // width: 4,       // 分隔线宽度(当前被注释掉)
              // type: "dotted", // 分隔线类型:点线
            },
          },
        },
      ];
      break;

    default:
      break;
  }
  return yAxis;
}
export function formatTime(timeStr, pattern) {
  const dt = new Date(timeStr);

  const pad = (num) => num.toString().padStart(2, "0");

  const parts = {
    YYYY: dt.getFullYear(),
    MM: pad(dt.getMonth() + 1),
    DD: pad(dt.getDate()),
    HH: pad(dt.getHours()),
    mm: pad(dt.getMinutes()),
    ss: pad(dt.getSeconds()),
  };

  let result = pattern;
  for (const [key, value] of Object.entries(parts)) {
    result = result.replace(key, value);
  }

  return result;
}
