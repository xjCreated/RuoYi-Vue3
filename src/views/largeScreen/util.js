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
  //TODO:待完善图片
  const img = windbarb_1;
  return img;
}
