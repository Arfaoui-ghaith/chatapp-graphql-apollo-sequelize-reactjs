import React from 'react'
import { gql, useLazyQuery } from '@apollo/client';
import { Row, Col, Button, Image } from 'react-bootstrap'
import { useMessageDispatch, useMessageState } from '../../context/message';
import Message from './Message';



const GET_MESSAGES = gql`
query getMessages($from: String!){
    getMessages(from: $from){
        from, to, content, createdAt
    }
}`;

export default function Messages() {
    const style={
        "height": "500px",
        "overflow-y": "scroll",
    }

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
        <Col key="messagesPart" xs={8} style={style} className="my-2 d-flex flex-column-reverse">
            {messagesData && messagesData.getMessages.length > 0 ? (
                messagesData.getMessages.map((message) => (
                    <Message key={message.id} message={message} />
                )) 
            ) : <p className="text-center"> Say Hello ! </p>}
        </Col>
    )
}
