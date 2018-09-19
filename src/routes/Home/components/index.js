import React from 'react';
import { connect } from 'dva';
import BaseComponent from 'components/BaseComponent';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import { Grid } from 'antd-mobile';
import './style.less';
const { Content } = Layout;

@connect(({ global }) => ({ global }))
export default class Home extends BaseComponent {
  render() {
    const { global } = this.props;
    const { menu } = global;

    return (
      <Layout full className="home-page">
        <Content>
          <Grid
            data={menu}
            columnNum={4}
            renderItem={(item, index) => (
              <div className="grid-block">
                <Icon type={item.icon} />
                <h4>{item.name}</h4>
              </div>
            )}
            onClick={(item, index) => {
              this.history.push(item.path);
            }}
          />
        </Content>
      </Layout>
    );
  }
}
