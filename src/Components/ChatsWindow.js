import React from 'react';
import ReactDOM from 'react-dom/client';
import Chat from './Chat';
import '../Styles/chats-window.css';

export default class ChatsWindow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var chats = this.props.chats.map(
            (element, index) =>
                < Chat
                    key={ element }
                    username={ element }
                    displayPictureArrayBuffer={ this.props.displayPictureArrayBuffers[index] }
                    numberOfUnreadMessages={ this.props.numberOfUnreadMessagesFromEachChat[index] }
                    chatClicked={ this.props.chatClicked }
                />
        );

        return (
            <div className="chats-window">
                <div className='chat-box'>
                    <input className='chat-search' placeholder='Search here' onChange={ this.props.searchChats }></input>
                    { chats }
                </div>

                <div className='create-group-chat'>
                    <button className='create-group-chat-button' onClick={ this.props.createGroupChatPopUpClicked }>
                        New group
                    </button>
                </div>
            </div>
        )
    }
}