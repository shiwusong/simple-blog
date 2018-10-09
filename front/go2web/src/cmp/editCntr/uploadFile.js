import React, { Component } from 'react';
import { Row, Col, Modal, Upload, Button, Icon, message } from 'antd';
import Utils from '../../utils/utiles';
import copy from 'copy-to-clipboard';
import Style from './uploadFile.css';

export default class UploadFileCmp extends Component {
  constructor(){
    super();
    this.state = {
      fileList: [],
      fileData: [],
    }
  }

  componentDidMount() {
    this.listFile();
  }
  // list img
  listFile = () => {
    Utils.baseFetch({
      type: 'GET',
      url: '/go2web/file/list/FILE',
      success: res => {
        if(res.code < 300){
          this.setState({ fileData: res.data });
        }
      }
    })
  }

  copywrap = (e) => {
    const htmlStr =
`<div class="mdFile_wrap">
  <h2 class="h">相关下载</h1>
  <hr class="hr"/>
  <div class="bb">
    <div class="span">文件名</div>
    <div class="span">文件大小</div>
  </div>
</div>
`;
    copy(htmlStr);
    message.info('文件外层标签已经成功复制到剪切板！',1);
    this.props.handleCancel();
    return false;
  }

  // 赋值img标签到剪贴板
  copyHandle = (value) => {
    // console.log(url);
    const htmlStr = 
`<div class="bb">
    <div class="span">
      <a href="${value.url}">
      <img class="img" src="/images/下载.png" alt="上传"/>
        ${value.filename}
      </a>
    </div>
    <div class="span">${value.size}MB</div>
  </div>
`;
    copy(htmlStr);
    message.info('file标签已经成功复制到剪切板！',1);
    this.props.handleCancel();
  }

  // 上传文件
  upload = (file) => {

    let formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'));
    Utils.baseFetchFile({
      url: '/go2web/file/upload/FILE',
      formData,
      success: res => {
        console.log(res);
        this.listFile();
      }
    })
    return false;
  };

  itemFile = ()=>{
    let { fileData } = this.state;
    const items = [];
    fileData = fileData.map(value => {
      value.size = Math.floor(value.size/10000)/100.0;
      return value;
    })
    fileData.map(value => {
      items.push(
        <Col span={12} onClick={this.copyHandle.bind(this,value)} >
          <Row className={Style.filewrap}>
            <Col span={18}>{value.filename}</Col>
            <Col span={6}>{value.size}MB</Col>
          </Row>
        </Col>
      )
    })
    return items;
  }

  render() {
    let { visible, handleCancel } = this.props;
    const items = this.itemFile();
    const props = {
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
      beforeUpload: this.upload,
      fileList: this.state.fileList,
    };
    return (
      <Row>
        <Modal
          title="文件管理"
          visible={visible}
          footer = { null }
          onCancel={handleCancel}
          // bodyStyle={{height:'400px', overflow:'auto', width:'600px'}}
          width={640}
        >
          <Row style={{height:'400px', overflow:'auto', width:'600px'}}>
            <Row  style={{marginLeft:'10px', marginBottom:'10px'}}>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Select File
                </Button>
              </Upload>
              <span style={{cursor:'pointer',marginLeft:'10px'}} onClick={this.copywrap}>wrap</span>
            </Row>
            {items}
          </Row>
        </Modal>
      </Row>
    );
  }
}

UploadFileCmp.defaultProps = {
  visible: false,
  handleCancel: ()=>{},
}