import React, { Component } from 'react';
import axios from 'axios';

export default class Customer extends Component {

    constructor(props) {
        super(props)

        if (this.props.location.state === undefined) {
            window.location = '/customers';
        }

        this.state = {
            customer: this.props.location.state.customer
        }

        this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeApproved = this.onChangeApproved.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.location.state.customer === undefined) {
            this.props.history.push('/dashboard');
        }
    }

    onChangeCustomerName(e) {
        this.props.location.state.customer.name = e.target.value
        this.setState({
            customer: this.props.location.state.customer
        });
    }

    onChangeEmail(e) {
        this.props.location.state.customer.email = e.target.value
        this.setState({
            customer: this.props.location.state.customer
        });
    }

    onChangeAddress(e) {
        this.props.location.state.customer.address = e.target.value
        this.setState({
            customer: this.props.location.state.customer
        });
    }

    onChangeApproved(e) {
        this.props.location.state.customer.approved = !this.props.location.state.customer.approved; 
        this.setState({
            customer: this.props.location.state.customer
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const customer = {
            _id: this.state.customer._id,
            UID: this.state.customer.UID,
            name: this.state.customer.name,
            email: this.state.customer.email,
            address: this.state.customer.address,
            approved: this.state.customer.approved 
        }

        axios.post('http://localhost:8080/api/customers/update/' + customer._id, customer).then(res => {
            console.log(res.data);
        });
        this.props.history.push('/dashboard');
    }

    goBack() {
        this.props.history.push('/customers');
    }

    render() {
        return (
            <div className="container" style={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'}}>
                <div style={{backgroundColor:"white", height: "580px", width:"70%",  paddingRight: '30px', paddingLeft:'30px', boxShadow:"0px 0px 4px 4px grey"}}>
                    <button style={{ marginTop:"10px", border: "none", backgroundColor:"white"}} onClick={this.goBack}><img style={{width: "20px", height: "20px"}} src="back.png"></img></button>
                    <h1 style={{ color:"black", textAlign:"center"}}>Update Customer</h1>
                    <br />
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                            <label>UID</label> <br/>
                            <input className="field" required type="text" placeholder="UID" value={this.state.customer.UID} disabled />
                        </div>
                        <div className="form-group">
                            <label>Customer Name</label> <br/>
                            <input className="field" required type="text" placeholder="Customer Name" value={this.state.customer.name} onChange={this.onChangeCustomerName} />
                        </div>
                        <div className="form-group">
                        <label>Email</label> <br/>
                            <input className="field" required type="email" placeholder="email" value={this.state.customer.email} onChange={this.onChangeEmail} />
                        </div>
                        <div className="form-group">
                        <label>Address</label> <br/>
                            <input className="field" required type="text" placeholder="address" value={this.state.customer.address} onChange={this.onChangeAddress} />
                        </div>
                        <div className="form-group">
                        <label>Is Approved</label> <br/>
                            <input className="field" type="checkbox" defaultChecked={this.state.customer.approved} onChange={this.onChangeApproved} />
                        </div>
                        <br/>
                        <input type="submit" value="Update" className="btn btn-secondary"/>
                    </form>
                </div>
            </div>
        )
    }
}