"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

export default function GlobalBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                    <Navbar.Brand>
                        <Link className='nav-link' href="/">PMS</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' href="/user-dashboard">Dashboard</Link>
                            <NavDropdown title="Contacts" id="basic-nav-dropdown">
                                <Link className='dropdown-item' href="#">Add Contact</Link>
                                <Link className='dropdown-item' href="/contacts/list">Contact List</Link>
                            </NavDropdown>
                            <NavDropdown title="Projects" id="basic-nav-dropdown">
                                <Link className='dropdown-item' href="/projects/add-project">Add Project</Link>                            
                                <Link className='dropdown-item' href="/projects/list">Project List</Link>
                            </NavDropdown>
                            <Link className='nav-link' href="/resources-utilization">Resources Utilization</Link>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}