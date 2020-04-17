import React, { Component } from 'react';
import axios from 'axios';

export default class Products extends Component {

    constructor(props) {
        super(props)
        if (this.props.location.state === undefined) {
            window.location = '/products';
        }
        this.state = {
            product: this.props.location.state.product
        }

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

    }

    onChangeProductName(e) {
        this.props.location.state.product.name = e.target.value
        this.setState({
            product: this.props.location.state.product
        });
    }

    onChangePrice(e) {
        this.props.location.state.product.price = e.target.value
        this.setState({
            product: this.props.location.state.product
        });
    }

    onChangeDescription(e) {
        this.props.location.state.product.description = e.target.value
        this.setState({
            product: this.props.location.state.product
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const product = {
            _id: this.state.product._id,
            name: this.state.product.name,
            price: this.state.product.price,
            description: this.state.product.description,
            createdDate: this.state.product.createdDate 
        }

        axios.post('http://localhost:8080/products/update/' + product._id, product).then(res => {
            console.log(res.data);
        });
        window.location = '/products';
    }

    goBack() {
        this.props.history.push('/products');
    }

    render() {
        return (
            <div className="container" style={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'}}>
                <div style={{height: "550px", width:"70%", backgroundColor: "white", paddingRight: '30px', paddingLeft:'30px', boxShadow:"0px 0px 4px 4px grey"}}>
                    <button style={{ marginTop:"10px", border: "none", backgroundColor:"white"}} onClick={this.goBack}><img style={{width: "20px", height: "20px"}} src="back.png"></img></button>
                    <h1 style={{ color:"black", textAlign:"center"}}>Update Product</h1>
                    <br />
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Product Name</label> <br/>
                            <input className="field" required type="text" placeholder="Product Name" value={this.state.product.name} onChange={this.onChangeProductName} />
                        </div>
                        <div className="form-group">
                        <label>Price</label> <br/>
                            <input className="field" required type="number" placeholder="Price" value={this.state.product.price} onChange={this.onChangePrice} />
                        </div>
                        <div className="form-group">
                        <label>Description</label> <br/>
                            <input className="field" required type="text" placeholder="Description" value={this.state.product.description} onChange={this.onChangeDescription} />
                        </div>
                        <div className="form-group">
                        <label>Date Created</label> <br/>
                            <input disabled className="field" required type="text" placeholder="Date Created" value={Date(this.state.product.createdDate)} />
                        </div>
                        <br/>
                        <input type="submit" value="Update" className="btn btn-secondary"/>
                    </form>
                </div>
            </div>
        )
    }
}