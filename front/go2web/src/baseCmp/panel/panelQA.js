import React, { Component } from 'react';
import {Icon, Row} from 'antd';
import {Link} from 'react-router-dom';
import Style from './panelQA.css';

import BodyCmp from './panelQAHelper/bodyCmp';
import ACmp from './panelQAHelper/aCmp';
import SubmitCmp from './panelQAHelper/submit';

export default class PanelQACmp extends Component {
  constructor(){
    super();
    this.state = {
      visible:false,
    }
  }


  render() {
    let {headerColor, data } = this.props;
    return (
      <div>
        {/* 头部内容 */}
        <div className={Style.header} onClick={()=>{this.setState({visible:!this.state.visible})}} style={{backgroundColor:headerColor}}>
          <div className={Style.time}>{data.createTime.substring(0,11)}</div>
          <span className={Style.title}>
            <Icon type="question-circle" style={{fontWeight:100,marginRight:5}} theme="filled" />
              {data.title}
          </span>
          <img className={Style.rightNavImg} src={this.state.visible?"/images/最小化.png":"/images/全屏.png"} alt=""/>
          {/* <img className={Style.rightNavImg} src="/images/最小化.png" alt=""/> */}
        </div>
        {/* 主体内容 */}
        <div className={[Style.body,this.state.visible?'':Style.hide].join(' ')}>
          {/* {React.Children.map(this.props.children,(child,i)=>{return child})} */}

          <Row style={{padding:15}}>
            <div><img className={Style.userImg} src="/images/user.png" alt=""/><span>123123</span></div>
            <div style={{height:10}}/>
            <BodyCmp data={data}/>
            <ACmp data={data.answers}/>
            {/* <button className={Style.addA}>添加答案</button> */}
            <SubmitCmp data={data}/>
          </Row>
        </div>
      </div>
    );
  }
}
PanelQACmp.defaultProps = {
  headerColor: '#f5f5f5',
  // headerColor: '#fcf8e3',
  data:[],
}
//
// 标题
// 用户名
// 问题 | 截图 | 代码
// 回复{用户名 | 时间 | 回复 | 代码}