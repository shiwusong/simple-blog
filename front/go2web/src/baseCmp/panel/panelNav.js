import React, { Component } from 'react';
import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import Style from './panelNav.css';
export default class PanelNavCmp extends Component {
  render() {
    let {headerColor, data, title, type} = this.props;
    // data = [
    //   {key:'JAVA',name:'JAVA',url:'/'},
    //   {key:'C#',name:'C#',url:'/'},
    //   {key:'Go',name:'Go'},
    // ]
    
    let items = [];
    if(type == 'NAV'){
      let navItems = [];
      data.map((value,index) => {
        let xiegang = [];
        if(index != data.length - 1){
          xiegang.push(<span>&ensp;/&ensp;</span>);
        }
        if(value.url != null){
          navItems.push(<div className={Style.font}><Link to={value.url}>{value.name}</Link>{xiegang}</div>)
        }else{
          navItems.push(<div className={Style.font}>{value.name}{xiegang}</div>)
        }
      })
      items.push(
        <div className={Style.header} style={{backgroundColor:headerColor}}>
          {navItems}
        </div>
      )
    }else{
      items.push(
        <div className={Style.header} style={{backgroundColor:headerColor}}>
          <div className={Style.font}>{title}</div>
        </div>
      )
    }
    return (
      <div>
        {/* 头部内容 */}
        {/* <div className={Style.header} style={{backgroundColor:headerColor}}>
          <div style={{border:'0px',float:'left',height:'100%',lineHeight:'42px',fontSize:'15px'}}>{title}</div>
        </div> */}
        {items}
        {/* 主体内容 */}
        <div className={Style.body}>
          {React.Children.map(this.props.children,(child,i)=>{return child})}

        </div>
      </div>
    );
  }
}
PanelNavCmp.defaultProps = {
  headerColor: '#dff0d8',
  // headerColor: '#fcf8e3',
  data:[],
  title:'123',
  // type:'SIMPLE',
  type:'NAV',
  
}