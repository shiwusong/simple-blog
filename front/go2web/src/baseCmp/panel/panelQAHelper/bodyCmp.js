import React, { Component } from 'react';
import {Icon, Row, Tabs} from 'antd';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import Style from './bodyCmp.css';

const TabPane = Tabs.TabPane;
export default class BodyCmp extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     code:''
  //   }
  // }

  items() {
    const items = [];
    const { data } = this.props;
    const _items = [];
    if (data.info != null && data.info != '') {
      _items.push(
        <TabPane className={Style.tabPane} tab="描述" key="1">
          {data.info}
        </TabPane>
      )
    }
    if (data.code != null && data.code != '') {
      _items.push(
        <TabPane className={Style.tabPane} tab="代码" key="2">
            <CodeMirror
              value={data.code}
              options={{
                mode: data.codeType,
                theme: 'eclipse',
                lineNumbers: true,
                readOnly: true
              }}
              // onChange={(editor, data, value) => {
              //   this.setState({code:value})
              // }}
            />
          </TabPane>
      )
    }
    if (data.imgPath != null && data.imgPath != '') {
      _items.push(
        <TabPane className={Style.tabPane} tab="截图" key="3">
          <img className={Style.img} src={data.imgPath} alt=''/>
        </TabPane>
      )
    }

    items.push(
      <Tabs type="card">
        {_items}    
      </Tabs>
    )
    return items;
  }

  render() {
    const items = this.items();

    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div>
        {items}
      </div>
    );
  }
}