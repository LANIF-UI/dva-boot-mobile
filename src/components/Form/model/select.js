import React from 'react';
import { List } from 'antd-mobile';
import config from '@/config';
import { isFunction } from 'cmn-utils/lib/utils';
const Item = List.Item;

/**
 * 下拉框元件
 */
export default ({ form, record, preview, field, key }) => {
  const { getFieldDecorator, getFieldError } = form;
  const { title, name, formItem, dict = [], normalize } = field;
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

  return (
    <div key={key} className="am-list-item am-list-item-middle">
      <div className="am-list-line">
        <div className={'am-input-label am-input-label-' + labelNumber}>
          {title}
        </div>
        <div className="am-input-control">
          {getFieldDecorator(name, options)(
            <select {...tProps}>
              {dict.map((item, i) => (
                <option key={item.code} value={item.code}>
                  {item.codeName}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="am-list-arrow am-list-arrow-horizontal" />
      </div>
    </div>
  );
};
