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

// 获取URL查询参数(支持按key获取)
export const getQueryParams = (
  key?: string
): string | string[] | Record<string, string | string[]> => {
  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string | string[]> = {};
  for (const [k, value] of searchParams.entries()) {
    const decodedValue = decodeURIComponent(value);

    if (params.hasOwnProperty(k)) {
      const existing = params[k];
      params[k] = Array.isArray(existing)
        ? [...existing, decodedValue]
        : [existing, decodedValue];
    } else {
      params[k] = decodedValue;
    }
  }

  return key ? params[key as keyof typeof params] : params;
};

export const setSession = (key: string) => {
  const val = getQueryParams(key) as string
  sessionStorage.setItem(key, val||"");
};

export const setSessionDecode = (key: string) => {
  const val = getQueryParams(key) as string
  sessionStorage.setItem(key, val?decodeURIComponent(val):"");
};
