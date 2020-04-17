import React, { Component } from 'react';
import axios from 'axios';

export default class Customers extends Component {

    constructor(props) {
        super(props)

        this.state = {
            customers: []
        }

        this.goBack = this.goBack.bind(this);
        this.navigateTocustomer = this.navigateTocustomer.bind(this);
        
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/customers').then(res => {
            if (res.data.length > 0) {
                this.setState({
                    customers: res.data.map(customer => customer)
                });
            }
        });
    }

    goBack() {
        this.props.history.push('/dashboard');
    }

    navigateTocustomer(customerObj) {
        this.props.history.push('/customer', { customer: customerObj })
    }

    isApproved(approved) {
        const isApproved = approved;

        if (isApproved) {
            return <td>Approved</td>
        } else {
            return <td>Not Approved</td>
        }
    }

    render() {
        return (
            <div className="container" style={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'}}>
                <div style={{backgroundColor:"white",height: "400px", width:"70%" ,paddingTop: '30px', boxShadow:"0px 0px 4px 4px grey"}}>
                    <button style={{border: "none",  backgroundColor:"white"}} onClick={this.goBack}><img style={{width: "20px", height: "20px"}} src="back.png" alt="back"></img></button>
                    <h1 style={{marginTop:"10px", color:"black", textAlign:"center"}}>Customers</h1>
                    <br />
                    <div className="container" style={{height: "220px", overflow: "auto"}}>
                        <table className="table">
                            <thead>
                                <tr>
                                <th>UID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Approved</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.customers.map(customer => {
                                return (
                                <tr key={customer.key}>
                                    <td>{customer.UID}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.address}</td>
                                    {this.isApproved(customer.approved)}
                                    <td><button className="btn btn-secondary" onClick={() => this.navigateTocustomer(customer)}>Update</button></td>
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}