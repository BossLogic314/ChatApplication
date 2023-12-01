import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from "../Commons";
import '../Styles/user-profile-pop-up.css';

const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;

export default class UserProfilePopUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            displayPictureArrayBuffer: [],
        }

        this.closeUserProfilePopUp = this.closeUserProfilePopUp.bind(this);
        this.selectNewDisplayPicture = this.selectNewDisplayPicture.bind(this);
        this.newDisplayPictureSelected = this.newDisplayPictureSelected.bind(this);
    }

    closeUserProfilePopUp(event) {
        this.props.closeUserProfilePopUp(event);
    }

    selectNewDisplayPicture() {
        // Clicking the input tag (the input tag is hidden)
        document.getElementsByClassName('select-new-display-picture-button')[0].click();
    }

    newDisplayPictureSelected(event) {
        const currentUser = this.props.currentUser;
        var demo = this.props.newDisplayPictureSelected;

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
                        { 'key': 'user', 'value': currentUser },
                        { 'key': 'displayPictureArrayBuffer', 'value': uint8Array },
                    ];

                    const result = Commons.makeXhrRequest(
                        'GET', 'http://localhost:8080/new-display-picture-selected', args, true, false);

                    // Session timed out, the user has to log in again
                    if (result == null) {
                        this.props.userLoggedOut();
                    }

                    demo(array);
                },
                MIME_TYPE,
                QUALITY
            );
        }
    }

    render() {

        if (!this.props.displayUserProfile) {
            return <></>;
        }

        return(
            <div className='user-profile-pop-up-overlay' onClick={ this.closeUserProfilePopUp }>
                <div className='user-profile-pop-up-overlay-nav-bar'>
                    <div className='logout-box'>
                        <div className='logout-button' onClick={ this.props.logoutButtonClicked }>Logout</div>
                    </div>
                </div>

                <div className='display-picture-box'>
                    <img
                        className='display-picture-holder'
                        src={ Commons.getDisplayPictureURL(this.props.displayPictureArrayBufferOfCurrentUser) }>
                    </img>

                    <div className='change-display-picture-button' onClick={ this.selectNewDisplayPicture }>
                        Change display picture
                    </div>

                    <input
                        className='select-new-display-picture-button'
                        id='getFile' type='file' accept='image/*'
                        onChange={ this.newDisplayPictureSelected }></input>
                </div>
            </div>
        );
    }
}