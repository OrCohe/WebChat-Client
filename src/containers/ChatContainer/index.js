import React from 'react';
import { connect } from 'react-redux';
import ChatActions from '../../actions';
import LoginPage from '../LoginPage';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import ChatRoom from '../../components/ChatRoom';
import ServerAPI from '../../server'

const ServerApi = new ServerAPI();

const ChatActionss = new ChatActions();

const headerStyle = {
    height: '5vh',
    width: '100%'
}

const containerStyle = {
    display: 'flex',
    height: '90vh',
    width: '100%'
}

const listStyle = {
    flex: 1,
    height: '100%'
}

const mainStyle = {
    flex: 5,
    marginLeft: '20px'
}

class ChatContainer extends React.Component {
    userClicked(user) {
        if(user !== this.props.correctChat) {
            this.props._setCorrectChat(user);
        }
    }
    sendMessage(data) {
        this.props._sendMessage(this.props.users, data);
        ServerApi.sendMessage(data);
    }
    loginSuccess(data) {
        this.props._login(data);
        ServerApi.connectedUsers((data) => {
            const newData = JSON.parse(localStorage.getItem(`myChatData_${this.props.name}`));
            const users = {...data, ...newData};
            const names = Object.keys(data);
            names.forEach((user) => {
                users[user].logged = true;
            })
            this.props._setConnectedUsers(users);

        });
        ServerApi.newUser((data) => {
            let newData = {...this.props.users};
            if (newData[data]) {
                newData[data].logged = true;
            } else {
                newData[data] = {history: [], logged: true}
            }
            this.props._setConnectedUsers(newData);
        })
        ServerApi.dropUser((data) => {
            let newData = {...this.props.users};
            newData[data].logged = false;
            this.props._setConnectedUsers(newData);
        })
        ServerApi.recieveMessage(this.props.name,(data) => {
            this.props._recieveMessage(this.props.users, data);
        })
    }
    logout() {
        ServerApi.logout();
        this.props._logout();
    }
    render() {

        if (!this.props.logged) {
            return (
                <div>
                    <Header style={headerStyle} name={this.props.name} logged={this.props.logged}/>
                    <LoginPage loginSuccess={(data) => this.loginSuccess(data)} />
                </div>
            )
        }
        else return (
                <div>  
                    <Header style={headerStyle} name={this.props.name} logged={this.props.logged} logoutBut={() => this.logout()}/>
                    <div style={containerStyle}>
                        <div style={listStyle}>
                            <SideBar  name={this.props.name} users={this.props.users} clicked={(name) => this.userClicked(name)}/>
                        </div>
                        <div style={mainStyle}>
                            <ChatRoom sendMessage={(data) => this.sendMessage(data)} 
                            myName={this.props.name} 
                            isLogged={this.props.correctChat ? this.props.users[this.props.correctChat].logged : null} 
                            name={this.props.correctChat} 
                            history={this.props.correctChat ? this.props.users[this.props.correctChat].history : null}/>
                        </div>
                    </div>
                    
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        logged: state.chatReducer.logged,
        name: state.chatReducer.name,
        users: state.chatReducer.users,
        correctChat: state.chatReducer.correctChat
       }
}

const mapDispatchToProps = dispatch => {
    return {
        _setCorrectChat: (name) => dispatch(ChatActionss.setCorrectChat(name)),
        _sendMessage: (users, data) => dispatch(ChatActionss.sendMessage(users, data)),
        _recieveMessage: (users, data) => dispatch(ChatActionss.recieveMessage(users, data)),
        _setConnectedUsers: (data) => dispatch(ChatActionss.setConnectedUsers(data)),
        _login: (data) => dispatch(ChatActionss.login(data)),
        _logout: () => dispatch(ChatActionss.logout())
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);