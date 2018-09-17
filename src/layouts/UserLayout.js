import React from 'react';
import { connect } from 'dva';
import { Switch, NavLink } from 'dva/router';
import './styles/user.less';

@connect()
export default class UserLayout extends React.PureComponent {
  render() {
    const {routerData} = this.props;
    const {childRoutes} = routerData;

    return (
      <div className="user-layout">
        <nav>
          <NavLink to="/sign/login" activeClassName="active">登录</NavLink>
          /
          <NavLink to="/sign/register" activeClassName="active">注册</NavLink>
        </nav>
        <Switch>
          {childRoutes}
        </Switch>
      </div>
    );
  }
}