// 改造antd Layout 在移动端使用
import React from "react";
import cx from "classnames";
import "./style/index.less";

function generator(props) {
  return BasicComponent => {
    return class Adapter extends React.Component {
      static Header;
      static Footer;
      static Content;
      render() {
        const { prefixCls } = props;
        return <BasicComponent prefixCls={prefixCls} {...this.props} />;
      }
    };
  };
}

class Basic extends React.Component {
  render() {
    const { prefixCls, className, children, ...others } = this.props;
    const divCls = cx(className, prefixCls);
    return (
      <div className={divCls} {...others}>
        {children}
      </div>
    );
  }
}

class BasicLayout extends React.Component {
  render() {
    const { prefixCls, className, children, full, ...others } = this.props;
    const divCls = cx(className, prefixCls, { "full-layout": full });
    return (
      <div className={divCls} {...others}>
        {children}
      </div>
    );
  }
}

const Layout = generator({
  prefixCls: "antui-layout"
})(BasicLayout);

const Header = generator({
  prefixCls: "antui-layout-header"
})(Basic);

const Footer = generator({
  prefixCls: "antui-layout-footer"
})(Basic);

const Content = generator({
  prefixCls: "antui-layout-content"
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
