import Native from './Native';
import $$ from 'cmn-utils';
import { getOS } from './util';

var setting = {
  fileNum: '1',
  loadCamera: true
};

class FileSelector extends Native {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      index: 0,
      file: {},
      readOnly: false
    };
  }
  activate = param => {
    const device = getOS();
    return new Promise((resolve, reject) => {
      $$.once(this.NATIVE_IDENT, res =>
        this.handleData(res, device, resolve, reject)
      );
      if (device === 'android') {
        window.callback.openImgSelector(JSON.stringify(setting));
      } else {
        window.openImgSelector(JSON.stringify(setting));
      }
    });
  };
}

/**
 * 打开文件选择器
 */

const fileSelector = new FileSelector({
  func: 'openImgSelector',
  defaultParam: setting,
  nameCB: 'imgSelectorRetBack'
});

export default fileSelector;
