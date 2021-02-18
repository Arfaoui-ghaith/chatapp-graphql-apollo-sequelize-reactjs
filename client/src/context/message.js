import React from 'react';

const MessageStateContext = React.createContext();
const MessageDispatchContext = React.createContext();

const messageReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET_USER_MESSAGES':
            const {username, messages} = action.payload;
            return {}
        case 'SET_SELECTED_USER':
            return {
                ...state,
                selectedUser: action.payload
            }
        default:
            throw new Error(`Unkonwn action type: ${action.type}`);
    }
}

export const MessageProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(messageReducer, { users: null, selectedUser: null });

    return (
        <MessageDispatchContext.Provider value={dispatch}>
            <MessageStateContext.Provider value={state}>
                {children}
            </MessageStateContext.Provider>
        </MessageDispatchContext.Provider>
    );
}

export const useMessageState = () => React.useContext(MessageStateContext);
export const useMessageDispatch = () => React.useContext(MessageDispatchContext);