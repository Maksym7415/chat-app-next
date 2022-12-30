/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

const months = [
  "янв.",
  "февр.",
  "мар.",
  "апр.",
  "мая",
  "июн.",
  "июл.",
  "авг.",
  "сент.",
  "окт.",
  "нояб.",
  "дек.",
];
const weekDays = ["вс.", "вт.", "ср.", "чт.", "пт.", "сб", "пн."];

export const getCurrentDay = (value, isMessage) => {
  if (setDays(value)) {
    const date = setDays(value, isMessage).split(":");
    if (date.length < 3 && Number(date[1])) {
      return date.map((d) => (d.length < 2 ? `0${d}` : d)).join(":");
    }
    return date.map((d) => (d.length < 2 ? `0${d}` : d)).join(":");
  }
  return "";
};

export const fullDate = (value) => {
  const dayTime =
    `${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
      .split("-")
      .map((d) => (d.length < 2 ? `0${d}` : d))
      .join("-");
  const yearTime = `${value.getFullYear()}-${
    value.getMonth() + 1
  }-${value.getDate()}`
    .split("-")
    .map((d) => (d.length < 2 ? `0${d}` : d))
    .join("-");
  return `${yearTime} ${dayTime}`;
};

const setDays = (date, isMessage) => {
  const diffInTime = Date.now() - new Date(date).getTime();
  if (isMessage) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
  if (diffInTime > 31540000000) {
    return `${date.getFullYear()}:${date.getMonth() + 1}:${date.getDate()}`;
  }
  if (diffInTime > 604800000) {
    return `${date.getDate()}:${months[date.getMonth() + 1]}`;
  }
  if (diffInTime > 86400000) {
    return `${weekDays[date.getDay()]}`;
  }
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const setMessageDate = (date) => {
  const diffInTime = Date.now() - new Date(date).getTime();
  if (diffInTime > 31540000000) {
    return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`
      .split(":")
      .map((d) => (d.length < 2 ? `0${d}` : d))
      .join(".");
  }

  return `${date.getDate()}:${months[date.getMonth()]}`
    .split(":")
    .map((d) => (d.length < 2 ? `0${d}` : d))
    .join(" ");
};
