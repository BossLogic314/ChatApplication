import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import '../Styles/chat-profile-pop-up.css';

const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;

export default class ChatsWindow extends React.Component {

    constructor(props) {
        super(props);

        this.closeChatProfilePopUp = this.closeChatProfilePopUp.bind(this);
        this.selectNewDisplayPicture = this.selectNewDisplayPicture.bind(this);
        this.newDisplayPictureSelected = this.newDisplayPictureSelected.bind(this);
    }

    closeChatProfilePopUp(event) {
        this.props.closeChatProfilePopUp(event);
    }

    selectNewDisplayPicture() {
        // Clicking the input tag (the input tag is hidden)
        document.getElementsByClassName('chat-profile-select-new-display-picture-button')[0].click();
    }

    newDisplayPictureSelected(event) {
        const chatName = this.props.chatName;
        var demo = this.props.newDisplayPictureSelectedOfChatProfile;

        // Getting the selected file
        const file = event.target.files[0];
        const blobURL = URL.createObjectURL(file);

        // Creating a new image of sustainable size
        const img = new Image();
        img.src = blobURL;
        img.onload = function () {
            URL.revokeObjectURL(this.src);
            const newHeight = 50;
            const newWidth = 50;
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            canvas.toBlob(
                async (blob) => {
                    var arrayBuffer = await blob.arrayBuffer();
                    var uint8Array = new Uint8Array(arrayBuffer);
                    var array = Array.from(uint8Array);

                    const args = [
                        { 'key': 'chat', 'value': chatName },
                        { 'key': 'displayPictureArrayBuffer', 'value': uint8Array },
                    ];

                    const result = Commons.makeXhrRequest(
                        'GET', 'http://localhost:8080/new-display-picture-selected', args, true, false);

                    // Session timed out, the user has to log in again
                    if (result == null) {
                        this.props.displayLoginPage();
                    }

                    demo(chatName, array);
                },
                MIME_TYPE,
                QUALITY
            );
        }
    }

    render() {
        if (!this.props.displayChatProfile) {
            return <></>;
        }

        var groupChatParticipants = '';

        if (this.props.chatParticipants != null) {
            const len = this.props.chatParticipants.length;
            for (var i = 0; i < len; ++i) {

                groupChatParticipants += `${this.props.chatParticipants[i]}`;

                if (i != len - 1) {
                    groupChatParticipants += ',';
                }
            }
            groupChatParticipants = 'Participants: ' + groupChatParticipants;
        }

        return(
            <div className='chat-profile-pop-up-overlay' onClick={ this.closeChatProfilePopUp }>
                <div className='chat-profile-pop-up-overlay-nav-bar'></div>

                <div className='chat-profile-display-picture-box'>
                    <div className='chat-name'>{ this.props.chatName }</div>

                    <img
                        className='chat-profile-display-picture-holder'
                        src={ Commons.getDisplayPictureURL(this.props.chatDisplayPictureArrayBuffer) }>
                    </img>

                    {
                        this.props.chatParticipants == null ? (<></>) :
                        (<>
                            <div className='chat-profile-participants'>{ groupChatParticipants }</div>

                            <div className='chat-profile-change-display-picture-button' onClick={ this.selectNewDisplayPicture }>
                                Change display picture
                            </div>

                            <input
                                className='chat-profile-select-new-display-picture-button'
                                id='getFile' type='file' accept='image/*'
                                onChange={ this.newDisplayPictureSelected }>
                            </input>
                        </>)
                    }
                </div>
            </div>
        );
    }
}