import React, { Component } from 'react';
import MyLayout from './common/layout.js'
import routes from '../routes/index'
import lockImg from '../assets/images/cc-lock.png'

class Index extends Component {
    render() {
        let pathname,Content;
        if(!this.props.location){
            window.location.href='/login'
            return
        }
        pathname = this.props.location.pathname
        let matchRoutes = (routes) => {
            for(let i in routes){
                if(routes[i].children){
                    matchRoutes(routes[i].children)
                }
                if(routes[i].path === pathname){
                    Content = routes[i].component
                }
            }
        }
        matchRoutes(routes);
        if(!Content) Content = ()=>{
            return(
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"400px"}}>
                    <img style={{display:"inline-block",width:"40px",height:"40px"}} src={lockImg } alt=''/>
                    <span style={{fontSize:"16px",marginLeft:"10px"}}>暂无访问权限</span>
                </div>
            )
        };
        return (
            <MyLayout content={()=>(<Content />)} />
        );
    }
}

export default Index