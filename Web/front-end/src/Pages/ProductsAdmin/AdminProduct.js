import { Link } from "react-router-dom";
import { Button, ListGroup, Row, Col, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import React, { Component } from 'react';
import { getAllProduct, searchForaProduct } from "../../Services/generalServices";
import { deleteProduct } from "../../Services/adminServices";
import "../../components/Siders/SearchSider.css";

class AdminProduct extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen: false,
            products: [],
            previousPage: -1,
            currentPage: 1,
            nextPage: -1,
            productToDelete: null
        };
    }

    openModal = (productToDelete) => this.setState({
        isOpen: true,
        productToDelete: productToDelete
    });
    closeModal = () => this.setState({ isOpen: false });

    componentDidMount()
    {
        this.loadPage(this.state.currentPage);
    }

    loadPage(page)
    {
        if (page != -1)
            getAllProduct(page)
                .then(res =>
                {
                    if (page !== 1)
                        getAllProduct(page - 1)
                            .then(res => this.setState({ previousPage: res.length > 0 ? page - 1 : -1 }))
                    getAllProduct(page + 1)
                        .then(res => this.setState({ nextPage: res.length > 0 ? page + 1 : -1 }));
                    this.setState({ products: res, currentPage: page })
                }
                )
                .catch(e => console.log(e))
    }

    hundleDeleteProduct(id)
    {
        this.closeModal();
        deleteProduct(id)
            .then(res =>
            {
                if (this.state.products.length > 1)
                    this.loadPage(this.state.currentPage);
                else
                {
                    if (this.state.currentPage == 1)
                        this.loadPage(1);
                    else
                    {
                        this.loadPage(this.state.currentPage - 1);
                        this.setState({ currentPage: this.state.currentPage - 1 });
                    }
                }
            })
    }

    laodSearchFilter(sample, page)
    {
        if (page != -1)
            searchForaProduct(sample, page)
                .then(
                    res =>
                    {
                        if (page !== 1)
                            searchForaProduct(sample, page - 1)
                                .then(res => this.setState({ previousPage: res.length > 0 ? page - 1 : -1 }))
                        searchForaProduct(sample, page + 1)
                            .then(res => this.setState({ nextPage: res.length > 0 ? page + 1 : -1 }));
                        this.setState({ products: res, currentPage: page })
                    }
                )
                .catch(e => console.log(e))
    }

    applySearchFilter(sample)
    {
        if (sample)
            this.setState({ currentPage: 1, search: sample, isFilteredByCategory: false, isFilteredBySearch: true }, () => this.laodSearchFilter(this.state.search, this.state.currentPage));
    }

    render()
    {
        return (
            <>
                <AdminHeader />

                <div id="sider">
                    <input className="col-lg-6" type="text" placeholder="Search..." name="search"
                        onKeyDown={
                            e =>
                            {
                                if (e.key == 'Enter')
                                    this.applySearchFilter(e.target.value);
                            }
                        }
                    />
                </div>

                <h1 style={{ fontFamily: "serif", textAlign: "center", margin: "20px" }}>Product List</h1>

                <div className='container'>
                    <Modal show={this.state.isOpen} onHide={this.closeModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Deleting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >Are you sure you want to delete this product</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                            <Button variant="danger" onClick={() => this.hundleDeleteProduct(this.state.productToDelete)}>delete</Button>
                        </Modal.Footer>
                    </Modal>

                    {
                        this.state.products.map(product => (
                            <Row key={product._id}>
                                <Col >
                                    <ListGroup style={{ margin: "5px" }} horizontal>
                                        <ListGroup.Item action style={{ borderRadius: "5px", padding: "4px" }}>
                                            <Link to={{
                                                pathname: `/categories/details`,
                                                state: { product: product }
                                            }}>
                                                <div>
                                                    <div className="fw-bold" style={{ fontWeight: "bold" }}>{product.name}</div>
                                                    <div className="fw-bold" style={{ fontSize: "12px", font: "gray" }}>Username: {product.owner_id.name}</div>
                                                    <div className="fw-bold" style={{ fontSize: "12px" }}>phoneNumber: {product.owner_id.phoneNumber}</div>
                                                </div>
                                            </Link>
                                        </ListGroup.Item>

                                        <Button variant='danger' onClick={() => { this.openModal(product._id) }} style={{ marginLeft: "10px" }}>
                                            Delete
                                        </Button>
                                    </ListGroup>
                                </Col>
                            </Row>
                        ))
                    }



                    <nav aria-label="Page navigation example" style={{ paddingTop: "10px" }}>
                        <ul className="pagination">
                            <li className="page-item" onClick=
                                {
                                    () =>
                                    {
                                        this.loadPage(this.state.previousPage)
                                    }
                                }>
                                <a className="page-link" aria-label="Previous">
                                    <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip>Previous</Tooltip>}
                                    >
                                        <span aria-hidden={this.state.previousPage !== -1} >&laquo;</span>
                                    </OverlayTrigger>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" >{this.state.currentPage}</a></li>
                            <li className="page-item" onClick=
                                {
                                    () =>
                                    {
                                        this.loadPage(this.state.nextPage)
                                    }
                                }>
                                <a className="page-link" aria-label="Next">
                                    <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip>Next</Tooltip>}
                                    >
                                        <span aria-hidden={this.state.nextPage !== -1} >&raquo;</span>
                                    </OverlayTrigger>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </>
        );
    }
}

export default AdminProduct;