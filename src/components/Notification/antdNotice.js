import { Toast } from 'antd-mobile';
import $$ from 'cmn-utils';
import Notification from './Notification';
import './antdNotice.less';

const prefixCls = 'antui-notification';
const defaultConfig = {
  duration: 2,
};

function notice(config, type, title) {
  if ($$.isObject(config)) {
    Toast[type]({
      className: `${prefixCls} ${prefixCls}-${type}`,
      ...defaultConfig,
      ...config
    });
  } else {
    Toast[type]({
      className: `${prefixCls} ${prefixCls}-${type}`,
      message: config,
      ...defaultConfig
    });
  }
}

export default class extends Notification {
  static success(config) {
    notice(config, 'success', '成功');
  }

  static error(config) {
    notice(config, 'fail', '出错了');
  }

  static info(config) {
    notice(config, 'info', '提示');
  }

  static warning(config) {
    notice(config, 'info', '注意');
  }

  static warn(config) {
    notice(config, 'info', '注意');
  }

  static close(key) {
    Toast.hide(key);
  }

  static destroy() {
    Toast.hide();
  }
}
