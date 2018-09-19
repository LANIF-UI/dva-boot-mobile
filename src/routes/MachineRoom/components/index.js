import React from 'react';
import { connect } from 'dva';
import Layout from 'components/Layout';
import BaseComponent from 'components/BaseComponent';
import SearchBox from 'components/SearchBox';
import DataList from 'components/DataList';
import PageHelper from '@/utils/pageHelper';
import $$ from 'cmn-utils';
import columns from './columns';
import { Button } from 'antd-mobile';
import './index.less';
const { Header, Content } = Layout;

@connect(({ machineRoom, loading }) => ({
  machineRoom,
  loading: loading.models.machineRoom
}))
export default class extends BaseComponent {
  state = {
    selectType: null,
    dataSource: PageHelper.create()
  };

  componentDidMount() {}

  loadData = pageInfo => {
    return $$.post('/crud/getList', PageHelper.requestFormat(pageInfo))
      .then(resp => {
        return PageHelper.responseFormat(resp);
      })
      .catch(e => console.error(e));
  };

  onChange = item => {
    console.log(item);
  };

  onSearch = values => {
    this.setState({
      dataSource: PageHelper.create().filter(values).jumpPage(1)
    })
  }

  render() {
    const { selectType, dataSource } = this.state;
    return (
      <Layout full className="machineRoom-page">
        <Header>
          <SearchBox columns={columns} onSearch={this.onSearch} />
        </Header>
        <Content>
          <DataList
            rowKey="id"
            titleKey="deptName"
            selectType={selectType}
            dataSource={dataSource}
            loadData={this.loadData}
            arrow={false}
            render={item => (
              <div className="machine-list-item">
                {item.status === '0' ? (
                  <div className="icon warning">异常</div>
                ) : (
                  <div className="icon">正常</div>
                )}

                <div className="title nobr">{item.deptName}</div>
                <div className="action">
                  <Button type="primary" onClick={e => {
                    e.stopPropagation();
                  }} size="small" inline style={{ marginRight: '4px' }}>
                    巡检
                  </Button>
                  <Button type="ghost" size="small" inline>
                    设备
                  </Button>
                </div>
              </div>
            )}
          />
        </Content>
      </Layout>
    );
  }
}
