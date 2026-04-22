import { Component } from "react";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { getAllCategory, getAllCurrency } from "../Services/generalServices";
import SimpleSider from "../components/Siders/SimpleSider";
import "../components/CreateSell/CreateSell.css";
import Header from "../components/Header/Header";
import { addProduct } from "../Services/userData";
import Joi from "@hapi/joi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddProduct extends Component
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
            selectedFiles: null
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
            console.log(error.message);
            this.setState({ errors: error.message })
            return false;
        }
        return true;
    }

    componentDidMount()
    {
        getAllCategory()
            .then(res => { this.setState({ categories: res }) })
            .catch(e => { console.log(e) });
        getAllCurrency()
            .then(res => { this.setState({ currency: res }) })
            .catch(e => { console.log(e) });
    }

    submitProduct()
    {
        const productTosubmit = {
            category_id: this.state.category_id,
            currency_id: this.state.currency_id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            location: this.state.location
        };
        var formData = new FormData();

        if (this.state.selectedFiles != null && this.validateData(productTosubmit))
        {
            this.setState({ loading: true });
            const selectedFiles = this.state.selectedFiles;
            for (const key of Object.keys(selectedFiles))
            {
                formData.append('images', selectedFiles[key])
            }
            formData.append('data', JSON.stringify(productTosubmit));

            addProduct(formData)
                .then(res => 
                {
                    console.log(res);
                    if (res.status == 200)
                    {
                        toast.success("Added successfully");
                        this.setState({ loading: false });
                    }
                    else 
                    {
                        toast.error("ERROR occured while ading the product");
                        this.setState({ loading: false });
                    }
                })
                .catch(() => { toast.error("ERROR occured while ading the product") });
        }
        else
            console.log("no files entered");
    }
    render()
    {
        return (
            <>
                <Header />
                <SimpleSider />
                <div className="container">
                    <h1 className="heading">Add a Product</h1>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
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
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                placeholder="Price"
                                name="price"
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
                            <Form.Label>Currency</Form.Label>
                            <Form.Control as="select" defaultValue="" name="currency" required
                                onChange={e => { this.setState({ currency_id: e.target.value }) }}
                            >
                                <option value={""}>Please select currency</option>
                                {
                                    this.state.currency.map(currency => (
                                        <option key={currency._id} value={currency._id}>{currency.abr}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required
                            onChange={e => { this.setState({ description: e.target.value }) }}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" placeholder="Beirut" required
                                onChange={e => { this.setState({ location: e.target.value }) }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" defaultValue="" name="category" required
                                onChange={e => { this.setState({ category_id: e.target.value }) }}
                            >
                                <option value={""}>Please select category</option>
                                {
                                    this.state.categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridImage" >
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="image" type="file" multiple required
                                onChange=
                                {
                                    e =>
                                    {
                                        this.setState({ selectedFiles: e.target.files });
                                    }
                                }
                            />
                        </Form.Group>

                    </Form.Row>

                    {this.state.errors ?

                        <Form.Group>
                            {/* <Form.Label
                                style={{ display: "true" }}
                            > */}
                            <Alert className="col-lg-12" variant="danger" style={{ textAlign: "center" }}>{this.state.errors}</Alert>
                            {/* </Form.Label> */}
                        </Form.Group>
                        :
                        <></>
                    }

                    {this.state.loading ?
                        <Button className="col-lg-12" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button className="col-lg-12" variant="dark" onClick={() => { this.submitProduct() }}>Add product</Button>
                    }

                </div>

            </>
        )
    }
}

export default AddProduct;