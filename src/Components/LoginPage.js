import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import '../Styles/login-page.css';
import Constants from '../Constants';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
        }

        var username = sessionStorage.getItem("username");
        if (username == null) {
            username = '';
        }

        this.state = {
            username: username,
            password: '',
            displaySubmitPage: false,
        }

        this.credentialsChanged = this.credentialsChanged.bind(this);
        this.checkIfDataIsValid = this.checkIfDataIsValid.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
    }

    credentialsChanged(event) {
        if (event.target.className == 'username') {
            sessionStorage.setItem('username', event.target.value);
            this.setState({ username: event.target.value });
        }
        else if (event.target.className == 'password') {
            this.setState({ password: event.target.value });
        }
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
                        value={ this.state.username }
                        onChange={ this.credentialsChanged }>
                    </input>
                    <input
                        type='password'
                        className="password"
                        placeholder="Password"
                        value={ this.state.password }
                        onChange={ this.credentialsChanged }>
                    </input>
                    <button className="submit-button" onClick={ this.submitClicked }>Submit</button>
                    <div className="no-account-message">Not having an account?</div>
                    <div className='signup-button' onClick={ this.props.displaySignupPage }>Sign up</div>
                    <div className="login-error-message">{ this.state.errorMessage }</div>
                </div>
            </div>
        );
    }
}