import React from 'react';
import { connect } from 'dva';
import Layout from 'components/Layout';
import BaseComponent from 'components/BaseComponent';
import DataList from 'components/DataList';
import PageHelper from '@/utils/pageHelper';
import $$ from 'cmn-utils';
const { Content } = Layout;

@connect(({ machineRoom, loading }) => ({
  machineRoom,
  loading: loading.models.machineRoom
}))
export default class extends BaseComponent {
  state = {
    selectType: null
  };

  componentDidMount() {
  }

  loadData1 = page => {
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
        });
      }
    });
  };

  loadData = pageInfo => {
    return $$.post('/crud/getList', PageHelper.requestFormat(pageInfo))
      .then(resp => {
        return PageHelper.responseFormat(resp);
      })
      .catch(e => console.error(e));
  };

  onChange = item => {
    console.log(item)
  }

  render() {
    const { selectType } = this.state;
    return (
      <Layout full className="machineRoom-page">
        <Content>
          <DataList
            rowKey="id"
            titleKey="id"
            selectType={selectType}
            loadData={this.loadData}
            onChange={this.onChange}
          />
        </Content>
      </Layout>
    );
  }
}
