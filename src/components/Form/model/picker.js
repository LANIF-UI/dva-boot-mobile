import React from 'react';
import { List, Picker } from 'antd-mobile';
import { isFunction } from 'cmn-utils/lib/utils';
const Item = List.Item;

/**
 * 选择器元件
 */
export default ({ form, record, preview, field, key }) => {
  const { getFieldDecorator } = form;
  const { title, name, formItem, dataSource = [], normalize } = field;
  const {
    type,
    initialValue,
    options = {},
    rules,
    onChange,
    placeholder,
    labelNumber = 5,
    ...otherProps
  } = formItem;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if (isFunction(normalize)) {
      options.initialValue = normalize(initval);
    } else {
      options.initialValue = initval;
    }
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
        message: placeholder || `请选择${title}`
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
    placeholder: placeholder || `请选择${title}`,
    ...otherProps
  };

  return getFieldDecorator(name, options)(
    <Picker
      data={dataSource}
      title={title}
      {...tProps}
    >
      <List.Item arrow="horizontal">{title}</List.Item>
    </Picker>
  );
};
