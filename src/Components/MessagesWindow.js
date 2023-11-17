import React from 'react';
import ReactDOM from 'react-dom/client';
import Message from './Message';
import '../Styles/messages-window.css';

export default class MessagesWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messageText : '',
        }

        this.sendButtonClicked = this.sendButtonClicked.bind(this);
        this.keyEntered = this.keyEntered.bind(this);
    }

    sendButtonClicked() {
        // Clearing the text in the message box
        this.setState({ messageText: '' });
        this.props.sendButtonClicked();
    }

    keyEntered(event) {

        this.setState({ messageText: event.target.text });

        // If the user presses 'Enter'
        if (event.key === 'Enter' && this.state.messageText != '') {
            this.sendButtonClicked();
        }
    }

    render() {

        var readMessages = this.props.readMessages.map(
            (m, index) =>
                <Message
                    key={ index }
                    currentUser={ this.props.currentUser }
                    username={ m.from }
                    message={ m.message }
                    year={ m.year }
                    month={ m.month }
                    date={ m.date }
                    hours={ m.hours }
                    minutes={ m.minutes }
                    seconds={ m.seconds }
                />
        );

        var unreadMessages = this.props.unreadMessages.map(
            (m, index) =>
                <Message
                    key={ index }
                    currentUser={ this.props.currentUser }
                    username={ m.from }
                    message={ m.message }
                    year={ m.year }
                    month={ m.month }
                    date={ m.date }
                    hours={ m.hours }
                    minutes={ m.minutes }
                    seconds={ m.seconds }
                />
        );

        return (
            <div className="messages-window">
                <div className="messages">
                    { readMessages }
                    { unreadMessages.length != 0 ? <div className='unread-messages-heading'>Unread Messages</div> : <></> }
                    { unreadMessages }
                </div>

                <div className="typing-box">
                    <input
                        className="message-holder"
                        placeholder="Type here..."
                        value={ this.state.messageText }
                        onChange={ this.keyEntered }
                    >
                    </input>
                    <div className='send-button' onClick={ this.sendButtonClicked }>
                        <div className='send-shape'></div>
                    </div>
                </div>
            </div>
        )
    }
}