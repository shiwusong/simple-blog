import React, { Component } from 'react';
import {Row} from 'antd';

import PanelSiderbarCmp from '../../baseCmp/panel/panelSidebar';
import PanelBodyCmp from '../../baseCmp/panel/panelBody';
import  Utils  from '../../utils/utiles';

export default class IndexCtnr extends Component {
  constructor(){
    super();
    this.state = {
      catalogs: [], // 目录
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
    let items = [];
    catalogs = catalogs.map( value => {
      items.push(
        <PanelBodyCmp data={value.subCatalogs} title={value.name}/> 
      );
      value.url = `/index/list/${value.id}`;
      return value;
    })
    return (
      <Row>
        <div style={{width:160,float:'left',marginLeft:20,marginRight:20}}>
          <PanelSiderbarCmp data={catalogs} title="Hello World!"/>
        </div>
        <div style={{width:'calc(100% - 240px)',float:'left',marginLeft:0,marginRight:40}}>
          {items}
        </div>
      </Row>
    );
  }
}