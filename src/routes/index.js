import {createRoutes} from '@/utils/core';
import BaseLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import NotFound from './Pages/404';
import Login from './Login';
import Home from './Home';
import MachineRoom from './MachineRoom';

const routesConfig = (app) => ([
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    childRoutes: [
      Login(app),
      NotFound()
    ]
  }, {
    path: '/',
    title: '系统中心',
    component: BaseLayout,
    indexRoute: '/home',
    childRoutes: [
      Home(app),
      MachineRoom(app),
      NotFound()
    ]
  }
]);

export default app => createRoutes(app, routesConfig);