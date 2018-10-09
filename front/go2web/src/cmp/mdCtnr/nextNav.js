import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon ,Row} from 'antd';

import Style from './nextNav.css';
export default class NextCmp extends Component {
  render() {
    const {leftName,leftUrl,rightName,rightUrl} = this.props;
    const styleLeft = leftName==null?Style.hide:Style.left;
    const styleRight = rightName==null?Style.hide:Style.right;
    return (
      <Row className={Style.wrap}>
        <Link className={styleLeft} to={leftUrl}><Icon type="caret-left" theme="outlined" />{leftName}</Link>
        <Link className={styleRight} to={rightUrl}>{rightName}<Icon type="caret-right" theme="outlined" /></Link>
      </Row>
    );
  }
}
NextCmp.defaultProps = {
  leftName:null,
  leftUrl:'/',
  rightName:null,
  rightUrl:'/'
}