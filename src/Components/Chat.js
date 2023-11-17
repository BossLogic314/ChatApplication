import React from 'react';
import ReactDOM from 'react-dom/client';
import '../Styles/chat.css';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.chatClicked = this.chatClicked.bind(this);
    }

    chatClicked() {
        this.props.chatClicked(this.props.username);
    }

    render() {
        return (
            <div className='chat' onClick={ this.chatClicked }>
                <div className='username'> { this.props.username } </div>
                {
                    this.props.numberOfUnreadMessages != 0 ?
                        <div className='numberOfUnreadMessages'>
                            { this.props.numberOfUnreadMessages }
                        </div>
                    :
                        <></>
                }
            </div>
        )
    }
}