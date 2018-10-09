import React, { Component } from 'react';
import { Row, Col, Modal, Button, Icon, Input, message} from 'antd';
import { withRouter } from 'react-router-dom';
// var Style = require('./header.css');
import Utils from '../../utils/utiles';
import Style from './header.css';

class HeaderCmp extends Component {
  constructor(){
    super();
    this.state = {
      loginVisible: false,
      registerVisible: false,

      // 是否登陆
      hasLogin: null,
      username: '',
      authority:0,

      // 登陆信息
      loginName:'',
      loginPassword:'',
      // 注册信息
      registerUsername:'',
      registerName:'',
      registerPassword:'',
    }
  }

  componentDidMount(){
    // 判断是否有cookie
    const token = Utils.getCookie('token');
    
    if(token == null || token ==''){
      this.setState({ hasLogin: false });
      return;
    }
    Utils.baseFetch({
      type: 'POST',
      url: '/go2web/checkToken',
      data: { token },
      success: (res) => {
        console.log(res);
        
        if(res.code >= 300){
          this.setState({ hasLogin: false, });
          return;
        }
        this.setState({
          hasLogin: true,
          name: res.data.name,
          authority: res.data.authority,
        })
        
      }
    })
  }
  
  // 显示弹出框
  showModal(modalName){
    switch (modalName){
      case "login":
        this.setState({loginVisible:true})
        break;
      case "register":
        this.setState({registerVisible:true})
        break;
      default: break;
      
    }
  }
  // 关闭弹出框
  closeModal(modalName){
    switch (modalName){
      case "login":
        this.setState({loginVisible:false})
        break;
      case "register":
        this.setState({registerVisible:false})
        break;
      default: break;
      
    }
  }

  // 登陆
  login(){
    const {loginName, loginPassword} = this.state;
    // 验证
    if(loginName == ''){
      message.error('请输入账号！');
      return;
    }
    if(loginPassword == ''){
      message.error('请输入密码！');
      return;
    }
    Utils.baseFetch({
      type:'POST',
      url:'/go2web/login',
      data:{
        loginName:loginName,
        password:loginPassword
      },
      success:(res)=>{  
        // 登陆失败
        if(res.code < 200 || res.code >= 300){
          message.error(res.message);
          return;
        }
        // 登陆成功
        // 1.write token and name
        
        Utils.setCookie('token', res.data.token);
        Utils.setCookie('name', res.data.name);
        Utils.setCookie('authority', res.data.authority);

        this.setState({
          hasLogin: true,
          token: res.data.token,
          name: res.data.name,
          authority: res.data.authority,

        })
        this.closeModal('login');
      },
    })
  }

  // 注册
  register(){
    const {registerName,registerPassword,registerUsername} = this.state;
    Utils.baseFetch({
      type:'POST',
      url:'/go2web/register',
      data:{
        registerName,
        password: registerPassword,
        name: registerUsername,
      },
      success:(res)=>{
        if(res.code < 300) {
          message.info('注册成功！');
          this.closeModal('register');
          return;
        }
        message.error(res.message);
      }
    })
  }

  // 退出登陆
  logout(){
    // Utils.delCookie('token');
    // Utils.delCookie('name');
    Utils.setCookie('token', '');
    this.setState({
      hasLogin: false,
      name: '',
    })
  }

  // 跳转
  url(url){
    const urlRoot = Utils.Config.urlRoot;
    this.props.history.push(urlRoot + url);
  }

  render() {
    const { hasLogin, name, authority } = this.state;
    
    // login and unlogin cmps
    let items = [];
    if(hasLogin != null){
      if(hasLogin){
        items.push(
          <button className={ Style.right } onClick={ this.logout.bind(this) }>退出</button>
        )
        if(authority == '1')
        items.push(
          <button className={Style.right} onClick={ this.url.bind(this, '/index/edit') }>编辑</button>
        );
        items.push(
          <button className={Style.right} style={{textDecoration:'underline'}}>{name}</button>
        );
      }else{
        items.push(
          <button className={Style.right} onClick={this.showModal.bind(this,"login")}>登陆</button> 
        );
        items.push(
          <button className={Style.right} onClick={this.showModal.bind(this,"register")}>注册</button>
        );
      }
    }


    return (
      <div>
        <Row>
          <img className={Style.logo} src="/images/logo.png" alt=""/>
        </Row>
        <Row className={Style.nav}>
            <button onClick={this.url.bind(this,'/index')}>首页</button>
            <button>实战项目</button>
            <button>关于本站</button>

            {items}
            <button className={Style.right}>加入QQ群</button>

        </Row>
        {/* 登陆弹出框 */}
        <Modal
          title="登陆"
          visible={this.state.loginVisible}
          onOk={this.login.bind(this)}
          onCancel={this.closeModal.bind(this,"login")}
          className={Style.input}
        >
          <Row className={Style.row}>
            <Col className={Style.rText} span={6}>用户名：</Col>
            <Col span={12}>
              <Input placeholder="请输入您的用户名"
                onChange={(e)=>{this.setState({loginName:e.target.value})}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Col>
          </Row>
          <Row className={Style.row}>
            <Col className={Style.rText} span={6}>密码：</Col>
            <Col span={12}>
              <Input placeholder="请输入您的密码" type="password"
                onChange={(e)=>{this.setState({loginPassword:e.target.value})}}
                prefix={<Icon type="eye" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Col>
          </Row>
        </Modal>
        {/* 注册弹出框 */}
        <Modal
          title="注册"
          visible={this.state.registerVisible}
          onOk={this.register.bind(this)}
          onCancel={this.closeModal.bind(this,"register")}
          className={Style.input}
        >
          <Row className={Style.row}>
            <Col className={Style.rText} span={6}>用户名：</Col>
            <Col span={12}>
              <Input placeholder="请输入您的用户名"
                onChange={(e)=>{this.setState({registerName:e.target.value})}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Col>
          </Row>
          <Row className={Style.row}>
            <Col className={Style.rText} span={6}>密码：</Col>
            <Col span={12}>
              <Input placeholder="请输入您的密码" type="password"
                onChange={(e)=>{this.setState({registerPassword:e.target.value})}}
                prefix={<Icon type="eye" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Col>
          </Row>
          <Row className={Style.row}>
            <Col className={Style.rText} span={6}>昵称：</Col>
            <Col span={12}>
              <Input placeholder="请输入您的昵称" 
                onChange={(e)=>{this.setState({registerUsername:e.target.value})}}
                prefix={<Icon type="meh" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default withRouter(HeaderCmp);