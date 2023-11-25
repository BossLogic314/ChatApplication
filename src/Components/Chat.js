import React from 'react';
import ReactDOM from 'react-dom/client';
import '../Styles/chat.css';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.chatClicked = this.chatClicked.bind(this);
        this.getDisplayPicture = this.getDisplayPicture.bind(this);
    }

    chatClicked() {
        this.props.chatClicked(this.props.username, true);
    }

    getDisplayPicture() {
        const uint8Array = new Uint8Array(this.props.displayPictureArrayBuffer);
        const blob = new Blob([ uint8Array ]);
        const blobURL = URL.createObjectURL(blob);
        return blobURL;
    }

    render() {
        const displayPictureBlobURL = this.getDisplayPicture();

        return (
            <div className='chat' onClick={ this.chatClicked }>

                <img className='displayPicture' src={ displayPictureBlobURL }></img>

                <div className='chatName'> { this.props.username } </div>
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