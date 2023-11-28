import React from 'react';
import ReactDOM from 'react-dom/client';
import Request from "../Request";
import '../Styles/user-profile-pop-up.css';

export default class UserProfilePopUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            displayPictureArrayBuffer: [],
        }

        this.getDisplayPicture = this.getDisplayPicture.bind(this);
        this.closeUserProfilePopUp = this.closeUserProfilePopUp.bind(this);
    }

    getDisplayPicture() {
        const uint8Array = new Uint8Array(this.props.displayPictureArrayBufferOfCurrentUser);
        console.log(this.props.displayPictureArrayBufferOfCurrentUser);
        const blob = new Blob([ uint8Array ]);
        const blobURL = URL.createObjectURL(blob);
        return blobURL;
    }

    closeUserProfilePopUp(event) {
        this.props.closeUserProfilePopUp(event);
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
                    <img className='display-picture-holder' src={ this.getDisplayPicture() }></img>

                    <div className='change-display-picture-button'>
                        Change display picture
                    </div>
                </div>
            </div>
        );
    }
}