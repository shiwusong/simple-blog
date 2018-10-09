import React, { Component } from 'react';
import {Row, message} from 'antd';
import Utils from '../../utils/utiles';
import PanelSiderbarCmp from '../../baseCmp/panel/panelSidebar';
import PanelBodyCmp from '../../baseCmp/panel/panelBody';

export default class ListCtnr extends Component {
  constructor(){
    super();
    this.state = {
      catalogs: [], // 目录
      curCatalog: {},
    }
  }
  componentDidMount(){
    Utils.baseFetch({
      type: 'GET',
      url: '/go2web/catalogList/index',
      success: (res) => {
        this.setState({ catalogs: res.data });
      }
    })
  }
  render() {
    let { catalogs } = this.state;
    let curCatalogs = {};
    catalogs = catalogs.map( value => {
      value.url =   `/index/list/${value.id}`;
      value.key = value.id
      if(value.id == this.props.match.params.id)
        curCatalogs = value;
        
        return value;
    })
    return (
      <Row>
        <div style={{width:160,float:'left',marginLeft:20,marginRight:20}}>
          <PanelSiderbarCmp data={catalogs} title="阶段" activeKey={curCatalogs.id}/>
        </div>
        <div style={{width:'calc(100% - 240px)',float:'left',marginLeft:0,marginRight:40}}>
          <PanelBodyCmp data={curCatalogs.subCatalogs} title={curCatalogs.name}/> 
        </div>
      </Row>
    );
  }
}