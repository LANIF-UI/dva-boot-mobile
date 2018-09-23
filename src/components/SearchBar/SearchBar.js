import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import './SearchBar.less';

/**
 *
 */
class SearchBar extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    searchName: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    lang: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    placeholder: '搜索',
    searchName: 'q',
    onChange: undefined,
    onClear: undefined,
    onCancel: undefined,
    onSubmit: undefined,
    lang: { cancel: '取消' },
    autocomplete: 'off'
  };

  state = {
    focus: false,
    clearing: false,
    text: ''
  };

  changeHandle = e => {
    let text = e.target.value;
    if (this.props.onChange) this.props.onChange(text, e);
    this.setState({ text });
  };

  cancelHandle = e => {
    this.setState({
      focus: false,
      text: ''
    });
    if (this.props.onCancel) this.props.onCancel(e);
    if (this.props.onChange) this.props.onChange('', e);
  };

  clearHandle = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ text: '', clearing: true });
    if (this.props.onClear) this.props.onClear(e);
    this.refs.searchInput.focus();
    if (this.props.onChange) this.props.onChange('', e);
  };

  blurHandle = e => {
    if (this.state.text === '') {
      this.setState({ focus: false });
    }
  };

  submitHandle = e => {
    if (this.props.onSubmit) {
      e.preventDefault();
      e.stopPropagation();
      this.refs.searchInput.blur();
      this.props.onSubmit(this.state.text, e);
    }
  };

  render() {
    const { placeholder, className, searchName } = this.props;
    const clz = cx(
      {
        'festui-search-bar': true,
        'festui-search-bar_focusing': this.state.focus
      },
      className
    );

    return (
      <div className={clz}>
        <form className="festui-search-bar__form" onSubmit={this.submitHandle}>
          <div className="festui-search-bar__box">
            <Icon
              antd
              size="small"
              type="search"
              className="festui-icon-search"
            />
            <input
              ref="searchInput"
              type="search"
              name={searchName}
              className="festui-search-bar__input"
              placeholder={placeholder}
              onFocus={e => this.setState({ focus: true })}
              onBlur={this.blurHandle}
              onChange={this.changeHandle}
              value={this.state.text}
            />
            <a className="festui-icon-clear" onClick={this.clearHandle}>
              <Icon type="cross-circle-o" size="small" antd />
            </a>
          </div>
          <label
            className="festui-search-bar__label"
            onClick={() => {
              let searchInput = this.refs.searchInput;
              if (searchInput) {
                searchInput.focus();
              }
            }}
            style={{ display: this.state.text ? 'none' : null }}
          >
            <Icon
              antd
              size="small"
              type="search"
              className="festui-icon-search"
            />
            <span>{placeholder}</span>
          </label>
        </form>
        <a
          className="festui-search-bar__cancel-btn"
          onClick={this.cancelHandle}
        >
          {this.props.lang.cancel}
        </a>
      </div>
    );
  }
}

export default SearchBar;
