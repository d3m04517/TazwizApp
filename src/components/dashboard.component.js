import React, { Component } from 'react';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.onClickCustomers = this.onClickCustomers.bind(this);
        this.onClickProducts = this.onClickProducts.bind(this);
    }

    onClickProducts() {
        this.props.history.push('/products')
    }

    onClickCustomers() {
        this.props.history.push('/customers')
    }

    render() {
        return (
            <div className="container" style={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'}}>
                <div style={{backgroundColor:"white", height: "400px", width:"80%", textAlign:"center",paddingTop: '20px', boxShadow:"0px 0px 4px 4px grey"}}>
                    <h1 style={{marginTop:"10px", color:"black"}}>Dashboard</h1>
                    <br />
                    <div className="container" style={{height: "260px"}}>
                        <button className="btn btn-secondary" style={{width: "48%", fontSize: "20px",
                        height: "100%", 
                        border: 'solid 1px grey',
                        marginRight: '1%',}} onClick={this.onClickProducts}>Update Product</button>
                        <button className="btn btn-secondary" style={{width: "48%", fontSize: "20px",
                        height: "100%", 
                        border: 'solid 1px grey', 
                        }} onClick={this.onClickCustomers}>Update Customer</button>
                    </div>
                </div>
            </div>
        )
    }
} 