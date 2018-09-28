import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Checkbox } from 'antd-mobile';
import assign from 'object-assign';
import PageHelper from '@/utils/pageHelper';
import './style/index.less';
const CheckboxItem = Checkbox.CheckboxItem;
const ListItem = List.Item;

class DataList extends Component {
  static Item = ListItem;

  static propTypes = {
    /**
     * 数据源 PageInfo
     */
    dataSource: PropTypes.object,
    /**
     * 获取下一页数据，Promise
     */
    loadData: PropTypes.func,
    /**
     * 初始时是否自动加载第一页数据
     */
    initialLoad: PropTypes.bool,
    /**
     * 多选/单选，checkbox 或 radio
     */
    selectType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /**
     * 指定选中项的 key 数组
     */
    selectedKeys: PropTypes.array,
    /**
     * 外部获取数据接口
     */
    onChange: PropTypes.func,
    /**
     * 从第几页开始
     */
    pageStart: PropTypes.number,
    /**
     * 每页多少条
     */
    pageSize: PropTypes.number,
    /**
     * 每行的id
     */
    rowKey: PropTypes.string,
    /**
     * antd-mobile List
     */
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,

    /**
     * 自定义渲染样式,包括ListItem CheckboxItem要自已指定
     */
    renderListItem: PropTypes.func,

    /**
     * 自定义渲染ListItem下的元素
     */
    render: PropTypes.func,
    /**
     * Add scroll listeners to the window, or else, the component's
     */
    useWindow: PropTypes.bool
  };

  static defaultProps = {
    pageStart: 1,
    pageSize: 30,
    rowKey: 'id',
    initialLoad: false,
    useWindow: false
  };

  constructor(props) {
    super(props);
    const { dataSource, pageStart, pageSize } = props;

    this.state = {
      dataList: dataSource ? dataSource.list : [],
      dataSource:
        dataSource.startPage(pageStart, pageSize) ||
        PageHelper.create(pageStart, pageSize),
      loading: false,
      hasMore: true
    };
  }

  componentDidMount() {
    const { loadData, initialLoad } = this.props;
    if (!initialLoad && loadData) {
      this.onLoaderMore();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    if (this.props.dataSource !== dataSource) {
      if (dataSource) {
        this.setState({
          dataSource
        }, () => {
          this.onLoaderMore(true);
        })
      }
    }
  }

  onLoaderMore = async isReload => {
    const { loadData } = this.props;
    const { dataSource, dataList } = this.state;

    if (loadData) {
      this.setState({
        loading: true,
        hasMore: true
      });

      const newDataSource = await loadData(dataSource.nextPage());

      if (isReload) {
        const element = ReactDOM.findDOMNode(this);
        element.parentNode.scrollTop = 0;
      }

      const mergeDataSource = assign(dataSource, newDataSource);
      this.setState({
        loading: false,
        hasMore: mergeDataSource.hasNext(),
        dataSource: mergeDataSource,
        dataList: isReload
          ? mergeDataSource.list
          : dataList.concat(mergeDataSource.list)
      });
    }
  };

  renderItem = item => {
    const {
      renderItem,
      rowKey,
      titleKey,
      selectType,
      onChange,
      render,
      arrow
    } = this.props;

    if (renderItem) {
      return renderItem(item);
    } else if (selectType === 'checkbox') {
      return (
        <CheckboxItem
          key={item[rowKey]}
          onChange={onChange ? () => onChange(item) : null}
        >
          {render ? render(item) : item[titleKey]}
        </CheckboxItem>
      );
    } else if (selectType === 'radio') {
    } else {
      return (
        <ListItem
          key={item[rowKey]}
          onClick={onChange ? () => onChange(item) : null}
          arrow={arrow === false ? false : 'horizontal'}
        >
          {render ? render(item) : item[titleKey]}
        </ListItem>
      );
    }
  };

  render() {
    const {
      renderHeader,
      renderFooter,
      initialLoad,
      useWindow,
      pageStart
    } = this.props;
    const { loading, hasMore, dataList } = this.state;
    const infiniteScrollProps = {
      className: 'antui-datalist',
      initialLoad,
      useWindow,
      pageStart,
      loadMore: () => this.onLoaderMore(),
      hasMore: !loading && hasMore
    };

    return (
      <InfiniteScroll {...infiniteScrollProps}>
        <List renderHeader={renderHeader} renderFooter={renderFooter}>
          {dataList.map(item => this.renderItem(item))}
          {loading && hasMore && <Loading />}
        </List>
      </InfiniteScroll>
    );
  }
}

export default DataList;

const Loading = () => (
  <div className="loading-container">
    <div className="loading">
      <div className="dot left three" />
      <div className="dot left two" />
      <div className="dot left one" />
      <i className="text dot"></i>
      <div className="dot right one" />
      <div className="dot right two" />
      <div className="dot right three" />
    </div>
  </div>
);
/**
 * 操作区 阻止向上冒泡
 */
const Oper = (prop) => (
  <div className="datalist-row-button" onClick={e => e.stopPropagation()}>
    {prop.children}
  </div>
);
DataList.Oper = Oper;
