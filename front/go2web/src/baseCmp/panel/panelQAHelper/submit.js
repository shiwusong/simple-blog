import React, { Component } from 'react';
import Style from './submit.css'
import { Tabs, Select, Input, Row, COl, message } from 'antd';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import Utils from '../../../utils/utiles';
import MyEvent from '../../../utils/event';

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const TextArea = Input.TextArea;
export default class SubmitCmp extends Component {
  constructor(){
    super();
    this.state = {
      code: '',
      mode: 'javascript',
      info: '',
      visible: false,
    }
  }

  // 我要提问
  wantQuestion() {
    if(this.state.visible) {
      this.setState({
        visible: false,
      });
      return;
    }

    // 先判断是否登陆
    const token =  Utils.getCookie('token');
    // 如果登陆了就显示
    if (token != null & token != '')
      this.setState({
        visible:true,
      })
    else message.error('请先登陆');
  }

  submit(){
    const { code, mode, info } = this.state;
    const { data } = this.props;
    console.log(data.id);
    console.log(code,mode,info);
    Utils.baseFetch({
      type:'POST',
      url:'/go2web/comment/submitA',
      data: {
        commentQId: data.id,
        mode, info, code,
      },
      success:res => {
        MyEvent.emit("RefreshMdQA");
        this.setState({
          visible: false,
        });
      }
    })
    
  }


  render() {
    const { code, mode, info, visible } = this.state;

    
    return (
      <Row>
        <button onClick={this.wantQuestion.bind(this)} className={Style.addA}>{visible?'隐藏':'添加答案'}</button>
        <div className={[Style.wrap,visible?'':Style.hide].join(' ')}>
        {/* 描述和代码 */}
        <Tabs type="card">
            <TabPane className={Style.tabPane} tab="描述" key="1">
              <TextArea
               onChange={(e)=>{this.setState({info:e.target.value})}}
               rows={13}></TextArea>
            </TabPane>
            <TabPane className={Style.tabPane} tab="代码" key="2">
              {/* 代码类型选择 */}
              <Row style={{marginBottom:'8px'}}>
                <span>语言类型： </span>
                <Select style={{width:'150px'}} defaultValue="javascript" onChange={(e)=>{console.log(this.setState({mode:e}))}}>
                  {/* <Option value="xml">xml</Option> */}
                  <Option value="css">css</Option>
                  <Option value="javascript">javascript</Option>
                  <Option value="htmlmixed">html</Option>
                  <Option value="python">python</Option>
                  <Option value="text/x-c++src">c/c++</Option>
                  <Option value="text/x-java">java</Option>
                  <Option value="text/x-mysql">mysql</Option>
                </Select>
              </Row>
              
              <CodeMirror
                options={{
                  mode,
                  theme: 'monokai',
                  lineNumbers: true,
                  scrollbarStyle:'overlay',
                  styleActiveLine:true,
                  // readOnly: true
                }}
                onChange={(editor, data, value) => {
                  this.setState({code:value})
                }}
              />
            </TabPane>
          </Tabs>
          <button onClick={this.submit.bind(this)} className={Style.btn}>提交</button>
      </div>
      </Row>
      
    );
  }
}