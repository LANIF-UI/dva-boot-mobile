import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import './style/index.less';

/**
 * 表单组件
 */
class FormComp extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    /**
     * 详见帮助文档 column.js 用法
     */
    columns: PropTypes.array.isRequired,
    /**
     * 使用record的数据对表单进行赋值 {key:value, key1: value1}, 时间类型初始值需转成moment类型
     */
    record: PropTypes.object,
    /**
     * 搜索条件分组，设置这个属性后，会在column.js中过滤有相同group值的搜索项
     */
    group: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * 额外表单项
     */
    children: PropTypes.node,
    /**
     * rc-form对像
     */
    form: PropTypes.object,
    /**
     * 点击查询按钮 onSubmit(values) values 提交数据
     */
    onSubmit: PropTypes.func,

    /**
     * 是否是预览视图，所有表单项将展示为文本模式
     */
    preview: PropTypes.bool,

    /**
     * 是否是提交中状态
     */
    loading: PropTypes.bool,

    /**
     * 是否显示底部按钮，或传入自定义的底部按钮
     */
    footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
  };

  static defaultProps = {
    prefixCls: 'antui-form',
    loading: false
  };

  onReset = e => {
    this.props.form.resetFields();
  };

  onSubmit = e => {
    e.preventDefault();
    const { form, record, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit && onSubmit(values, record);
      }
    });
  };

  render() {
    const { columns, record, preview, group, form } = this.props;
    let formFields = columns.filter(col => col.formItem);
    if (group) {
      formFields = formFields.filter(
        col => col.formItem && col.formItem.group === group
      );
    }

    return (
      <form onSubmit={this.onSubmit}>
      </form>
    );
  }
}

export default createForm()(FormComp);
