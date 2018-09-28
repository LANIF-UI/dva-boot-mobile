import $$ from 'cmn-utils';
import objectAssign from 'object-assign';
import { getOS } from './util';

let EVENT_COUNT = 0;

export class Native {
  constructor(
    opts = {
      func: () => {},
      defaultParam: {},
      nameCB: ''
    }
  ) {
    if (opts === null) {
      throw new TypeError('opts is required object!');
    }

    if (!opts.nameCB || !opts.func) {
      throw new TypeError('opts set error!');
    }

    if (typeof opts.defaultParam === 'object') {
      this.defaultParam = opts.defaultParam;
    }

    if (opts.func) {
      this.method = {};
      if (typeof opts.func === 'string') {
        this.method.ios = this.method.android = opts.func;
      } else if (
        typeof opts.func === 'object' &&
        (!!opts.func.ios || !!opts.func.android)
      ) {
        this.method = opts.func;
      } else {
        throw new TypeError('func set error!');
      }
    }

    this.NATIVE_IDENT = 'NATIVE_' + EVENT_COUNT++;

    const cb = opts.nameCB.split('|');
    window[cb[0]] = res => {
      $$.trigger(this.NATIVE_IDENT, res);
    };
    if (cb[1] && !window[cb[1]]) {
      window[cb[1]] = res => {
        $$.trigger(this.NATIVE_IDENT, res);
      };
    }
  }

  activate = param => {
    const device = getOS();
    return new Promise((resolve, reject) => {
      $$.once(this.NATIVE_IDENT, res =>
        this.handleData(res, device, resolve, reject)
      );

      const _p = objectAssign({}, this.defaultParam, param);
      let paramStr = null;
      if (Object.keys(_p).length) {
        paramStr = JSON.stringify(_p);
      }
      if (this.method[device]) {
        if (typeof window.callback === 'object') {
          paramStr
            ? window.callback[this.method[device]](paramStr)
            : window.callback[this.method[device]]();
        } else {
          paramStr
            ? window[this.method[device]](paramStr)
            : window[this.method[device]]();
        }
      } else {
        return reject(new TypeError('not fount method of device:' + device));
      }
    });
  };

  deactivate = () => {};

  // 需要自定义反回数据的在子类中重写这个方法, 并反回resolve或reject
  handleData = (res, device, resolve, reject) => {
    let data = null;
    try {
      if (typeof res === 'string') {
        data = JSON.parse(window.atob(res));
      } else if (typeof res === 'object') {
        data = res;
      } else {
        throw TypeError('return type only is string or object!');
      }
    } catch (e) {
      throw e;
    }
    return resolve(data);
  };
}

export default Native;
