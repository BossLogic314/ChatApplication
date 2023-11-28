import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import '../Styles/login-page.css';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        var username = sessionStorage.getItem("username");
        if (username == null) {
            username = '';
        }

        this.state = {
            username: username,
            password: '',
        }

        this.credentialsChanged = this.credentialsChanged.bind(this);
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

    submitClicked() {
        const args = [
            { 'key': 'username', 'value': this.state.username },
            { 'key': 'password', 'value': this.state.password },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/login', args, true, true);

        if (result != null) {
            this.props.userLoggedIn();
        }
    }

    render() {
        return (
            <div className="body">
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
                    <div className="no-account-message">Not having an account? Sign up</div>
                </div>
            </div>
        );
    }
}