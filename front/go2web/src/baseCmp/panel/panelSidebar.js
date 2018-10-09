import React, { Component } from 'react';
import {Icon} from 'antd';
import Utils from '../../utils/utiles'
import {Link} from 'react-router-dom';
import Style from './panelSidebar.css';
export default class PanelSidebarCmp extends Component {
  render() {
    let {headerColor, data, activeKey,title} = this.props;
    let items = [];
    data.map((value,index)=>{
      if(index != 0)
        items.push(
          <hr className={Style.hr}/>
        )
      items.push(
        <Link to={value.url}>
          <div className={[activeKey==value.key?Style.navActive:Style.nav,''].join(' ')}>{value.name}</div>
        </Link>
      )
    })
    return (
      <div>
        {/* 头部内容 */}
        <div className={Style.header} style={{backgroundColor:headerColor}}>
          {/* <img className={Style.leftNavImg} src="./images/横排.png" alt=""/> */}
          <div style={{border:'0px',float:'left',height:'100%',lineHeight:'42px',fontSize:'15px'}}>{title}</div>
          {/* <img className={Style.rightNavImg} src="./images/全屏.png" alt=""/> */}
        </div>
        {/* 主体内容 */}
        <div className={Style.body}>
          {/* {React.Children.map(this.props.children,(child,i)=>{return child})} */}
          {items}

        </div>
      </div>
    );
  }
}
PanelSidebarCmp.defaultProps = {
  headerColor: '#f5f5f5',
  title:'',
  data:[],
  activeKey:'',
}