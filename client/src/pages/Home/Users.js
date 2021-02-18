import React from 'react'
import { Col, Image } from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client';

import { useMessageDispatch, useMessageState } from '../../context/message';

const GET_USERS = gql`
query getAllUsers{
    users{
        username, imageUrl, createdAt, latestMessage{from, to, content, createdAt}
    }
}`;

export default function Users() {

    const [activeUser, setActiveUser] = React.useState('');
    const dispatch = useMessageDispatch();
    const { users } = useMessageState();

    const { loading } = useQuery(GET_USERS, {
        onCompleted: data => dispatch({ type: 'SET_USERS', payload: data.users }),
        onError: err => console.log(err),
    });

    let usersMarkup;
    if(!users || loading){
        usersMarkup = <p>Loading...</p>
    } else if (users.length === 0){
        usersMarkup = <p>No users have joined yet!</p>
    } else {
        usersMarkup = users.map((user) => (
            <div role="button" className={activeUser === user.username ? "user-div selectedUser d-flex p-3" : "user-div d-flex p-3"} key={user.username} onClick={() => {dispatch({type: 'SET_SELECTED_USER', payload: user.username}); setActiveUser(user.username)}}>
                <Image src={user.imageUrl ? user.imageUrl : 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_960_720.png'} roundedCircle className="mr-2"
                style={{ width: 50, height: 50, objectFit: 'cover' }} />
                <div>
                <p className="text-success">{user.username}</p>
                <p className="font-weight-light">
                    {user.latestMessage ? user.latestMessage.content : "say Hello !!"}
                </p>
                </div>
            </div>
        ))
    }

    return (
        <Col xs={4} className="px-0 bg-secondary">
            {usersMarkup}
        </Col>
    )
}
