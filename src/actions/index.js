class ChatActions {
    setCorrectChat(name) {
        return {
            type: 'SET_CORRECT_CHAT',
            name
        }
    }
    sendMessage(users, msg) {
        const data = {
            ...users,
            [msg.to]: {
                history: [...users[msg.to].history].concat(msg),
                logged: true
            }
        }
        const localData = {
            ...users,
            [msg.to]: {
                history: [...users[msg.to].history].concat(msg) 
            }
        }
        localStorage.setItem(`myChatData_${msg.from}`, JSON.stringify(localData));
        return {
            type: 'SEND_MESSAGE',
            data
        }
    }
    recieveMessage(users, msg) {
        const data = {
            ...users,
            [msg.from]: {
                history: users[msg.from] ? [...users[msg.from].history].concat(msg) : [msg],
                logged: true
            }
        }
        const localData = {
            ...users,
            [msg.from]: {
                history: users[msg.from] ? [...users[msg.from].history].concat(msg) : [msg]
            }
        }
        localStorage.setItem(`myChatData_${msg.to}`, JSON.stringify(localData));
        return {
            type: 'RECEIVE_MESSAGE',
            data
        }
    }
    login(data) {
        return {
            type: 'LOGIN',
            data
        }
    }
    logout() {
        return {
            type: 'LOGOUT'
        }
    }
    setConnectedUsers(data) {
        return {
            type: "SET_CONNECTED_USERS",
            data
        }
    }
}

export default ChatActions;