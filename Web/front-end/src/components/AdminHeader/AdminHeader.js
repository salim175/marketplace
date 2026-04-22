import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logout from '../../Pages/AdminLogout';

import './AdminHeader.css'
function AdminHeader()
{
    return (
        <Navbar collapseOnSelect bg="ligth" variant="light">
            <div className="container">

                <Navbar.Brand>
                    <NavLink className="navbar-brand" to="/admin">LibanCoin</NavLink>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='responsive-navbar-nav' />

                <Navbar.Collapse id="responsive-navbar-nav">

                    <NavLink
                        className="nav-item"
                        id="nav-logout"
                        to="/auth/admin"
                        onClick={() =>
                        {
                            logout();
                        }}>
                        Log out
                    </NavLink>

                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default AdminHeader;