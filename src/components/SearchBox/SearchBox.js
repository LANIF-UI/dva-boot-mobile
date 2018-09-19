import React, { Component } from 'react';
import { SearchBar, Menu } from 'antd-mobile';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './style/index.less';

/**
 * 搜索条，带筛选功能
 */
class SearchBox extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired
  };

  static defaultProps = {
    prefixCls: 'antui-search-box'
  };

  state = {
    menuData: [],
    visibleMenu: false,
    activeField: {},
    valueObject: {}
  };

  togglePopupMenu = (field, dict) => {
    const { activeField, visibleMenu } = this.state;
    const { name } = field;
    let visible;
    if (activeField && activeField.key === name) {
      visible = !visibleMenu;
    } else {
      activeField.key = name;
      activeField.field = field;
      visible = true;
    }

    this.setState({
      menuData: dict.map(({ code, codeName, ...other }) => ({
        label: codeName,
        value: code,
        ...other
      })),
      visibleMenu: visible
    });
  };

  onMaskClick = () => {
    this.setState({
      menuData: [],
      visibleMenu: false
    });
  };

  onChangeSelect = value => {
    const { onSearch } = this.props;
    const { activeField, valueObject } = this.state;
    const { type } = activeField.field.searchItem;
    if (type === 'select') {
      valueObject[activeField.key] = value[0];
    } else {
      valueObject[activeField.key] = value;
    }
    this.setState({
      valueObject
    });
    if (onSearch) {
      onSearch(valueObject);
    }
  };

  onSubmit = (value, item) => {
    const { valueObject, onSearch } = this.state;
    valueObject[item.name] = value === "" ? null : value;
    if (onSearch) {
      onSearch(valueObject);
    }
  }

  renderItems = searchFields => {
    const { activeField, visibleMenu } = this.state;
    return (
      <ul className="dropdown">
        {searchFields.map(field => {
          const { searchItem, dict, title } = field;
          switch (searchItem.type) {
            case 'select':
              return (
                <li
                  key={field.name}
                  onClick={() => this.togglePopupMenu(field, dict)}
                >
                  <div
                    className={cx('dropdown__trigger', {
                      active: activeField.key === field.name && visibleMenu
                    })}
                  >
                    {title}
                  </div>
                </li>
              );
            default:
              return null;
          }
        })}
      </ul>
    );
  };

  render() {
    const { menuData, visibleMenu, valueObject, activeField } = this.state;
    const { prefixCls, columns } = this.props;
    const classname = cx(prefixCls);
    const searchFields = columns.filter(col => col.searchItem);
    const primaryField = searchFields.filter(col => col.searchItem.type && col.searchItem.type === 'primary');

    return (
      <div className={classname}>
        {primaryField && primaryField.length ? (
          <div className="top-search-bar">
            <SearchBar placeholder={primaryField[0].title} onSubmit={value => this.onSubmit(value, primaryField[0])} />
          </div>
        ) : null}
        <div className="search-toolbar">
          <div className="toolbar__left-section">
            <div className="toolbar__filters">
              {this.renderItems(searchFields)}
            </div>
          </div>
          <div className="toolbar__right-section">
            <ul className="dropdown">
              <li>
                <div className="dropdown__trigger">操作</div>
              </li>
            </ul>
          </div>
        </div>
        {visibleMenu ? (
          <Menu
            className="search-box-dropdown"
            data={menuData}
            level={1}
            value={valueObject[activeField.key]}
            onChange={this.onChangeSelect}
          />
        ) : null}
        {visibleMenu ? (
          <div className="menu-mask" onClick={this.onMaskClick} />
        ) : null}
      </div>
    );
  }
}

export default SearchBox;
