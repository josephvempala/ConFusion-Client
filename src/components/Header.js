import React, {useState} from 'react';
import {
    Button,
    Collapse,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    Container
} from 'reactstrap';
import {NavLink} from 'react-router-dom';

function Header({registerUser, loginUser, logoutUser, auth}) {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [loginForm, setLoginForm] = useState({});
    const [registerForm, setRegisterForm] = useState({});

    const handleLoginFormInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setLoginForm({
            ...loginForm,
            [name]:value
        });
    }

    const handleRegisterFormInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setRegisterForm({
            ...registerForm,
            [name]:value
        })
    }

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const toggleRegisterModal = () => {
        setIsRegisterModalOpen(!isRegisterModalOpen);
    }

    const handleRegister = (event) => {
        toggleRegisterModal();
        registerUser(registerForm);
        event.preventDefault();
    }

    const handleLogin = (event) => {
        toggleModal();
        loginUser(loginForm);
        event.preventDefault();
    }

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <>
            <Navbar dark expand="md">
                <Container>
                    <NavbarToggler aria-label="navbar" onClick={toggleNav}/>
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"/> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span className="fa fa-info fa-lg"/> About
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"/> Menu
                                </NavLink>
                            </NavItem>
                            {auth.isAuthenticated &&
                                <NavItem>
                                    <NavLink className="nav-link" to="/favorites">
                                        <span className="fa fa-heart fa-lg"/> Favorites
                                    </NavLink>
                                </NavItem>
                            }
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-address-card fa-lg"/> Contact
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {!auth.isAuthenticated ?
                                    <Button className="loginbtn" outline onClick={toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"/> Login
                                        {auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"/>
                                            : null
                                        }
                                    </Button>
                                    :
                                    <div>
                                        <div className="navbar-text mr-3">{auth.user.username}</div>
                                        <Button className="loginbtn" outline onClick={handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"/> Logout
                                            {auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"/>
                                                : null
                                            }
                                        </Button>
                                    </div>
                                }

                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                    onChange={handleLoginFormInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                                    onChange={handleLoginFormInputChange}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                    onChange={handleLoginFormInputChange}/>
                                Remember me
                            </Label>
                        </FormGroup>
                        <FormGroup className="d-flex">
                            <Button type="submit" value="submit" color="primary">Login</Button>
                            <Button className="ml-auto " onClick={toggleRegisterModal} id="register" type="button" value="register" color="primary">Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={isRegisterModalOpen} toggle={toggleRegisterModal}>
                <ModalHeader toggle={toggleRegisterModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleRegister}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                    onChange={handleRegisterFormInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                                    onChange={handleRegisterFormInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="firstname">First Name</Label>
                            <Input type="text" id="firstname" name="firstname"
                                    onChange={handleRegisterFormInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input type="lastname" id="lastname" name="lastname"
                                    onChange={handleRegisterFormInputChange}/>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Register</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default Header;