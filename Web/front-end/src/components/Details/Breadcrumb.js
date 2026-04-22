import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BreadcrumbNav({ params })
{
    return (
        <Breadcrumb>
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to={`/categories/details`}>page 1</Link>
            </li>
        </Breadcrumb>
    )
}

export default BreadcrumbNav;