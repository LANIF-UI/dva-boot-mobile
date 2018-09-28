import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';
import Form from '../Form';
import Layout from '../Layout';
import cx from 'classnames';
import './index.less';
const { Header, Content } = Layout;

class PageForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    record: PropTypes.object,
    columns: PropTypes.array,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    formOpts: PropTypes.object,
    className: PropTypes.string
  };

  closeModal = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
      return;
    }
    this.setState({
      visible: false
    });
  };

  onSubmit = () => {
    const { record, onSubmit } = this.props;
    this.refs.form.validateFields((error, value) => {
      if (error) {
        console.log(error);
        return;
      }
      onSubmit && onSubmit(value, record);
    });
  };

  render() {
    const {
      title,
      record,
      className,
      columns,
      onCancel,
      onSubmit,
      formOpts,
      full,
      preview
    } = this.props;

    const classname = cx(className, 'antui-pageform', { 'full-modal': full });

    const formProps = {
      ref: 'form',
      columns,
      onSubmit,
      record,
      preview,
      ...formOpts
    };

    return (
      <Layout className={classname} full>
        <Header>
          <NavBar
            leftContent="取消"
            onLeftClick={onCancel}
            rightContent={
              <div className="nav-bar-rightContent" onClick={this.onSubmit}>
                保存
              </div>
            }
            mode="light"
          >
            {title}
          </NavBar>
        </Header>
        <Content>
          <Form {...formProps} />
        </Content>
      </Layout>
    );
  }
}

export default PageForm;
