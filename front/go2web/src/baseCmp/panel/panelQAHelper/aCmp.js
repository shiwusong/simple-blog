import React, { Component } from 'react';
import OneACmp from './oneACmp';
import Style from './aCmp.css'

export default class ACmp extends Component {


  items() {
    const items = [];
    const data = this.props.data;
    items.push(
      <div className={Style.title}> {data.length} 个答案</div>
    )
    items.push(<hr/>)
    data.map(value => {
      items.push(
        <OneACmp data={value}/>
      )
    })
    return items;
  }

  render() {
    const items = this.items();
    return (
      <div className={Style.wrap}>
        {items}
      </div>
    );
  }
}