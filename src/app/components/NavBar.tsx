import {h, JSX} from 'preact';
import Navbar from 'react-bootstrap/Navbar';
import {Container, Nav, NavDropdown} from 'react-bootstrap';

export interface NavProps {
    title: string
}

export const NavigationBar = (): JSX.Element => {
    return <Navbar collapseOnSelect bg='primary' variant='dark'>
        <Container>
            <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link href='#features'>Features</Nav.Link>
                    <Nav.Link href='#pricing'>Pricing</Nav.Link>
                    <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href='#deets'>More deets</Nav.Link>
                    <Nav.Link eventKey={2} href='#memes'>
                        Dank memes
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>;
};
