import Native from './Native';

class GPSLocation extends Native {
  handleData = (res, device, resolve, reject) => {
    let data;
    if (typeof res === 'string') {
      data = JSON.parse(window.atob(res));
    } else if (typeof res === 'object') {
      data = res;
    }

    if (device === 'ios') {
      if (!window.AMap)
        return reject(new Error('ios 需要预先加载高德地图api！'));
      // ios 获取到的原始坐标值得转成火星坐标才能使用，
      // 需要通过高德转换,所以需要预先加载地图api.
      let lnglat = new window.AMap.LngLat(data[0].longitude, data[0].latitude);
      window.AMap.convertFrom(lnglat, 'gps', (status, result) => {
        return resolve({
          longitude: result.locations[0].getLng(),
          latitude: result.locations[0].getLat()
        });
      });
    } else {
      return resolve({
        longitude: parseFloat(data[0].longitude),
        latitude: parseFloat(data[0].latitude)
      });
    }
  };
}

const gpsLocation = new GPSLocation({
  func: 'gpsLocation',
  nameCB: 'locationRetBack'
});

export default gpsLocation;
