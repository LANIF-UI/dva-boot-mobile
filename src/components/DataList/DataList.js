import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Checkbox } from 'antd-mobile';
import assign from 'object-assign';
import isEqual from 'react-fast-compare';
import PageHelper from '@/utils/pageHelper';
import './style/index.less';
const CheckboxItem = Checkbox.CheckboxItem;
const ListItem = List.Item;

class DataList extends Component {
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
    dataSource: PageHelper.create(),
    pageStart: 1,
    pageSize: 50,
    rowKey: 'id',
    initialLoad: false,
    useWindow: false
  };

  constructor(props) {
    super(props);
    const { dataSource } = props;
    this.state = {
      dataList: dataSource.list,
      dataSource: dataSource,
      loading: false,
      hasMore: true
    };
  }

  componentDidMount() {
    const { loadData, initialLoad } = this.props;
    if (!initialLoad && loadData) {
      this.onLoaderMore(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource, loadData } = nextProps;
    if (!isEqual(this.props.dataSource, dataSource)) {
      const newState = {};
      if (!loadData && dataSource) {
        newState.dataSource = dataSource;
        newState.dataList = this.props.dataList.concat(dataSource.list);
        this.setState(newState);
      }
    }
  }

  onLoaderMore = async pageNum => {
    const { loadData, pageSize } = this.props;
    const { dataSource, dataList } = this.state;

    if (pageNum > dataSource.totalPages && pageNum !== 1) {
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }

    if (loadData) {
      this.setState({
        loading: true
      });

      const newDataSource = await loadData(
        dataSource.jumpPage(pageNum, pageSize)
      );

      const mergeDataSource = assign(dataSource, newDataSource);
      this.setState({
        loading: false,
        dataSource: mergeDataSource,
        dataList: dataList.concat(mergeDataSource.list)
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
      render
    } = this.props;
    if (renderItem) {
      return renderItem(item);
    } else if (selectType === 'checkbox') {
      return (
        <CheckboxItem key={item[rowKey]} onChange={() => onChange(item)}>
          {render ? render(item) : item[titleKey]}
        </CheckboxItem>
      );
    } else if (selectType === 'radio') {
    } else {
      return (
        <ListItem
          key={item[rowKey]}
          onClick={() => onChange(item)}
          arrow="horizontal"
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
      loadMore: this.onLoaderMore,
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
      <i className="text">加载中</i>
      <div className="dot right one" />
      <div className="dot right two" />
      <div className="dot right three" />
    </div>
  </div>
);
