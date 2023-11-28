import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            grantAccess: false
        }

        this.state.grantAccess= Commons.makeXhrRequest('GET', 'http://localhost:8080/authorize-user', [], true, true);

        this.userLoggedIn = this.userLoggedIn.bind(this);
        this.userLoggedOut = this.userLoggedOut.bind(this);
    }

    userLoggedIn() {
        this.setState({ grantAccess: true });
    }

    userLoggedOut() {
        this.setState({ grantAccess: false });
    }

    render() {
        return this.state.grantAccess ? ( <ChatPage userLoggedOut={this.userLoggedOut} /> ) :
            ( <LoginPage userLoggedIn={this.userLoggedIn} /> );
    }
}