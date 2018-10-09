import React, { Component } from 'react';
import {Row} from 'antd';
import {Link} from 'react-router-dom';
import PanelSiderbarCmp from '../../baseCmp/panel/panelSidebar';
import PanelNavCmp from '../../baseCmp/panel/panelNav';
import NextNavCmp from './nextNav';
import PanelQACmp from '../../baseCmp/panel/panelQA';
import SubmitCmp from "./submit";
import Utils from '../../utils/utiles';
import utiles from '../../utils/utiles';
import MyEvent from '../../utils/event';

export default class MdCtnr extends Component {
  constructor() {
    super();
    this.state= {
      id: null,
      mid: null,
      upCatalog: {},
      curCatalog: {},
      mds: [],
      curMd: null,
      QAData: [],
    }
  }

  componentDidMount() {
    // this.initData();
    MyEvent.on("RefreshMdQA", this.initQAData.bind(this));
  }
  

  initData() {
    const { id, mid } = this.props.match.params;
    
    // 获取列表
    Utils.baseFetch({
      type: 'POST',
      url: '/go2web/md/list/'+id,
      success: res => {
        console.log(res);
        
        if(res.code >= 300) {
          return;
        }
        this.setState({
          upCatalog: res.data.upCatalog,
          curCatalog: res.data.curCatalog,
          mds: res.data.mds,
          id,
        })
        if (mid == null) {
          if (res.data.mds.length > 0){
            Utils.baseFetch({
              type: 'POST',
              url: '/go2web/md/get/'+res.data.mds[0].id,
              success: res => {
                if (res.code < 300)
                  this.setState({
                    curMd: res.data,
                    mid: res.data.id,
                  })
                  this.initQAData(res.data.id);
              }
            })
          }
        }
      }
    })
    // 获取md
    if(mid != null) {
      Utils.baseFetch({
        type: 'POST',
        url: '/go2web/md/get/'+mid,
        success: res => {
          if (res.code < 300)
            this.setState({
              curMd: res.data,
              mid,
            })
            this.initQAData(res.data.id);
        }
      })
    }
  }

  initQAData(mdid) {
    if (mdid == null) mdid = this.state.mid;
    utiles.baseFetch({
      type: 'GET',
      url: '/go2web/comment/listQA/' + mdid,
      success: res => {
        if (res.code < 300) {
          this.setState({
            QAData: res.data,
          })
        }
      }
    })
    
  }
  // 当路由变化时， 判断一下是否重新加载数据
  refresh() {
    const { id, mid } = this.props.match.params;
    const _id = this.state.id;
    const _mid = this.state.mid;
  
    if (id != _id || mid != _mid){
      // md/:num 的特殊判断
      if (mid == null && _mid != null) return;
      this.setState({
        id, mid
      })
      this.initData();
    }
  }

  mdChange(value) {
    // console.log(value);
    this.setState({
      curMd: value,
    })
    
  }

  // 左侧栏
  itemSidebar(){
    const items = [];
    const { upCatalog, curCatalog, mds } = this.state;
    const { curMd } = this.state;
    const urlRoot = Utils.Config.urlRoot;
    if (curMd != null) {
      // 侧边栏数据填充
      const mdData = mds.map(value=>{
        value.name = value.title;
        value.key = value.id;
        value.url = `${urlRoot}/index/md/${curCatalog.id}/${value.id}`;
        return value; 
      })
      items.push(
        <PanelSiderbarCmp 
          title={curCatalog.name}
          activeKey={curMd.id}
          data={mdData} 
          headerColor="#dff0d8"/>
      )

    }

    return items;
  }

  // 主题
  itemBody() {
    const items = [];
    const { upCatalog, curCatalog, mds } = this.state;
    const { curMd } = this.state;
    const urlRoot = Utils.Config.urlRoot;
    if (curMd != null) {
      // 导航数据
      const navData = [];
      navData.push(Object.assign(upCatalog,{
        key: upCatalog.id,
        url: `${urlRoot}/index/list/${upCatalog.id}`
      }));
      navData.push(Object.assign(curCatalog,{
        key: curCatalog.id,
        url: `${urlRoot}/index/md/${curCatalog.id}`
      }))
      navData.push(Object.assign(curMd,{
        key: curMd.id,
        name: curMd.title,
        url: null
      }))
      // nextBtn 数据
      let curIndex;
      mds.map((value, index) => {
        if(value.id == curMd.id) {
          curIndex = index;
        }
      })
      const option = {};
      if(curIndex != null) {

        option.leftName = curIndex == 0 ? null: mds[curIndex-1].name;
        option.leftUrl = option.leftName == null?'/':`${urlRoot}/index/md/${curCatalog.id}/${mds[curIndex-1].id}`;
        option.rightName = curIndex == (mds.length-1) ? null: mds[curIndex+1].name;
        option.rightUrl = option.rightName == null?'/':`${urlRoot}/index/md/${curCatalog.id}/${mds[curIndex+1].id}`;
      }
      
      items.push(
        <PanelNavCmp data={navData}>
            <NextNavCmp {...option}/>
            <div dangerouslySetInnerHTML = {{ __html:curMd.html }}></div>  
            <NextNavCmp {...option}/>
          </PanelNavCmp>
      )
    }
    return items;
  }

  // 问答
  itemQA() {
    const items = [];
    const { QAData } = this.state;
    const _items = [];
    QAData.map(value => {
      _items.push(<br/>)
      _items.push(
        <PanelQACmp data={value}/>
      )
    })

    items.push(
      <PanelNavCmp data={[{name:'问答区域'}]}>
       {_items}
      </PanelNavCmp> 
    )
    return items;
  }

  // 提问
  itemSubmit() {
    const items = [];
    const { curMd,upCatalog,curCatalog } = this.state;
    if (curMd != null) {
      const titleInfo = upCatalog.name + '-' + curCatalog.name + '-' + curMd.title;
      items.push(
        <SubmitCmp
          success={()=>{this.initData();}}
          mdid = {curMd.id} titleInfo={titleInfo}/>
      )
    }
    return items;
  }


  render() {
    this.refresh();
    
    const itemSidebar = this.itemSidebar();
    const itemBody = this.itemBody();
    const itemQA = this.itemQA();
    const itemSubmit = this.itemSubmit();
    return (
      <Row>
        <div style={{width:160,float:'left',marginLeft:20,marginRight:20}}>
          {itemSidebar}
        </div>
        <div style={{width:'calc(100% - 240px)',float:'left',marginLeft:0,marginRight:40}}>
          {itemBody}
          {itemQA}
          <div style={{height:40}}></div>
          {itemSubmit}
        </div>
      </Row>
    );
  }
}