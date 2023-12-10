import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import '../Styles/chat.css';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.chatClicked = this.chatClicked.bind(this);
        this.videoCallButtonClicked = this.videoCallButtonClicked.bind(this);
    }

    chatClicked() {
        this.props.chatClicked(this.props.username, true);
    }

    videoCallButtonClicked() {
        this.props.videoCallButtonClicked(this.props.username);
    }

    render() {
        return (
            <div className='chat' onClick={ this.chatClicked }>

                <img className='displayPicture' src={ Commons.getDisplayPictureURL(this.props.displayPictureArrayBuffer) }></img>
                <div className='chatName'> { this.props.username } </div>
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