import Native from './Native';

class Camera extends Native {
  handleData = (res, device, resolve, reject) => {
    let data = null;
    try {
      if (typeof res === 'string') {
        data = JSON.parse(window.atob(res));
      } else if (typeof res === 'object') {
        data = res;
      }

      if (device === 'ios') {
        if (data.code === '200' && data.tag === 'media') {
          return resolve(data.data);
        }
      }
    } catch (e) {
      throw e;
    }
    return resolve(data);
  };
}
/**
 * 组件摄像头
 */
const camera = new Camera({
  func: 'openCamera',
  defaultParam: { width: 800, height: 600 },
  nameCB: 'cameraRetBack'
});

export default camera;
