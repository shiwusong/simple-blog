import React, { Component } from 'react';
import { Row, Modal, Upload, Button, Icon, message } from 'antd';
import Utils from '../../utils/utiles';
import copy from 'copy-to-clipboard';
import Style from './uploadImg.css';

export default class UploadImgCmp extends Component {
  constructor(){
    super();
    this.state = {
      fileList: [],
    }
  }

  componentDidMount() {
    this.listImg();
  }
  // list img
  listImg = () => {
    Utils.baseFetch({
      type: 'GET',
      url: '/go2web/file/list/IMG',
      success: res => {
        if(res.code < 300){
          const data = res.data.map(value => {
            value.key = value.id;
            value.uid = value.id;
            return value;
          })
          
          this.setState({ fileList: data });
        }
      }
    })
  }

  // 赋值img标签到剪贴板
  handlePreview = (file) => {
    const img = `<img src="${file.url}" style="height:500px;width:500px;" alt=""/>`;
    copy(img);
    message.info('img标签已经成功复制到剪切板！',1);
    this.props.handleCancel();
  }

  // 删除图片
  remove = file => {
    console.log(file);
  }
  // 上传图片
  upload = (file) => {
    console.log(file);
    let formData = new FormData();
    formData.append('file', file);


    Utils.baseFetchFile({
      url: '/go2web/file/upload/IMG',
      formData,
      success: res => {
        console.log(res);
        this.listImg();
      }
    })
    
    this.setState(({ fileList }) => ({
      fileList: [...fileList, file],
    }));
    return false;
  };

  render() {
    let { visible, handleCancel } = this.props;
    const { fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Row>
        <Modal
          title="图片管理"
          visible={visible}
          footer = { null }
          onCancel={handleCancel}
          // bodyStyle={{height:'400px', overflow:'auto', width:'600px'}}
          width={640}
        >
          <Row style={{height:'400px', overflow:'auto', width:'600px'}}>
          <Upload
            // action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={[]}
            beforeUpload= {this.upload}
          >
            {uploadButton}
          </Upload>
          {/* 显示图片区域 */}
          <Upload
            // action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onRemove={this.remove}
          >
          </Upload>
          </Row>
        </Modal>
      </Row>
    );
  }
}

UploadImgCmp.defaultProps = {
  visible: false,
  handleCancel: ()=>{},
}