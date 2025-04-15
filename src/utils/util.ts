export const formatDateTime = (date: Date | string | number): string => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 是否Object 返回值 true || false
export const isObject = (value: any) => {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
};

// 是否数组 返回值 true || false
export const isArray = (value: any) => {
  const _isArray =
    Array.isArray ||
    ((_arg) => Object.prototype.toString.call(_arg) === "[object Array]");
  return _isArray(value);
};

// 是否为空 返回值 true || false
export const isEmpty = (value: any) => {
  if (value === null || value === undefined || value === "") {
    return true;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  if (isArray(value)) {
    return value.length === 0;
  }
  return false;
};

