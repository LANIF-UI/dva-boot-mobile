import camera from './Camera'; // 摄像头
import gpsLocation from './GPSLocation'; // GPS定位
import ScanQRCode from './ScanQRCode'; // 扫二维码
import FileSelector from './FileSelector'; // 图片选择器

// 例: Native.openCamera().then(resp => {});
export const openCamera = camera.activate; // 打开摄像头

// 例: Native.getCurrentPosition().then(resp => {});
export const getCurrentPosition = gpsLocation.activate; // GPS定位获取

// 例: Native.scanQRCode().then(resp => {});
export const scanQRCode = ScanQRCode.activate; // 扫二维码

// 例: Native.FileSelector().then(resp => {});
export const fileSelector = FileSelector.activate; // 图片选择器
