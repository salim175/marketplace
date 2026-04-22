import { useContext } from 'react';
import { Context } from '../../ContextStore';
import { Navbar, NavDropdown, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPlusCircleFill, BsFillGridFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
import profile_picture from "../../Images/profile-picture.png";

import './Header.css';
function Header()
{
    const userData = localStorage.getItem('user-jwt');

    return (
        <Navbar collapseOnSelect bg="ligth" variant="light">
            <div className="container">

                <Navbar.Brand>
                    <NavLink className="navbar-brand" to="/">LibanCoin</NavLink>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='responsive-navbar-nav' />

                <Navbar.Collapse id="responsive-navbar-nav">

                    {userData ?
                        (<Nav className='ml-auto'>
                            <NavLink className="nav-item" id="addButton" to="/add-product">
                                <OverlayTrigger key="bottom" placement="bottom"
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Add</strong>  a sell.
                                        </Tooltip>
                                    }
                                >
                                    <BsFillPlusCircleFill />
                                </OverlayTrigger>
                            </NavLink>

                            <NavDropdown title={<img id='navImg' src={profile_picture} />} drop="left" id="collasible-nav-dropdown">
                                <NavLink className="dropdown-item" to="/profile">
                                    <BsFillPersonFill />Profile
                                </NavLink>
                                <NavDropdown.Divider />
                                <NavLink className="dropdown-item" to="/auth/logout" onClick={() =>
                                {
                                    localStorage.clear();
                                }}>
                                    <IoLogOut />Log out
                                </NavLink>
                            </NavDropdown>
                        </Nav>)
                        :
                        (<Nav style={{ marginLeft: "auto" }}>
                            <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                                Sign In
                            </NavLink>
                            <NavLink className="nav-item" id="nav-sign-up" to="/auth/register">
                                Sign Up
                            </NavLink>
                        </Nav>)
                    }

                </Navbar.Collapse>
            </div>
        </Navbar >
    )
}

export default Header;