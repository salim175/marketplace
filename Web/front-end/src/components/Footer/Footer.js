import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from 'react-icons/fa';

import './Footer.css'

function Footer()
{
    return (
        <footer>
            <div className="container">
                <div className="connections">
                    <a href="https://www.instagram.com"><AiFillInstagram /></a>
                    <a href="https://www.facebook.com"><FaFacebook /></a>
                </div>
                Created By &#8226;Salim Kahoul&#8226; 2022
            </div>
        </footer>
    )
}

export default Footer;
