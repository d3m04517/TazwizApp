import React, { Component } from 'react';
import axios from 'axios';

export default class Products extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: []
        }

        this.goBack = this.goBack.bind(this);
        this.navigateToProduct = this.navigateToProduct.bind(this);
        
    }

    componentDidMount() {
        axios.get('http://localhost:8080/products').then(res => {
            if (res.data.length > 0) {
                this.setState({
                    products: res.data.map(product => product)
                });
            }
        });
    }

    goBack() {
        this.props.history.push('/dashboard');
    }

    navigateToProduct(productObj) {
        this.props.history.push('/product', { product: productObj })
    }

    render() {
        return (
            <div className="container" style={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'}}>
                <div style={{backgroundColor:"white",height: "400px", width:"70%",  paddingTop: '30px', boxShadow:"0px 0px 4px 4px grey"}}>
                    <button style={{border: "none"}} onClick={this.goBack}><img style={{width: "20px", height: "20px"}} src="back.png" alt="back"></img></button>
                    <h1 style={{marginTop:"10px", color:"black", textAlign:"center"}}>Products</h1>
                    <br />
                    <div className="container" style={{height: "220px", overflow: "auto"}}>
                        <table className="table">
                            <thead>
                                <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.products.map(product => {
                                return (
                                <tr key={product.key}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{Date(product.createdDate)}</td>
                                    <td><button className="btn btn-secondary" onClick={() => this.navigateToProduct(product)}>Update</button></td>
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