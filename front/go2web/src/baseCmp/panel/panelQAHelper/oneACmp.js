import React, { Component } from 'react';
import {Row} from 'antd'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import Style from './oneACmp.css';
export default class OneACmp extends Component {
  constructor(){
    super();
    this.state = {
      visible:true
    }
  }

  items() {
    const items = [];
    const { data } = this.props;
    if (data.code != null && data.code != '') {
      items.push(
          <span className={Style.btn} onClick={()=>{this.setState({visible:!this.state.visible})}}>{this.state.visible?'隐藏代码':'查看代码'}</span>    
      )
      items.push(
        <CodeMirror
          className={this.state.visible?'':Style.hide}
          value={data.code}
          options={{
            mode: data.codeType,
            theme: 'eclipse',
            lineNumbers: true,
            readOnly: true
          }}
          onChange={(editor, data, value) => {
            this.setState({code:value})
          }}
        />
      )
    }
    

    return items;
  }
  render() {
    let value = "int a = 1;\na++;"
    const { data } = this.props;
    const items = this.items();
    return (
      <Row className={Style.row}>
          <Row>
            <div className={Style.left}>
              <img className={Style.userImg} src="/images/user.png" alt=""/>{data.userName}
            </div>
            <span className={Style.time}>回复时间：{data.createTime.substring(0,11)}</span>
          </Row>
          <Row className={Style.info}>
            {data.info}
          </Row>
          {items}
        </Row>
    );
  }
}