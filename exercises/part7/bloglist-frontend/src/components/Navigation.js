import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import Logout from "./Logout";

const Navigation = ({user}) => {
    const padding = {
        padding: 5
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/">blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        {user ? <Link style={padding} to="/users">users</Link> : null}
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        {user
                            ? <div>user: <strong>{user.username}</strong> </div>
                            : <Link style={padding} to="/login">login</Link>
                        }
                    </Nav.Link>
                    <Logout user={user}/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
