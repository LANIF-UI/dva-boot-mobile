import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { createForm } from 'rc-form';
import { splitColumns } from './util';
import cx from 'classnames';
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
    prefixCls: 'antui-mobile-form',
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

  renderFormList = formFields => {
    const { form, record, preview } = this.props;
    return splitColumns(formFields).map((section, index) => {
      const { header, footer, body } = section;

      const listProps = {};
      if (header) listProps.renderHeader = _ => header;
      if (footer) listProps.renderFooter = _ => footer;

      return (
        <List key={`section-${index}`} {...listProps}>
          {body.map((field, key) => {
            const { type = 'input' } = field.formItem;
            const formProps = {
              form,
              record,
              preview,
              field,
              key
            }
            if (type === 'hidden' || type === 'textarea') {
              return require('./model/input').default({ ...formProps, type })
            } else {
              return require(`./model/${type.toLowerCase()}`).default(formProps);
            }
          })}
        </List>
      );
    });
  };

  render() {
    const { prefixCls, className, columns, group, form } = this.props;
    let formFields = columns.filter(col => col.formItem);
    if (group) {
      formFields = formFields.filter(
        col => col.formItem && col.formItem.group === group
      );
    }

    return (
      <form className={cx(prefixCls, className)} onSubmit={this.onSubmit}>{this.renderFormList(formFields)}</form>
    );
  }
}

export default createForm()(FormComp);
