import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/deviceCheck',
  title: '设备巡检',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
