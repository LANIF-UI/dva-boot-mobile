import React from 'react';
import cx from 'classnames';
import Layout from '../Layout';
const { Content } = Layout;

export default class TinyPage extends React.Component {
  render() {
    const {visible, className, children, ...otherProps} = this.props;
    let classname = cx(className, {
      hide: !visible
    });
    return (
      <Layout className={classname} {...otherProps}>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}