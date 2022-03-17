import { FaUserAlt} from 'react-icons/fa';
import {IoIosAddCircleOutline} from 'react-icons/io'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a href="/profile" className="text-light"><FaUserAlt size={40} className="m-2"/></a>
                <a href="/add" className="text-light"><IoIosAddCircleOutline size={40} className="m-2"/></a>
            </div>
        </nav>
    );
}

export default Navbar;