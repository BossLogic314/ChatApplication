import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import '../Styles/signup-page.css';
import Constants from '../Constants';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
        }

        this.storedUsername = localStorage.getItem('signup-page-username');
        if (this.storedUsername == null) {
            this.storedUsername = '';
        }
        
        this.usernameChanged = this.usernameChanged.bind(this);
        this.checkIfDataIsValid = this.checkIfDataIsValid.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
        this.loginButtonClicked = this.loginButtonClicked.bind(this);
    }

    usernameChanged(event) {
        // Storing the updated username in local storage
        localStorage.setItem('signup-page-username', event.target.value);
    }

    checkIfDataIsValid() {
        const username = document.getElementsByClassName('username')[0].value;
        const password = document.getElementsByClassName('password')[0].value;

        if (username == '') {
            this.setState({ errorMessage: Constants.USERNAME_EMPTY_MESSAGE });
            return false;
        }

        if (password == '') {
            this.setState({ errorMessage: Constants.PASSWORD_EMPTY_MESSAGE });
            return false;
        }

        if (username.length < Constants.USERNAME_MIN_LENGTH) {
            this.setState({ errorMessage: Constants.USERNAME_MIN_LENGTH_MESSAGE });
            return false;
        }

        if (username.length > Constants.USERNAME_MAX_LENGTH) {
            this.setState({ errorMessage: Constants.USERNAME_MAX_LENGTH_MESSAGE });
            return false;
        }

        if (password.length < Constants.PASSWORD_MIN_LENGTH) {
            this.setState({ errorMessage: Constants.PASSWORD_MIN_LENGTH_MESSAGE });
            return false;
        }

        if (password.length > Constants.PASSWORD_MAX_LENGTH) {
            this.setState({ errorMessage: Constants.PASSWORD_MAX_LENGTH_MESSAGE });
            return false;
        }

        const isNameUnique = Commons.isNameUnique(username);

        // Session timed out, the user has to log in again
        if (isNameUnique == null) {
            this.props.displayLoginPage();
            return false;
        }

        // If the chosen username is not unique
        if (!isNameUnique) {
            this.setState({ errorMessage: Constants.USERNAME_ALREADY_TAKEN_MESSAGE(username) });
            return false;
        }

        return true;
    }

    submitClicked() {
        const username = document.getElementsByClassName('username')[0].value;
        const password = document.getElementsByClassName('password')[0].value;

        // Check if the entered data is valid
        const isDataValid = this.checkIfDataIsValid();

        // If the data entered is invalid, there is nothing to be done
        if (!isDataValid) {
            return;
        }

        // If successfully registered
        const args = [
            { 'key': 'username', 'value': username },
            { 'key': 'password', 'value': password },
            { 'key': 'displayPictureArrayBuffer', 'value': Constants.DEFAULT_DISPLAY_PICTURE_ARRAY_BUFFER },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/register-new-user', args, true, true);

        // Displaying the login page with a success message
        this.props.displayLoginPage(true);
    }

    loginButtonClicked() {
        this.props.displayLoginPage();
    }

    render() {
        return (
            <div className="signup-page-body">
                <div className="signup">
                    <div className="title">Signup</div>
                    <input
                        className="username"
                        placeholder="Username"
                        defaultValue={ this.storedUsername }
                        onChange={ this.usernameChanged }>
                    </input>
                    <input
                        type='password'
                        className="password"
                        placeholder="Password">
                    </input>
                    <button className="submit-button" onClick={ this.submitClicked }>Submit</button>
                    <div className="already-have-an-account-message">Already have an account?</div>
                    <div className='login-button' onClick={ this.loginButtonClicked }>Log in</div>
                    <div className="signup-error-message">{ this.state.errorMessage }</div>
                </div>
            </div>
        );
    }
}