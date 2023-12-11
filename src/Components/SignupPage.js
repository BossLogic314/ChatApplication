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
        
        this.checkIfDataIsValid = this.checkIfDataIsValid.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
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

        // Check if the entered data is valid
        const isDataValid = this.checkIfDataIsValid();

        // If the data entered is invalid, there is nothing to be done
        if (!isDataValid) {
            return;
        }

        // If successfully registered
        // Register logic to be written here
    }

    render() {
        return (
            <div className="signup-page-body">
                <div className="signup">
                    <div className="title">Signup</div>
                    <input
                        className="username"
                        placeholder="Username">
                    </input>
                    <input
                        type='password'
                        className="password"
                        placeholder="Password">
                    </input>
                    <button className="submit-button" onClick={ this.submitClicked }>Submit</button>
                    <div className="already-have-an-account-message">Already have an account?</div>
                    <div className='login-button' onClick={ this.props.displayLoginPage }>Log in</div>
                    <div className="signup-error-message">{ this.state.errorMessage }</div>
                </div>
            </div>
        );
    }
}