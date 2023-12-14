import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import '../Styles/chat-profile-pop-up.css';

export default class ChatsWindow extends React.Component {

    constructor(props) {
        super(props);

        this.closeChatProfilePopUp = this.closeChatProfilePopUp.bind(this);
    }

    closeChatProfilePopUp(event) {
        this.props.closeChatProfilePopUp(event);
    }

    render() {
        if (!this.props.displayChatProfile) {
            return <></>;
        }

        return(
            <div className='chat-profile-pop-up-overlay' onClick={ this.closeChatProfilePopUp }>
                <div className='chat-profile-pop-up-overlay-nav-bar'>
                </div>

                <div className='display-picture-box'>
                    <img
                        className='display-picture-holder'
                        src={ Commons.getDisplayPictureURL(this.props.chatDisplayPictureArrayBuffer) }>
                    </img>

                    <div className='chat-name'>{ this.props.chatName }</div>
                </div>
            </div>
        );
    }
}