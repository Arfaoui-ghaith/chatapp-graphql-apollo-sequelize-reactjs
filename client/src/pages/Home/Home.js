import React from 'react'
import { Row, Col, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthDispatch } from '../../context/auth'
import Users from './Users';
import Messages from './Messages';


export default function Home(props) {
    const [selectedUser, setSelectedUser] = React.useState(null);

    const dispatch = useAuthDispatch();

    const logout = () => {
        dispatch({ type:'LOGOUT' });
        window.location.href = '/login';
    }
    return (
        <React.Fragment>
        <Row className="bg-white justify-content-around mb-1">
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
        <Row className="bg-white">
          <Users key="users" />
          <Messages key="messages" />
        </Row>
        </React.Fragment>
    )
}
