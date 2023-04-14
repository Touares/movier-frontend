import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'

class Navbar extends Component {
    render() { 
        const {user} = this.props;
        console.log(user);
        return (
            <nav style={{height:'60px'}} className="navbar navbar-expand-sm navbar-dark bg-primary">
                <NavLink style={{marginLeft:'30px'}} className="navbar-brand" to="/">Vidly</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/movies">Movies </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Customers</NavLink>
                        </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                    </li>
                    { !user &&
                        (<React.Fragment>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>                        
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>                        
                    </li>
                    </React.Fragment>)
                    }
                    { user &&
                        (<React.Fragment>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">{user.username}</NavLink>                        
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>                        
                    </li>
                    </React.Fragment>)
                    }
                    </ul>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;