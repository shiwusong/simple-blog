import React, { Component } from 'react';
import {Row} from 'antd';
import {Link} from 'react-router-dom';
import PanelSiderbarCmp from '../../baseCmp/panel/panelSidebar';
import PanelNavCmp from '../../baseCmp/panel/panelNav';
import Utils from '../../utils/utiles';
const marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

export default class TmdCtnr extends Component {
  constructor() {
    super();
    this.state= {
      catalogs: [],
      md: '',
    }
  }

  componentDidMount() {
    Utils.baseFetch({
      type: 'GET',
      url: '/go2web/catalogList/index',
      success: (res) => {
        this.setState({ catalogs: res.data });
      }
    })
    Utils.baseFetch({
      type: 'GET',
      url: '/go2web/tmd/get',
      success: (res) => {
        this.setState({ md: res.data.md });
        
      }
    })
  }
  

  // 主题
  itemBody() {
    const items = [];
      // 导航数据
      const navData = [];
      navData.push({
        key: 0,
        name: '预览',
        url: null
      })
      
      items.push(
        <PanelNavCmp data={navData}>
          <div dangerouslySetInnerHTML = {{ __html:marked(this.state.md) }}></div>  
        </PanelNavCmp>
      )
    return items;
  }

  render() {
    let { catalogs } = this.state;
    catalogs = catalogs.map( value => {
      value.url = `/index/list/${value.id}`;
      return value;
    })
    const itemBody = this.itemBody();
    return (
      <Row>
        <div style={{width:160,float:'left',marginLeft:20,marginRight:20}}>
          <PanelSiderbarCmp data={catalogs} title="Hello World!"/>
        </div>
        <div style={{width:'calc(100% - 240px)',float:'left',marginLeft:0,marginRight:40}}>
          {itemBody}
        </div>
      </Row>
    );
  }
}