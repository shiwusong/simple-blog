import React, { Component } from 'react';
import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import Utils from '../../utils/utiles';
import Style from './panelBody.css';
export default class PanelBodyCmp extends Component {
  render() {
    let {headerColor, data, title} = this.props;
    const urlRoot = Utils.Config.urlRoot;
    data = data.map( value => {
      value.key = value.name;
      value.url = `${urlRoot}/index/md/${value.id}`;
      return value;
    })
    let items = [];
    data.map((value,index) => {
      items.push(
        <Link to={value.url}>
            <div className={Style.nav}>
              <span className={Style.title}>[{value.name}]</span>
              <br/><br/>
              <span>{value.abstract}</span>
              <span className={Style.num}>{index+1}</span>
            </div>          
          </Link>
      )
    })
    return (
      <div>
        {/* 头部内容 */}
        <div className={Style.header} style={{backgroundColor:headerColor}}>
          <img className={Style.leftNavImg} src="./images/横排.png" alt=""/>
          <div style={{border:'0px',float:'left',height:'100%',lineHeight:'42px',fontSize:'15px'}}>{title}</div>
          {/* <img className={Style.rightNavImg} src="./images/全屏.png" alt=""/> */}
        </div>
        {/* 主体内容 */}
        <div className={Style.body}>
          {/* {React.Children.map(this.props.children,(child,i)=>{return child})} */}
          {/* <Link to="/">
            <div className={Style.nav}>
              <span className={Style.title}>[HelloWorld]</span>
              <br/><br/>
              <span>设计一个LOL的英雄类，创建两个英雄对象，一个叫盖伦，一个叫提莫</span>
              <span className={Style.num}>1</span>
            </div>          
          </Link> */}
          {items}
        </div>
      </div>
    );
  }
}
PanelBodyCmp.defaultProps = {
  headerColor: '#f5f5f5',
  data:[],
  title:'C++ 基础',
}