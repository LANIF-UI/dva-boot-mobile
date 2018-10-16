import React from 'react';
import { Menu } from 'antd-mobile';
import SearchBar from '../SearchBar';
import BaseComponent from '../BaseComponent';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './style/index.less';
import Icon from '../Icon';

/**
 * 搜索条，带筛选功能
 */
class SearchBox extends BaseComponent {
  static propTypes = {
    columns: PropTypes.array.isRequired
  };

  static defaultProps = {
    prefixCls: 'antui-search-box',
    goBack: true
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
    if (value[0] === '') {
      delete valueObject[activeField.key];
    } else if (type === 'select') {
      valueObject[activeField.key] = value[0];
    } else {
      valueObject[activeField.key] = value;
    }
    this.setState({
      valueObject,
      visibleMenu: false
    });
    if (onSearch) {
      onSearch(valueObject);
    }
  };

  onSubmit = (value, item) => {
    const { valueObject } = this.state;
    const { onSearch } = this.props;
    valueObject[item.name] = value === '' ? null : value;
    if (onSearch) {
      onSearch(valueObject);
    }
  };

  goBack = () => {
    this.history.goBack();
  };
  renderItems = searchFields => {
    const { activeField, visibleMenu, valueObject } = this.state;
    return (
      <ul className="dropdown">
        {searchFields.map(field => {
          const { searchItem, dict = [], title } = field;
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
                    {valueObject[field.name]
                      ? dict.filter(
                          item => item.code === valueObject[field.name]
                        )[0].codeName
                      : title}
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
    const { prefixCls, columns, goBack, action } = this.props;
    const classname = cx(prefixCls);
    const searchFields = columns.filter(col => col.searchItem);
    const primaryField = searchFields.filter(
      col => col.searchItem.type && col.searchItem.type === 'primary'
    );

    const GoBack = goBack ? (
      <div className="goback-btn" onClick={this.goBack}>
        <Icon type="into" />
      </div>
    ) : null;
    const menuValue = valueObject[activeField.key];
    return (
      <div className={classname}>
        {primaryField.length ? (
          <div className="top-search-bar">
            {GoBack}
            <SearchBar
              placeholder={primaryField[0].title}
              onSubmit={value => this.onSubmit(value, primaryField[0])}
            />
          </div>
        ) : null}
        <div className="search-toolbar">
          <div className="toolbar__left-section">
            <div className="toolbar__filters">
              {!primaryField.length && GoBack}
              {this.renderItems(searchFields)}
            </div>
          </div>
          {action ? (
            <div className="toolbar__right-section">{action}</div>
          ) : null}
        </div>
        {visibleMenu ? (
          <Menu
            className="search-box-dropdown"
            data={menuData}
            level={1}
            value={Array.isArray(menuValue) ? menuValue : [menuValue]}
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
