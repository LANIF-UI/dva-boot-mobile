import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export default class Col extends React.Component {
  static propTypes = {
    span: stringOrNumber,
    order: stringOrNumber,
    offset: stringOrNumber,
    push: stringOrNumber,
    pull: stringOrNumber,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const props = this.props;
    const { span, order, offset, push, pull, className, children, prefixCls = 'ant-col', ...others } = props;
    let sizeClassObj = {};
    const classes = classNames({
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
    }, className, sizeClassObj);

    return <div {...others} className={classes}>{children}</div>;
  }
}