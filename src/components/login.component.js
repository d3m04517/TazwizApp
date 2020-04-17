import React, { Component } from 'react';
import '../styles/login.css';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }


        axios.post('http://localhost:8080/auth',user).then(res => { 
            console.log(res.data);
            this.props.history.push('/dashboard');
        }).catch((err => console.log("err")));
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            }}>
                <div style={{textAlign: "center", padding: '30px', boxShadow:"0px 0px 4px 4px grey"}}>
                    <h2 style={{paddingBottom:"15px", fontWeight: "light"}}>Sign In</h2> 
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email </label> <br/>
                            <input className="field" required type="email" placeholder="Email" value={this.state.username} onChange={this.onChangeUsername} />
                        </div>
                        <div classname="form-group">
                        <label>Password </label> <br/>
                            <input className="field" required type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                        </div>
                        <br/>
                        <input type="submit" value="Login" className="btn btn-secondary"/>
                    </form>
                </div>
            </div>
        );
    }
}