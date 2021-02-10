import React from 'react'
import {Card, Container, Row, Col, Form, Button} from 'react-bootstrap';

export default function Register() {

    const [variables, setVariables] = React.useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      });
    
    const submitRegister = (e) => {
        e.preventDefault();
    
        console.log(variables);
    
    }

    return (
    <Container className="App pt-5">
      <Row className="bg-white py-5 justify-content-center">
        <Col className="col-sm-8 col-md-6 col-lg-4">
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitRegister}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={variables.username} onChange={ (e) => setVariables({...variables, username: e.target.value})}/>
            
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={variables.email} onChange={ (e) => setVariables({...variables, email: e.target.value})}/>
            
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={variables.password} onChange={ (e) => setVariables({...variables, password: e.target.value})}/>
            
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm your password" value={variables.confirmPassword} onChange={ (e) => setVariables({...variables, confirmPassword: e.target.value})}/>
            
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit">
              Register
            </Button>
          </div>
          
        </Form>
        </Col>
      </Row>
    </Container>
    )
}
