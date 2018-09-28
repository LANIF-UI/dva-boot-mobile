import Native from './Native';

/**
 * 组件扫码
 */
class ScanQRCode extends Native {
  handleData = (res, device, resolve, reject) => {
    let data;
    if (typeof res === 'string') {
      data = JSON.parse(decodeURIComponent(atob(res)));
    } else if (typeof res === 'object') {
      data = res;
    }

    return resolve(data);
  };
}

const scanQRCode = new ScanQRCode({
  func: 'scanQRCode',
  nameCB: 'scanQRCodeRetBack'
});

export default scanQRCode;
