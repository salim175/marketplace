import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb'
import ProductInfo from '../components/Details/ProductInfo/ProductInfo';
import Aside from '../components/Details/Aside/Aside';
import { getSpecific } from '../Services/productData';
import React, { Component } from 'react';

import '../components/Details/ProductInfo/ProductInfo.css'
import '../components/Details/Aside/Aside.css';
import Header from '../components/Header/Header';

class Details extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { product: this.props.location.state.product }
    }
    render()
    {
        return (
            <>
                <Header />
                <SimpleSider />
                <div className="container">
                    <>
                        <Row>
                            <Col lg={8} id="detailsProduct">
                                <ProductInfo product={this.state.product} />
                            </Col>
                            <Col lg={4}>
                                <Aside product={this.state.product} />
                            </Col>
                        </Row></>
                </div>
            </>
        );
    }
}

export default Details;
