import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from '../Commons';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import SignupPage from './SignupPage';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            grantAccess: false,
            displayLoginPage: true,
            displayChatPage: false,
            displaySignupPage: false,
            displaySignupSuccessMessage: false,
        }

        this.state.displayChatPage = Commons.makeXhrRequest('GET', 'http://localhost:8080/authorize-user', [], true, true);
        this.state.displayLoginPage = !(this.state.displayChatPage);

        this.displayLoginPage = this.displayLoginPage.bind(this);
        this.displayChatPage = this.displayChatPage.bind(this);
        this.displaySignupPage = this.displaySignupPage.bind(this);
    }

    displayLoginPage(displaySignupSuccessMessage=false) {
        this.setState({
            displayLoginPage: true, displayChatPage: false, displaySignupPage: false,
            displaySignupSuccessMessage: displaySignupSuccessMessage,
        });
    }

    displayChatPage() {
        this.setState({ displayLoginPage: false, displayChatPage: true, displaySignupPage: false, });
    }

    displaySignupPage() {
        this.setState({ displayLoginPage: false, displayChatPage: false, displaySignupPage: true, });
    }

    render() {
        if (this.state.displayLoginPage) {
            return (
                <LoginPage
                    displaySignupPage={ this.displaySignupPage }
                    displayChatPage={ this.displayChatPage }
                    displaySignupSuccessMessage={ this.state.displaySignupSuccessMessage }
                />
            );
        }
        else if (this.state.displaySignupPage) {
            return (
                <SignupPage
                    displayLoginPage={ this.displayLoginPage }
                />
            );
        }
        else if (this.state.displayChatPage) {
            return (
                <ChatPage
                    displayLoginPage={this.displayLoginPage}
                />
            );
        }
    }
}