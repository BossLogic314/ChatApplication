import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import '../Styles/chat.css';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.chatClicked = this.chatClicked.bind(this);
        this.videoCallButtonClicked = this.videoCallButtonClicked.bind(this);
        this.displayPictureClicked = this.displayPictureClicked.bind(this);
    }

    chatClicked(event) {
        // When not to display messages
        if (event.target.className != 'chat') {
            return;
        }
        this.props.chatClicked(this.props.chatName, true);
    }

    videoCallButtonClicked() {
        this.props.videoCallButtonClicked(this.props.chatName);
    }

    displayPictureClicked() {
        this.props.displayPictureClicked(this.props.chatName);
    }

    render() {
        return (
            <div className='chat' onClick={ this.chatClicked }>

                <img className='displayPicture'
                    src={ Commons.getDisplayPictureURL(this.props.displayPictureArrayBuffer) }
                    onClick={ this.displayPictureClicked }>
                </img>
                <div className='chatName'> { this.props.chatName } </div>
                <div className='video-call-button' onClick={ this.videoCallButtonClicked }>Call</div>
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