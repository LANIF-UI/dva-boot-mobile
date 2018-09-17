import React from 'react';
import { connect } from 'dva';
import Layout from 'components/Layout';
import BaseComponent from 'components/BaseComponent';
import InfiniteScroll from 'react-infinite-scroller';
import { List } from 'antd-mobile';
const Item = List.Item;
const { Content } = Layout;

@connect(({ machineRoom, loading }) => ({
  machineRoom,
  loading: loading.models.machineRoom
}))
export default class extends BaseComponent {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    const { dispatch, machineRoom } = this.props;
    const { pageData } = machineRoom;

    dispatch({
      type: 'machineRoom/@request',
      payload: {
        valueField: 'pageData',
        url: '/crud/getList',
        pageInfo: pageData.startPage(1, 20)
      },
      success: ({ pageData }) => {
        this.setState({
          data: pageData.list
        })
      }
    });
  }

  loadData = (page) => {
    const { dispatch, machineRoom } = this.props;
    const { pageData } = machineRoom;
    const { data } = this.state;

    this.setState({
      loading: true
    });

    dispatch({
      type: 'machineRoom/@request',
      payload: {
        valueField: 'pageData',
        url: '/crud/getList',
        pageInfo: pageData.jumpPage(page)
      },
      success: ({ pageData }) => {
        this.setState({
          data: data.concat(pageData.list)
        })
      }
    });
  };

  render() {
    const { loading, hasMore, data } = this.state;

    return (
      <Layout full className="machineRoom-page">
        <Content>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.loadData}
            hasMore={hasMore}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
            useWindow={false}
          >
            <List renderHeader={() => '机房列表'}>
              {data.map((item, index) => (
                <Item
                  key={index}
                  thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                  onClick={() => {}}
                  arrow="horizontal"
                >
                  {item.deptName}
                </Item>
              ))}
            </List>
          </InfiniteScroll>
        </Content>
      </Layout>
    );
  }
}
