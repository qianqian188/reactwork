import React,{Component} from 'react';
import {NavBar,WingBlank,List,InputItem,WhiteSpace,Radio,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";
import {Login} from "../../redux/actions";
import Logo from '../../components/logo/Logo';
const ListItem = List.Item
class login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',//用户名
            password:''//密码
        }
    }
    login=()=>{
        this.props.Login(this.state);
    }
    toRegister=()=>{
        this.props.history.replace('/register')
    }
    handChange=(name,val)=>{
        this.setState({
            [name]: val
         }
        )
    }
    render() {
        const {redirectTo, msg} = this.props
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    {msg ? <p className='error-msg'>{msg}</p> : null}
                    <InputItem placeholder="请输入用户名" onChange={val=>this.handChange('username',val)}>用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder="请输入密码" type="password" onChange={val=>{this.handChange("password",val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.login}>
                        登录
                    </Button>
                    <Button onClick={this.toRegister}>
                        还没有账户
                    </Button>
                </WingBlank>
            </div>
        );
    }
}

export default connect( state => state.user, {Login} )(login)