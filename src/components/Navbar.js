import {FaUserAlt, FaUserEdit} from 'react-icons/fa';
import {IoIosAddCircleOutline} from 'react-icons/io'

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a href="/profile" className="text-light"><FaUserEdit size={40} className="m-2"/></a>
                <h4 className="text-light">Welcome {localStorage.getItem('Name')}!</h4>
                <a href="/addCourse" className="text-light"><IoIosAddCircleOutline size={40} className="m-2"/></a>
            </div>
        </nav>
    );
}

export default Navbar;