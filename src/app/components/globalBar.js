"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function GlobalBar(props) {
  let loginStatus = null;
  try {
    const { data } = useSession();
    if (typeof data !== "undefined") {
      loginStatus = data;
      if (data) {
        localStorage.setItem("user", data);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" href="/">
            PMS
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-between">
          {loginStatus ? (
            <>
              <Nav>
                <NavDropdown title="Projects">
                  <Link className="dropdown-item" href="/projects/add">
                    Add Project
                  </Link>
                  <Link className="dropdown-item" href="/projects/list">
                    Project List
                  </Link>
                </NavDropdown>
                <NavDropdown title="Tasks">
                  <Link className="dropdown-item" href="/tasks/add">
                    Add Task
                  </Link>
                  <Link className="dropdown-item" href="/tasks/list">
                    Task List
                  </Link>
                </NavDropdown>
                <NavDropdown title="Activities">
                  <Link className='dropdown-item' href="/activities/add">
                    Add Activity
                  </Link>                            
                  <Link className='dropdown-item' href="/activities/list">
                    Activity List
                  </Link>
                </NavDropdown>
                <NavDropdown title="Contacts">
                  <Link className="dropdown-item" href="/contacts/list">
                    Contact List
                  </Link>
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown title={loginStatus.user.firstName + " " +loginStatus.user.lastName}>
                  <Link className="dropdown-item" href="/user-dashboard">
                    Dashboard
                  </Link>
                  <Link className="nav-link" href="#" onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                  </Link>
                </NavDropdown>
              </Nav>
            </>
          ) : props.isPublic ? (
            <Nav>
              <Link className="nav-link" href="#" onClick={() => signIn()}>
                Sign In
              </Link>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
