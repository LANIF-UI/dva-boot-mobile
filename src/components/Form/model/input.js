import React from 'react';
import { List, InputItem, TextareaItem } from 'antd-mobile';
import config from '@/config';
const notice = config.notice;
const Item = List.Item;

/**
 * 文本框元件
 */
export default ({ form, record, preview, field, key }) => {
  const { getFieldDecorator, getFieldError } = form;
  const { title, name, formItem } = field;
  const {
    type,
    initialValue,
    options = {},
    rules,
    onChange,
    placeholder,
    ...otherProps
  } = formItem;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    options.initialValue = initval;
  }

  if (preview) {
    if (type === 'hidden') return null;
    return (
      <Item key={key} extra={initval || ''}>
        {title}
      </Item>
    );
  }

  // 常用必填项验证
  if (otherProps.required) {
    options.rules = [
      {
        required: true,
        message: placeholder || `请输入${title}`
      }
    ];
  }

  // 如果有rules
  if (rules && rules.length) {
    options.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    options.onChange = value => onChange(form, value);
  }

  const tProps = {
    placeholder: placeholder || `请输入${title}`,
    ...otherProps
  };

  let T = InputItem;
  if (type === 'textarea') {
    T = TextareaItem;
  } else if (type === 'hidden') {
    return getFieldDecorator(name, options)(
      <input key={key} type="hidden" {...tProps} />
    );
  }

  return getFieldDecorator(name, options)(
    <T
      key={key}
      error={!!getFieldError(name)}
      onErrorClick={e => {
        notice.warn((getFieldError(name) || []).join('，'));
      }}
      {...tProps}
    >
      {title}
    </T>
  );
};
