import React, { Component } from 'react';
import { Row, Modal, Button, Icon, message, Select, Steps, Col, Input } from 'antd';
import Style from './submit.css'; 
import Utils from '../../utils/utiles';
const Step = Steps.Step;
const Option = Select.Option;
export default class SubmitCmp extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      catalog1: '',
      catalog2: '',
      index: '',
      catalogData: [],
    }

  }

  componentDidMount(){
    Utils.baseFetch({
      type:'get',
      url:'/go2web/catalogList/user',
      success: res => {
        if (res.code <300){
          this.setState({
            catalogData : res.data,
          })
          if (res.data.length > 0)
          this.setState({
            catalog1: res.data[0].id,
          })
          if (res.data[0].subCatalogs.length > 0){
            const tmp = res.data[0].subCatalogs;
            this.setState({
              catalog2: tmp[0].id,
              index: tmp[tmp.length-1].index+1,
            })
          }
          
        }
        
      }
    })
  }

  // 一级目录改变
  catalogChange(value) {
    let catalog2 = '';
    let index = 0;
    this.state.catalogData.map(_value => {
      console.log(_value);
      
      if (_value.id == value) {
        if (_value.subCatalogs.length > 0) {
          catalog2 = _value.subCatalogs[0].id;
          index = _value.subCatalogs[_value.subCatalogs.length - 1].index + 1;
        }
      }
    })
    this.setState({catalog1: value, catalog2, index});
  }

  // 提交
  submit() {
    const md = this.props.md;
    const { title, catalog1, catalog2, index } = this.state;
    // if (md == '') {
    //   return message.error('文章内容不能为空',1);
    // }
    if (title == '') {
      return message.error('标题不能为空',1);
    }
    if (catalog2 == '' || isNaN(catalog2)) {
      return message.error('请选择有效的目录',1);
    }
    if (index == '' || isNaN(index)) {
      return message.error('请输入有效的排序级别',1);
    }
    Utils.baseFetch({
      type: 'POST',
      url: '/go2web/md/save',
      data: {
        catalogId: catalog2,
        title,
        md,
        index,
      },
      success: res => {
        // console.log(res);
        if (res.code < 300) {
          message.info('提交成功！', 1);
          this.props.handleCancel();
        }
      }
    })
  }

  

  render() {
    const { title, catalog1, catalog2, index, catalogData } = this.state;
    const { visible, handleCancel, md } = this.props;
    let items1 = [], items2 = [];
    catalogData.map(value => {
      items1.push(
        <Option value={value.id}>{value.name}</Option>
      )
      if (value.id == catalog1) {
        value.subCatalogs.map(value =>{
          items2.push(
            <Option value={value.id}>{value.name}</Option>
          )
        })
      }
    })
    
    return (
      <Row>
      <Modal
        title="文章提交"
        visible={visible}
        footer = { null }
        onCancel={handleCancel}
        // bodyStyle={{height:'400px', overflow:'auto', width:'600px'}}
      >
        <Row className={Style.row}>
          <div className={Style.col1}>标题：</div>
          <div className={Style.col2}>
            <Input style={{width:'180px'}} onChange={e=>{this.setState({title:e.target.value})} }/>
          </div>
        </Row>
        <Row className={Style.row}>
          <div className={Style.col1}>一级目录：</div>
          <div className={Style.col2}>
            <Select
              onChange={e=>{this.catalogChange(e)}}
              style={{width:'180px'}} value={catalog1}>
              {items1}
            </Select>
          </div>
        </Row>
        <Row className={Style.row}>
          <div className={Style.col1}>二级目录：</div>
          <div className={Style.col2}>
            <Select 
              onChange={e=>{this.setState({catalog2:e})}}
              style={{width:'180px'}} value={catalog2}>
              {items2}
            </Select>
          </div>
        </Row>
        <Row className={Style.row}>
          <div className={Style.col1}>排序：</div>
          <div className={Style.col2}>
            <Input value={index} onChange={e=>{this.setState({index:e.target.value})}} style={{width:'40px'}}/>
          </div>
        </Row>
        <br/>
        <Row style={{textAlign:'right'}}>
          <Button onClick={this.submit.bind(this)} type="primary">提交</Button>
        </Row>
      </Modal>
    </Row>
    );
  }
}

SubmitCmp.defaultProps = {
  visible: false,
  handleCancel: ()=>{},
  md: '',
}