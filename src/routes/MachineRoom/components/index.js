import React from 'react';
import { connect } from 'dva';
import Layout from 'components/Layout';
import BaseComponent from 'components/BaseComponent';
import SearchBox from 'components/SearchBox';
import DataList from 'components/DataList';
import PageForm from 'components/Pages/PageForm';
import PageHelper from '@/utils/pageHelper';
import $$ from 'cmn-utils';
import columns from './columns';
import { Button } from 'antd-mobile';
import './index.less';
const { Header, Content } = Layout;
const { Oper } = DataList;

@connect(({ machineRoom, loading }) => ({
  machineRoom,
  loading: loading.models.machineRoom
}))
export default class extends BaseComponent {
  state = {
    selectType: null,
    dataSource: PageHelper.create(1, 30),
    visible: false
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
    console.log(values);
    this.setState({
      dataSource: PageHelper.create(1, 30)
        .filter(values)
        .jumpPage(1)
    });
  };

  onSubmit = values => {};

  onCheck = record => {
    this.setState({
      record,
      visible: true
    });
  };

  render() {
    const { dispatch } = this.props;
    const { selectType, dataSource, visible } = this.state;
    const { record } = this.state;
    const pageFormProps = {
      title: '机房巡检',
      record,
      columns,
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        });
      },
      onSubmit: values => {
        console.log(values);
        dispatch({
          type: 'machineRoom/@request',
          payload: [
            {
              notice: true,
              url: '/crud/save',
              data: values
            }
          ],
          success: () => {
            this.setState({
              record: null,
              visible: false
            });
          }
        });
      }
    };

    return (
      <Layout full className="machineRoom-page">
        <Header>
          <SearchBox goBack columns={columns} onSearch={this.onSearch} />
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
                <Oper>
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={e => this.onCheck(item)}
                  >
                    巡检
                  </Button>
                  <Button type="ghost" size="small" inline>
                    设备
                  </Button>
                </Oper>
              </div>
            )}
          />
        </Content>
        {visible && <PageForm {...pageFormProps} />}
      </Layout>
    );
  }
}
