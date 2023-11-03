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
                            <Link className='nav-link' href="/user-dashboard?id=3">Dashboard</Link>
                            <NavDropdown title="Contacts">
                                <Link className='dropdown-item' href="#">Add Contact</Link>
                                <Link className='dropdown-item' href="/contacts/list">Contact List</Link>
                            </NavDropdown>
                            <NavDropdown title="Projects">
                                <Link className='dropdown-item' href="/projects/add">Add Project</Link>                            
                                <Link className='dropdown-item' href="/projects/list">Project List</Link>
                            </NavDropdown>
                            <NavDropdown title="Tasks">
                                <Link className='dropdown-item' href="/tasks/add">Add Task</Link>                            
                                <Link className='dropdown-item' href="/tasks/list">Task List</Link>
                            </NavDropdown>
                            <NavDropdown title="Activities">
                                <Link className='dropdown-item' href="/activities/add">Add Activity</Link>                            
                                <Link className='dropdown-item' href="/activities/list">Activity List</Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}