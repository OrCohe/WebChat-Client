import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

const SideBar = ({users, clicked, name}) =>  (
    <nav style={{top: '5%', position: 'relative'}}>
        <ListGroup>
            {Object.keys(users).map((user,key) => {
                if (user === name || !users[user].logged) return null;
                let lastMsg = null;
                if (users[user].history.length > 0) {
                    const last = Object.keys(users[user].history)[Object.keys(users[user].history).length-1];
                    lastMsg = `${(name === users[user].history[last].from ? 'You: ' : `${users[user].history[last].from}: `)}${users[user].history[last].msg}`;
                }
                
                return (
                    <ListGroupItem header={user} bsStyle="info" key={key} onClick={() => clicked(user)}>{lastMsg}</ListGroupItem>
                )
            })}
        </ListGroup>
    </nav>
);

export default SideBar;