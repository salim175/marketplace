import { Component } from "react";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { getAllCategory, getAllCurrency } from "../Services/generalServices";
import SimpleSider from "../components/Siders/SimpleSider";
import "../components/CreateSell/CreateSell.css";
import Header from "../components/Header/Header";
import { updateProduct, getProducts } from "../Services/userData";
import Joi from "@hapi/joi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditProduct extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            errors: "",
            loading: false,
            category_id: "",
            currency_id: "",
            name: "",
            description: "",
            price: 0,
            location: "",
            categories: [],
            currency: [],
            product: this.props.location.state.product
        };
    }

    validateProduct(product)
    {
        const schema = Joi.object({
            category_id: Joi.string().min(1)
                .error(() =>
                {
                    return new Error("Please select a Category");
                }),
            currency_id: Joi.string().min(1)
                .error(() =>
                {
                    return new Error("Please select a Currency");
                }),
            name: Joi.string().min(3).max(50)
                .error(() =>
                {
                    return new Error("Please enter a Valide name(the name must be between 3 and 50 character)");
                }),
            price: Joi.number().min(0)
                .error(() =>
                {
                    return new Error("Please enter a price");
                }),
            description: Joi.string().min(10).max(2000)
                .error(() =>
                {
                    return new Error("Please enter a Valide description(the description must be between 10 and 2000 character)");
                }),
            location: Joi.string().min(1)
                .error(() =>
                {
                    return new Error("Please enter a location");
                }),
        });
        return schema.validate(product);
    }

    validateData(productToAdd)
    {
        const { error } = this.validateProduct(productToAdd);
        if (error)
        {
            this.setState({ errors: error.message })
            return false;
        }
        return true;
    }

    componentDidMount()
    {
        getProducts()
            .then(res =>
            {
                this.setState({
                    name: res.name,
                    price: res.price,
                    description: res.description,
                    location: res.location
                })
            })
            .catch(e => { console.log(e) });
        getAllCategory()
            .then(res => { this.setState({ categories: res }) })
            .catch(e => { console.log(e) });
        getAllCurrency()
            .then(res => { this.setState({ currency: res }) })
            .catch(e => { console.log(e) });
    }

    submitProduct()
    {
        let productTosubmit = {};
        if (this.state.category_id)
            productTosubmit.category_id = this.state.category_id;
        if (this.state.currency_id)
            productTosubmit.currency_id = this.state.currency_id;
        if (this.state.name)
            productTosubmit.name = this.state.name;
        if (this.state.description)
            productTosubmit.description = this.state.description;
        if (this.state.price)
            productTosubmit.price = this.state.price;
        if (this.state.location)
            productTosubmit.location = this.state.location;
        if (this.validateData(productTosubmit))
        {
            this.setState({ loading: true });

            updateProduct(productTosubmit, this.state.product._id)
                .then(res => 
                {
                    if (res.status == 200)
                    {
                        toast.success("Edit successfully");
                        this.setState({ loading: false });
                    }
                    else 
                    {
                        toast.error("ERROR occured while editing the product");
                        console.log(res);
                        this.setState({ loading: false });
                    }
                })
                .catch(() => { toast.error("ERROR occured while editing the product"); });
        }
    }

    render()
    {
        return (
            <>
                <Header />
                <SimpleSider />
                <div className="container">
                    <h1 className="heading">Edit Product</h1>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Edit Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                defaultValue={this.state.product.name}
                                name="title"
                                onChange=
                                {
                                    e =>
                                    { this.setState({ name: e.target.value }) }
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Edit Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                placeholder="Price"
                                name="price"
                                defaultValue={this.state.product.price}
                                min={0}
                                onChange=
                                {
                                    e =>
                                    { this.setState({ price: e.target.value }) }
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCurrency">
                            <Form.Label>Edit Currency</Form.Label>

                            <Form.Control as="select" name="currency" required
                                onChange={e => { this.setState({ currency_id: e.target.value }) }}
                            >
                                <option value={""}>Please select currency</option>
                                {
                                    this.state.currency.map(currency => (
                                        <option key={currency._id} value={currency._id} selected={currency._id == this.state.product.currency_id._id}>{currency.abr}</option>
                                    ))
                                }
                            </Form.Control>

                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Edit Description</Form.Label>
                        <Form.Control as="textarea" defaultValue={this.state.product.description} rows={3} name="description" required
                            onChange={e => { this.setState({ description: e.target.value }) }}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Edit City</Form.Label>
                            <Form.Control name="city" defaultValue={this.state.product.location} placeholder="Beirut" required
                                onChange={e => { this.setState({ location: e.target.value }) }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Edit Category</Form.Label>
                            <Form.Control as="select" name="category" required
                                onChange={e => { this.setState({ category_id: e.target.value }) }}
                            >
                                <option value={""}>Please select category</option>
                                {
                                    this.state.categories.map((category) => (
                                        <option key={category._id} value={category._id} selected={category._id == this.state.product.category_id._id} >{category.name}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>

                    </Form.Row>

                    {this.state.errors ?

                        <Form.Group>
                            <Alert className="col-lg-12" variant="danger" style={{ textAlign: "center" }} >{this.state.errors}</Alert>
                        </Form.Group>
                        :
                        <></>
                    }

                    {this.state.loading ?
                        <Button className="col-lg-12" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button className="col-lg-12" variant="dark" onClick={() => { this.submitProduct() }}>Edit product</Button>
                    }

                </div>

            </>
        )
    }
}

export default EditProduct;