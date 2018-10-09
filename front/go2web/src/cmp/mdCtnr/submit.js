import React, { Component } from 'react';

import {Row,Input, Upload,Button,Icon,Tabs,Select,message} from 'antd';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import Style from './submit.css';
import Utils from '../../utils/utiles';



const TabPane = Tabs.TabPane;
const Option = Select.Option;
const TextArea = Input.TextArea;
export default class SubmitCmp extends Component {
  constructor(){
    super();
    this.state = {
      visible:false,
      mode:'javascript',
      fileList: [],
      imgPath: '',
      code: '',
      info: '',
      title: '',
    }
  }


  // 我要提问
  wantQuestion() {
    // 先判断是否登陆
    const token =  Utils.getCookie('token');
    
    // 如果登陆了就显示
    if (token != null & token != '')
      this.setState({
        visible:true,
      })
    else message.error('请先登陆');
  }

  // 提交
  submit() {
    const { mdid } = this.props;
    if (mdid == null) return; // emmm ，一般不会触发这个，可能有点多余
    const { mode, code, info, title, imgPath } = this.state;
    console.log(mode, code, info, title, imgPath);
    Utils.baseFetch({
      type: 'POST',
      url: '/go2web/comment/submitQ',
      data: {
        mode, code, info, title, imgPath, mdid
      },
      success: res => {
        console.log(res);
        //
        if (res.code < 300) {
          message.info('提交成功', 1);
          this.setState({
            visible: false,
          })
          this.props.success();
        }
      }
    })
  }


  render() {
    let {visible, code, info, imgPath} = this.state;
    const { titleInfo, mdid } = this.props;
    let uploadProps = {
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        // 上传图片
        let formData = new FormData();
        formData.append('file', file);
        Utils.baseFetchFile({
          url: '/go2web/file/upload/IMG',
          formData,
          success: res => {
            console.log(res);
            if (res.code < 300)
            this.setState({
              imgPath: res.data.filePath
            })
          }
        })
        this.setState(({ fileList }) => ({
          fileList: [file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    }
    // 显示图片上传成功的标志
    const imgIcon = [];
    if (imgPath == '' || imgPath == null){
      imgIcon.push(
        <Icon type="question-circle" theme="outlined" />
      )
    } else {
      imgIcon.push(
        <Icon style={{color:'green'}} type="check-circle" theme="outlined" />
      )
    }
    return (
      <Row>
        <button className={[Style.btn,visible?Style.hide:''].join(' ')} onClick={this.wantQuestion.bind(this)} >我要提问</button>
        <Row className={[Style.wrap,visible?'':Style.hide].join(' ')}>
          <Row>
            <div style={{lineHeight:'34px',float:'left'}}>关于<span className={Style.fontI}>{titleInfo}</span>的提问</div>
            <button className={Style.btnX} onClick={()=>{this.setState({visible:false})}}>X</button>
          </Row>
          <Input 
            onChange={(e)=>{this.setState({title:e.target.value})}}
            style={{margin:'20px 0px 20px 0px'}} placeholder="标题：简要描述您的问题"></Input>
          <Upload {...uploadProps}>
            <Button style={{backgroundColor:'#31b0d5',color:'white'}} >
              <Icon type="upload" /> 上传截图
            </Button>
            <span style={{padding:'0px 10px 0px 10px', fontSize:'18px'}}>
              {imgIcon}
            </span> 
          </Upload>
          <div style={{height:'10px'}}></div>
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
                  mode: this.state.mode,
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
        </Row>
      </Row>
    );
  }
}