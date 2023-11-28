import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from "../Commons";
import '../Styles/user-profile-pop-up.css';

export default class UserProfilePopUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            displayPictureArrayBuffer: [],
        }

        this.closeUserProfilePopUp = this.closeUserProfilePopUp.bind(this);
        this.selectNewDisplayPicture = this.selectNewDisplayPicture.bind(this);
    }

    closeUserProfilePopUp(event) {
        this.props.closeUserProfilePopUp(event);
    }

    selectNewDisplayPicture() {
        // Clicking the input tag
        document.getElementsByClassName('select-new-display-picture-button')[0].click();
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

                    <input className='select-new-display-picture-button' id='getFile' type='file' accept='image/*'></input>
                </div>
            </div>
        );
    }
}