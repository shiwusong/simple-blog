import React, { Component } from 'react';
import {Row,Icon,Col, message} from 'antd';
import {UnControlled as CodeMirror} from 'react-codemirror2'

import UploadImgCmp from './uploadImg';
import UploadFileCmp from './uploadFile';
import SubmitCmp from './submit';

import Style from './editCntr.css';
import Utils from '../../utils/utiles';
const marked = require('marked');
const hljs = require('highlight.js');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: (code)=>{
    return hljs.highlightAuto(code).value;
  },
});
export default class EditCntr extends Component {
  constructor(){
    super();
    this.state = {
      imgModalVisible: false,
      fileModalVisible: false,
      submitModalVisible: false,
      mdStr: '',
      _mdStr: '',
      htmlStr: '',
    }
  }

  componentDidMount(){
    const authority = Utils.getCookie('authority');
    if(authority != '1') {
      this.props.history.push('/index');
      return;
    }
    Utils.baseFetch({
      type: 'GET',
      url: '/go2web/tmd/get',
      success: res => {
        
        if (res.code == 200) {
          this.setState({
            mdStr: res.data.md,
            _mdStr: res.data.md,
            htmlStr: marked(res.data.md),
          })
        }
        
      }
    })
  }

  // 保存tmd的更改
  saveTmd = () => {
    let { mdStr } = this.state;
    Utils.baseFetch({
      type: 'POST',
      url: '/go2web/tmd/save',
      data: { md: mdStr},
      success: res => {
        if (res.code == 200) {
          message.info('保存成功！',1);
        }
        
      }
    })
    
  }


  render() {
    let { imgModalVisible, fileModalVisible, submitModalVisible } = this.state;
    let { mdStr, _mdStr, htmlStr } = this.state;
    return (
      <Row className={Style.wrap}>
        <Row>
          <button className={Style.btn}>导入md</button>
          <button className={Style.btn} onClick={()=>{ this.setState({ imgModalVisible: true }) }}>
            <Icon type="plus" theme="outlined" /> 图片</button>
          <button className={Style.btn} onClick={()=>{ this.setState({ fileModalVisible: true })}}>
            <Icon type="plus" theme="outlined" /> 文件</button>
          <button className={Style.btn} onClick={()=>{
            const win = window.open('/index/tmd', '_blank');
            win.focus();
          }} ><Icon type="login" theme="outlined" /> 预览</button>

          <button onClick={()=>{this.setState({submitModalVisible:true})}} 
            className={Style.btn} style={{float:'right'}}> 提交</button>
          <button className={Style.btn} style={{float:'right'}}
            onClick={this.saveTmd}> 保存</button>
        </Row>
        <Row>
          <Col span={12} className={[Style.col,"mirror"].join(' ')}>
            <CodeMirror
              value={_mdStr}
              options={{
                mode: "markdown",
                theme: 'monokai',
                lineNumbers: true,
                scrollbarStyle:'overlay',
                styleActiveLine:true,
                // readOnly: true
              }}
              onChange={(editor, data, value) => {
                this.setState({
                  mdStr: value,
                  htmlStr:marked(value)
                })
              }}
            />
          </Col>
          <Col className={Style.Col} span={12}>
              <div dangerouslySetInnerHTML={{ __html: htmlStr }}></div>
          </Col>
        </Row>
        <UploadImgCmp visible={imgModalVisible} handleCancel={()=>{this.setState({ imgModalVisible: false })}}/>
        <UploadFileCmp visible={fileModalVisible} handleCancel={()=>{this.setState({ fileModalVisible: false })}}/>
        <SubmitCmp visible={submitModalVisible} md={mdStr} handleCancel={()=>{this.setState({ submitModalVisible: false })}}/>
      </Row>
    );
  }
}