import { FaUserAlt} from 'react-icons/fa';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
            <div className="container-fluid">
                <div className="d-flex flex-row justify-content-between">
                    <a href="" className="text-dark"><FaUserAlt size={40} className="m-2"/></a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;