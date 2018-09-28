import React from 'react';
import { List } from 'antd-mobile';
const Item = List.Item;

/**
 * 自定义元件
 */
export default ({ form, record, preview, field, key }) => {
  const { formItem } = field;
  const { render, arrow = 'horizontal', onClick } = formItem;

  return (
    <Item
      key={key}
      arrow={arrow}
      onClick={onClick}
    >
      {render(record, form, field)}
    </Item>
  );
};
