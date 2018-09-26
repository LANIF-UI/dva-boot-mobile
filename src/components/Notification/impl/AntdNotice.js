import { Toast } from 'antd-mobile';
import Notification from '../Notification';

export default class extends Notification {
  static success(message) {
    Toast.success(message);
  }

  static error(message) {
    Toast.fail(message);
  }

  static info(message) {
    Toast.info(message);
  }

  static warning(message) {
    Toast.info(message);
  }

  static warn(message) {
    Toast.info(message);
  }

  static loading(message) {
    Toast.loading(message || '加载中', 20);
  }

  static close(key) {
    Toast.hide(key);
  }

  static destroy() {
    Toast.hide();
  }
}
