import React from 'react'
import { gql, useLazyQuery } from '@apollo/client';
import { Row, Col, Button, Image } from 'react-bootstrap'
import { useMessageDispatch, useMessageState } from '../../context/message';

const GET_MESSAGES = gql`
query getMessages($from: String!){
    getMessages(from: $from){
        from, to, content, createdAt
    }
}`;

export default function Messages() {
    const { selectedUser } = useMessageState();
    const [getMessages, { loading: messagesLaoding, data: messagesData, error: errorMessages }] = useLazyQuery(GET_MESSAGES);
    
    React.useEffect(() => {
        if(selectedUser){
            getMessages({ variables: { from: selectedUser}});
        }
    }, [selectedUser,getMessages]);

    if(messagesData){ console.log(messagesData) }
    if(errorMessages){ console.log(errorMessages) }

    return (
        <Col key="messagesPart" xs={8}>
            {messagesData && messagesData.getMessages.length > 0 ? (
                messagesData.getMessages.map((message) => (
                    <p key={message.id}> {message.content} </p>
                )) 
            ) : <p key="genesis" className="text-center"> Say Hello ! </p>}
        </Col>
    )
}
