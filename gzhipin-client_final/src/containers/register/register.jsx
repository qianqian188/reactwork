import React,{Component} from 'react';
import {NavBar,WingBlank,List,InputItem,WhiteSpace,Radio,Button} from 'antd-mobile'
import Logo from '../../components/logo/Logo';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from "../../redux/actions";

const ListItem = List.Item
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',//用户名
            password:'',//密码
            password2:'',//确认密码
            type:'boss',//用户类型名称
        }
    }
    register=()=>{
        this.props.register(this.state)
    }
    login=()=>{
        this.props.history.replace('/login')
    }
    handChange=(name,val)=>{
        this.setState({
            [name]: val
         }
        )
    }
    render() {
        console.log('所有值:',this.props);
        const {type} = this.state;
        const {redirectTo,msg} = this.props;
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
        {
            msg?<p>{msg}</p>:null
        }
                    <InputItem placeholder="请输入用户名" onChange={val=>this.handChange('username',val)}>用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder="请输入密码" type="password" onChange={val=>{this.handChange("password",val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder="请确认密码" type="password" onChange={val=>{this.handChange('password2',val)}}>确认密码:</InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>用户类型:</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type ==='dashen'} onChange={()=>this.handChange('type','dashen')}>大神</Radio>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type ==='boss'} onChange={()=>this.handChange('type','boss')}>BOSS</Radio>
                    </ListItem>
                    <Button type="primary" onClick={this.register}>
                        注册
                    </Button>
                    <Button type="ghost" onClick={this.login}>
                        已有账户
                    </Button>
                </WingBlank>
            </div>
        );
    }
}

export default connect( state => state.user, {register} )(Register)