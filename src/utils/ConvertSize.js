export function kilobytesToSize(kb) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (kb == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(kb) / Math.log(1024)));
  return Math.round(kb / Math.pow(1024, i), 2) + " " + sizes[i];
}
