import { useEffect, useState } from "react";
import { Row, Tabs, Tab, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
// whishlist productdata

// function ProductInfo({ params })
// {


//     return (
// <>
//     <Image className="col-lg-12" rounded />
//     <Row>
//         <h1 className="col-lg-10 col-sm-10 product-info-heading">TITLE</h1>
//         <span id="heartIconDetails" className="col-lg-1 col-sm-1" onClick={onHearthClick}>
//             {params.isAuth && <>
//                 {!wish ? (
//                     <OverlayTrigger placement="top" overlay={<Tooltip>Add to Wishlist</Tooltip>}>
//                         <BsHeart />
//                     </OverlayTrigger>
//                 )
//                     : (
//                         <OverlayTrigger placement="top" overlay={<Tooltip>Remove from Wishlist</Tooltip>}>
//                             <BsHeartFill />
//                         </OverlayTrigger>
//                     )
//                 }
//             </>}
//         </span>
//     </Row>

//     <div id="detailsCardText" className="col-lg-12">
//         <Tabs defaultActiveKey="details" transition={false}>
//             <Tab eventKey="details" title="Details" id="tab-details">
//                 {params.description}
//                 <hr />
//                 <p id="details-footer" className="text-muted">Product listed at {params.addedAt}</p>
//             </Tab>
//         </Tabs>
//     </div>
// </>
//     )
// }

// export default ProductInfo;

class ProductInfo extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { product: this.props.product }
    }
    render()
    {
        return (
            <>
                <div >
                    <Slide easing="ease">
                        {this.state.product.files.map(image => (
                            <div className="each-slide" key={image}>
                                <Image className="col-lg-12" src={require(`../../../WebsiteData/Products_Pictures/${this.state.product._id}/${image}`)} />
                            </div>
                        ))}
                    </Slide>
                </div>

                <Row>
                    <h1 className="col-lg-10 col-sm-10 product-info-heading">{this.state.product.name}</h1>
                </Row>

                <div id="detailsCardText" className="col-lg-12">
                    <Tabs defaultActiveKey="details" transition={false}>
                        <Tab eventKey="details" title="Details" id="tab-details">
                            <p>{this.state.product.description}</p>
                        </Tab>
                    </Tabs>
                </div>
            </>
        );
    }
}

export default ProductInfo;