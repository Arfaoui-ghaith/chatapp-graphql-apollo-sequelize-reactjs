import React from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import { useAuthDispatch } from '../context/auth';

const LOGIN_USER = gql`
  query login($username: String! $password: String! ) {
    login(username:$username password:$password) {
      token
    }
  }
`;


export default function Login(props) {

    const [variables, setVariables] = React.useState({
        username: '',
        password: ''
      });

    const [errors, setErrors] = React.useState({});

    const dispatch = useAuthDispatch();
    
    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
      onCompleted(data){
          console.log(data);
          /*localStorage.setItem('tokenCHATAPP',data.login.token);*/
          dispatch({ type:'LOGIN', payload: data.login });
          props.history.push('/');
      },
      onError(err){
        console.log(err);
        /*setErrors(err.graphQLErrors[0].extensions.errors);*/
      }

    });
    
    const submitLogin = (e) => {
        e.preventDefault();
    
        console.log(variables);
        loginUser({ variables })
    }

    return (
    <Container className="App pt-5">
      <Row className="bg-white py-5 justify-content-center">
        <Col className="col-sm-8 col-md-6 col-lg-4">
        <h1 className="text-center">Login</h1>
        <Form onSubmit={submitLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={errors.username && 'text-danger'}>
              { errors.username ?? 'Username'}
            </Form.Label>
            <Form.Control className={errors.username && 'is-invalid'} type="text" placeholder="Enter username" value={variables.username} onChange={ (e) => setVariables({...variables, username: e.target.value})}/>
            
          </Form.Group>
          
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={errors.password && 'text-danger'}>
              { errors.password ?? 'Password'}
            </Form.Label>
            <Form.Control className={errors.password && 'is-invalid'} type="password" placeholder="Enter password" value={variables.password} onChange={ (e) => setVariables({...variables, password: e.target.value})}/>
            
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              { loading ? 'Loading...' : 'Login'}
            </Button>
          </div>
          
        </Form>
        </Col>
      </Row>
    </Container>
    )
}

