import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import { Row,Col } from 'antd';

import HeaderCmp from './header/header';
import IndexCntr from './indexCtnr/indexCtnr';
import ListCntr from './listCtnr/listCtnr';
import MdCntr from './mdCtnr/mdCtnr';
import EditCntr from './editCntr/editCntr';
import TmdCntr from './tmdCtnr/tmdCtnr';

import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/scroll/simplescrollbars'
require('codemirror/mode/xml/xml');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/python/python');
require('codemirror/mode/sql/sql');
require('codemirror/mode/clike/clike');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');


export default class IndexPage extends Component {
  constructor(){
    super();
    this.state={
      id:1,
    }
  }
  render() {
    return (
      <div>
        <HeaderCmp/>
        <div style={{height:24}}></div>
        <Switch>
          <Route exact path='/' component={IndexCntr}/>
          <Route exact path='/index' component={IndexCntr}/>
          <Route exact path='/index/list/:id' component={ListCntr}/>
          <Route exact path='/index/md/:id/:mid' component={MdCntr}/>
          <Route exact path='/index/md/:id' component={MdCntr}/>
          <Route exact path='/index/tmd' component={TmdCntr}/>
          <Route exact path='/index/edit' component={EditCntr}/>
        </Switch>
        <footer style={{fontSize:'0.8em',textAlign:'center',backgroundColor:'#f9f9f9',border:'1px solid #e5e5e5',padding:'20px 0',marginTop:'10px',color:'#999'}}>
            © 2018 <a href="/">go2web.cn</a> - All Rights Reserved.  
        </footer>
      </div>
    );
  }
}