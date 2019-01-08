import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:4001');

export default class ServerAPI {

    login(data, callback) {
        socket.emit('LOGIN', data);
        socket.on(`LOGIN_${data.name}`, (data) => {
            return callback(data)
        })
    }

    sendMessage(data) {
        socket.emit('SEND_MESSAGE', data)
    }

    recieveMessage(name, callback) {
        socket.on(`RECEIVE_MESSAGE_${name}`, (data) => {
            callback(data);
        })
    }

    connectedUsers(callback) {
        socket.on('CONNECTED_USERS', (data) => {
            return callback(data);
        })
    }
    newUser(callback) {
        socket.on('NEW_USER', (data) => {
            callback(data);
        })
    }
    dropUser(callback) {
        socket.on('DROP_USER', (data) => {
            callback(data);
        })
    }
    logout() {
        socket.emit('LOGOUT');
    }
}
