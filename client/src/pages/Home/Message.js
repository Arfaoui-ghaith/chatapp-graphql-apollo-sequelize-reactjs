import React from 'react';
import { useAuthState } from '../../context/auth';

export default function Message({message}) {

    const { user } = useAuthState();
    const sent = message.from === user.payload.username

    if (sent) {
        return (
        <div className="d-flex my-3 ml-auto">
            <div className="py-2 px-3 rounded-pill bg-primary">
                <p className="text-white" key={ message.id }>{ message.content }</p>
            </div>
        </div>
        )
    }
    return (
        <div className="d-flex my-3 mr-auto">
            <div className="py-2 px-3 rounded-pill bg-secondary">
                <p className="text-black" key={ message.id }>{ message.content }</p>
            </div>
        </div>
    )
}
