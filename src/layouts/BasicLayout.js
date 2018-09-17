import React from 'react';
import { connect } from 'dva';
import { Switch, routerRedux } from 'dva/router';
import $$ from 'cmn-utils';
import Layout from 'components/Layout';
import './styles/basic.less';
const { Header, Content } = Layout;

@connect(({ global }) => ({ global }))
export default class BasicLayout extends React.PureComponent {

  componentWillMount() {
    // 检查有户是否登录
    const user = $$.getStore('user');
    if (!user) {
      this.props.dispatch(routerRedux.replace('/sign/login'));
    } else {
    }
  }
  
  render() {
    const { routerData } = this.props;
    const { childRoutes } = routerData;

    return (
      <Layout full className="basic-layout">
        <Header></Header>
        <Content>
          <Switch>
            {childRoutes}
          </Switch>
        </Content>
      </Layout>
    );
  }
}