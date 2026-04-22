import React, { Component } from 'react';
import Header from "../components/Header/Header";
import CategoriesNav from "../components/Categories/CategoriesNav";
import ProductCard from "../components/ProductCard/ProductCard";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import "../components/Siders/SearchSider.css";
import "../components/Categories/Categories.css";
import "../components/ProductCard/ProductCard.css";
import { getAllProduct, getProductsByCategory, searchForaProduct } from '../Services/generalServices';

class HomePage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            products: [],
            loading: true,
            previousPage: -1,
            currentPage: 1,
            nextPage: -1,
            isFilteredByCategory: false,
            category: "",
            isFilteredBySearch: false,
            search: ""
        }
        this.applyCategoryFilter = this.applyCategoryFilter.bind(this);
    }
    componentDidMount()
    {
        this.loadPage(this.state.currentPage);
    }
    applyCategoryFilter(categoryToSearch)
    {
        this.setState({ currentPage: 1, category: categoryToSearch, isFilteredByCategory: true, isFilteredBySearch: false }, () => this.loadCategoriesFilter(this.state.category, this.state.currentPage));
    }
    applySearchFilter(sample)
    {
        if (sample)
            this.setState({ currentPage: 1, search: sample, isFilteredByCategory: false, isFilteredBySearch: true }, () => this.laodSearchFilter(this.state.search, this.state.currentPage));
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
    loadCategoriesFilter(category, page)
    {
        if (page != -1)
            getProductsByCategory(category, page)
                .then(
                    res =>
                    {
                        if (page !== 1)
                            getProductsByCategory(category, page - 1)
                                .then(res => this.setState({ previousPage: res.length > 0 ? page - 1 : -1 }))
                        getProductsByCategory(category, page + 1)
                            .then(res => this.setState({ nextPage: res.length > 0 ? page + 1 : -1 }));
                        this.setState({ products: res, currentPage: page })
                    }
                )
                .catch(e => console.log(e))
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
    render()
    {
        return (
            <>
                <Header />

                <div>
                    <div id="sider" >
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
                </div>

                <CategoriesNav onCategoryClick={this.applyCategoryFilter} />

                <div className="container">
                    <Row>
                        {
                            this.state.products.length > 0 ?
                                this.state.products.map(
                                    product =>
                                    (
                                        <Col xs={12} md={4} lg={2.5} key={product._id}>
                                            <ProductCard product={product} />
                                        </Col>
                                    )
                                )
                                :
                                <></>
                        }
                    </Row>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item" onClick=
                                {
                                    () =>
                                    {
                                        if (this.state.isFilteredByCategory)
                                            this.loadCategoriesFilter(this.state.category, this.state.previousPage);
                                        else if (this.state.isFilteredBySearch)
                                            this.laodSearchFilter(this.state.search, this.state.previousPage);
                                        else
                                            this.loadPage(this.state.previousPage)
                                    }
                                }>
                                <a className="page-link" aria-label="Previous">
                                    <OverlayTrigger placement='bottom'
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
                                        if (this.state.isFilteredByCategory)
                                            this.loadCategoriesFilter(this.state.category, this.state.nextPage);
                                        else if (this.state.isFilteredBySearch)
                                            this.laodSearchFilter(this.state.search, this.state.nextPage);
                                        else
                                            this.loadPage(this.state.nextPage)
                                    }
                                }>
                                <a className="page-link" aria-label="Next">
                                    <OverlayTrigger placement='bottom'
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

export default HomePage;
