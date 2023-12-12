import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import '../Styles/login-page.css';
import Constants from '../Constants';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: '',
        }

        this.credentialsChanged = this.credentialsChanged.bind(this);
        this.checkIfDataIsValid = this.checkIfDataIsValid.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
    }

    credentialsChanged(event) {
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

        const args = [
            { 'key': 'username', 'value': username },
            { 'key': 'password', 'value': password },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/login', args, true, true);

        if (result != true) {
            this.setState({ errorMessage: Constants.INVALID_USERNAME_PASSWORD_MESSAGE });
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

        // If the authentication is successful
        this.props.displayChatPage();
    }

    render() {
        return (
            <div className="login-page-body">
                <div className="login">
                    <div className="title">Login</div>
                    <input
                        className="username"
                        placeholder="Username"
                        onChange={ this.credentialsChanged }>
                    </input>
                    <input
                        type='password'
                        className="password"
                        placeholder="Password">
                    </input>
                    <button className="submit-button" onClick={ this.submitClicked }>Submit</button>
                    <div className="no-account-message">Not having an account?</div>
                    <div className='signup-button' onClick={ this.props.displaySignupPage }>Sign up</div>
                    {
                        this.props.displaySignupSuccessMessage ?
                            <div className="signup-success-message">{ Constants.SIGNUP_SUCCESS_MESSAGE }</div> :
                            <div className="login-error-message">{ this.state.errorMessage }</div>
                    }
                </div>
            </div>
        );
    }
}