import React from 'react';
import moment from 'moment'
import {ListGroup, ListGroupItem, Button, FormControl, Col, FormGroup} from 'react-bootstrap';
class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        }
    }
    render() {
        if (this.props.name) return (
            <div style={{top: '5%', position: 'relative'}}>
                <ListGroup>
                    <div style={{height: '75vh', overflowX: 'hidden', overflowY: 'scroll'}}>
                        {this.props.history.length > 0 ? 
                            this.props.history.map((chat, key) => {
                                return (
                                    <FormGroup key={key} style={{width: '100%'}}>
                                        <Col xs={12}>
                                            <ListGroupItem style={{float: this.props.myName === chat.from ? 'right' : 'left'}} bsStyle={this.props.myName === chat.from ? "success" : null}>[{chat.date}:{chat.time}] ->  {chat.msg}</ListGroupItem>
                                        </Col>
                                    </FormGroup>
                                )
                            }): null}
                    </div>
                    
                        <Col xs={9}>
                            <FormControl type="text" value={this.state.msg} placeholder="Type a message" onChange={(evt =>  this.setState({msg: evt.target.value}))} />
                        </Col>
                        <Col xs={3}>
                            <Button disabled={this.state.msg.trim() && this.props.isLogged ? false : true} onClick={() => { 
                                this.props.sendMessage({
                                    from: this.props.myName,
                                    to: this.props.name,
                                    time: moment().format('HH:mm'),
                                    date: moment().format('DD/MM/YYYY'),
                                    msg: this.state.msg
                                }); 
                                this.setState({msg: ''});
                            }}>Send</Button>
                        </Col>
                </ListGroup>
            </div>
        ); 
        else return (
            <div style={{top: '5%', position: 'relative'}}>
                <p>Selent User to chat</p>
            </div>
        )
    }
}

export default ChatRoom;