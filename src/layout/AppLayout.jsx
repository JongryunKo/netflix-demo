import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()
  const searchByKeyword=(event)=>{
    event.preventDefault();
    //url을 바꿔주기
    navigate(`/movies?q=${keyword}`)
    setKeyword("")
  }
  return (
    <div style={{backgroundColor: "black"}}>
      <Navbar expand="lg" className="" style={{backgroundColor:'black'}}>
        <Container fluid>
          <Navbar.Brand href="/"><img style={{width:200, height:60}} src='https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg'></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/" style={{color:'white'}}>Home</Nav.Link>
              <Nav.Link href='movies' style={{color:'white'}}>Movies</Nav.Link>

            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword} onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"red"}} onClick={searchByKeyword}/>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default AppLayout