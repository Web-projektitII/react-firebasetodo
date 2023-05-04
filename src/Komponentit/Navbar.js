import { Navbar, NavbarToggler, Collapse, Nav } from 'reactstrap'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
/* Huom. Tässä on jätetty pois Container ja NavItem. Navigointipalkki pysyisi Linkin
   alapuolella ilman inline-block -määritystä, ks. index.css. NavLink on korvattu
   routerin NavLinkillä, jotta activeClassName toimisi.
*/    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
      <Navbar color="light" light expand="md" className="mb-3">
      <Link to="/" className="navbar-brand">firebasetodo</Link>
      <NavbarToggler onClick={toggle} className="float-end"/>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavLink to="/" exact activeClassName="active">Home</NavLink>
          <NavLink to="/firebasetodo" activeClassName="active">Firebasetodo</NavLink>
        </Nav>
      </Collapse>
      </Navbar>
    );
  }
  
export default NavBar