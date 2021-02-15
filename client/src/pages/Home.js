import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthDispatch } from '../context/auth'
import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
query getAllUsers{
    users{
    username
    email
    createdAt
  }
}`;

export default function Home(props) {
    const dispatch = useAuthDispatch();

    const { loading, data, error } = useQuery(GET_USERS);

    if(error){
        console.log(error);
    }

    if(data){
        console.log(data);
    }

    let usersMarkup;
    if(!data || loading){
        usersMarkup = <p>Loading...</p>
    } else if (data.users.length === 0){
        usersMarkup = <p>No users have joined yet!</p>
    } else {
        usersMarkup = data.users.map((user) => (
            <div key={user.username}>
                <p>{user.username}</p>
            </div>
        ))
    }

    const logout = () => {
        dispatch({ type:'LOGOUT' });
        props.history.push('/login');
    }
    return (
        <React.Fragment>
        <Row className="bg-white justify-content-around">
            <Link to="/login">
                <Button variant="link">Login</Button>
            </Link>
            <Link to="/register">
                <Button variant="link">Register</Button>
            </Link>
            <Link to="/login">
                <Button variant="link" onClick={logout}>Logout</Button>
            </Link>
        </Row>
        <Row>
            <Col xs={4}>
            {usersMarkup}
            </Col>
            <Col xs={8}>
                <p>Messages</p>
            </Col>
        </Row>
        </React.Fragment>
    )
}
