import React from 'react';
import { DatePicker } from 'antd-mobile';
import $$ from 'cmn-utils';
/**
 * 日期，时间元件
 */
export default ({
  name,
  form,
  type,
  record,
  initialValue,
  rules,
  formFieldOptions = {},
  format,
  onChange,
  normalize,
  preview,
  ...otherProps
}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval);
    } else {
      formFieldOptions.initialValue = initval;
    }
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  let props = {
    mode: type,
    ...otherProps
  };

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (date, dateString) =>
      onChange(form, date, dateString);
  }

  if (format) props.format = format;
  else if (type === 'month') props.format = 'YYYY-MM';
  else if (type === 'datetime' || type === 'date~')
    props.format = 'YYYY-MM-DD HH:mm:ss';
  else if (type === 'time') props.format = 'HH:mm:ss';
  else props.format = 'YYYY-MM-DD';

  if (preview) {
    return (
      <div style={otherProps.style}>
        {initval ? formFieldOptions.initialValue.format(props.format) : ''}
      </div>
    );
  }

  return getFieldDecorator(name, formFieldOptions)(<DatePicker {...props} />);
};
