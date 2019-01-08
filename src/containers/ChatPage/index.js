import React from 'react';
import { connect } from 'react-redux';

class ChatPage extends React.Component {
    render() {
        return (
            <div>
                <p>Hellooooo</p>
            </div>
        )
    }
}

export default connect()(ChatPage);