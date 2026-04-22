import { Button } from "react-bootstrap";
import { getAllCategory } from "../../Services/generalServices";
import React, { Component } from 'react';

import "./Categories.css";

class CategoryNav extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            categories: []
        };
    }
    componentDidMount()
    {
        getAllCategory()
            .then(res => { this.setState({ categories: res }) })
            .catch(e => console.log(e));
    }
    render()
    {
        return (
            <>
                <div className="container" id="categories">
                    <h1>Categories</h1>
                    {this.state.categories.map(category => (
                        <Button variant="dark" style={{ margin: "10px" }} key={category._id} onClick={() => this.props.onCategoryClick(category._id)}>{category.name}</Button>
                    ))}
                </div>
            </>
        );
    }
}

export default CategoryNav;