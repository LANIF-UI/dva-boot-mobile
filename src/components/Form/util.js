/**
 * 为columns分组并附加头信息
 * @param {*} arr
 * @param {*} split
 */
export function splitColumns(arr, split = 'line') {
  const source = [...arr];
  const res = [];
  const flat = source.map(item => item.formItem.type);
  let index;
  let temp = {};
  while (flat.length) {
    if (flat[0] === split) {
      flat.shift();
      temp = source.shift();
      continue;
    }
    if ((index = flat.indexOf(split)) !== -1) {
      flat.splice(0, index);
      res.push({
        header: temp.title,
        body: source.splice(0, index)
      });
    } else {
      flat.splice(0, flat.length);
      res.push({
        header: temp.title,
        body: source
      });
    }
  }
  return res;
}
