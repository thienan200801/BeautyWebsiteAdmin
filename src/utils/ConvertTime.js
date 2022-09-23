import "dayjs/locale/vi";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.locale("vi");

export default function getDateTime(datetime) {
  if (dayjs(datetime).isToday()) {
    return dayjs(datetime).fromNow();
  } else return dayjs(datetime).format("MMM D, YYYY HH:mm");
}

export function toDay() {
  return dayjs().format("DD/MM/YYYY")
}
export function thisMonthAndYear() {
  return dayjs().format("MM/YYYY")
}