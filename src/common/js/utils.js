/**
 *  解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */

export function urlParse () {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    });
  }
  return obj;
};

/**
 * 数据本地存储通用方法
 */

export function saveToLocal (id, key, value) {
  let appStorage = window.localStorage.__appStorage__;
  if (!appStorage) {
    appStorage = {};
    appStorage[id] = {};
  } else {
    appStorage = JSON.parse(appStorage);
    if (!appStorage[id]) {
      appStorage[id] = {};
    }
  }
  appStorage[id][key] = value;
  window.localStorage.__appStorage__ = JSON.stringify(appStorage);
};

/**
 * 本地数据读取通用方法
 */

export function loadFromLocal (id, key, def) {
  let appStorage = window.localStorage.__appStorage__;
  if (!appStorage) {
    return def;
  }
  appStorage = JSON.parse(appStorage)[id];
  if (!appStorage) {
    return def;
  }
  let ret = appStorage[key];
  return ret || def;
};
