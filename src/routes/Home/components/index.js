import React from 'react';
import { connect } from 'dva';
import logo from 'assets/images/logo.png';
import './style.less';
import BaseComponent from 'components/BaseComponent';
import $$ from 'cmn-utils';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

@connect()
export default class Home extends BaseComponent {
  noticeIt = (e) => {
    this.close = this.notice[e.target.innerText](e.target.innerText);
  }

  closeNotice = () => {
    this.notice.close();
  }

  render() {
    const user = $$.getStore('user');
    
    return ( 
      <div className="home-page">
        <img src={logo} alt="" />
        <div>Welcome Home {user.name}</div>
        <hr />
        <WingBlank>
          <Button type="primary" onClick={this.noticeIt}>success</Button><WhiteSpace />
          <Button type="warning" onClick={this.noticeIt}>error</Button><WhiteSpace />
          <Button onClick={this.noticeIt}>warn</Button><WhiteSpace />
          <Button onClick={this.closeNotice}>close</Button><WhiteSpace />
        </WingBlank>
      </div>
    )
  }
}