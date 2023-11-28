import React from "react";
import ReactDOM from "react-dom/client";
import Commons from "../Commons";
import ChatsWindow from "./ChatsWindow";
import MessagesWindow from './MessagesWindow';
import '../Styles/chat-page.css';
import { Client } from '@stomp/stompjs';
import CreateGroupChatPopUp from "./CreateGroupChatPopUp";
import UserProfilePopUp from './UserProfilePopUp';

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            displayPictureArrayBufferOfCurrentUser: [],
            currentChat: null,
            chats: [],
            displayPictureArrayBuffers: [],
            numberOfUnreadMessagesFromEachChat: [],
            readMessages: [],
            unreadMessages: [],
            createGroupChat: false,
            displayUserProfile: false,
        }

        this.getDisplayPictureArrayBufferOfCurrentUser = this.getDisplayPictureArrayBufferOfCurrentUser.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getAllGroupChats = this.getAllGroupChats.bind(this);
        this.chatClicked = this.chatClicked.bind(this);
        this.sendButtonClicked = this.sendButtonClicked.bind(this);
        this.searchChats = this.searchChats.bind(this);
        this.optionsButtonClicked = this.optionsButtonClicked.bind(this);
        this.createGroupChatPopUpClicked = this.createGroupChatPopUpClicked.bind(this);
        this.closeGroupChatPopUp = this.closeGroupChatPopUp.bind(this);
        this.logoutButtonClicked = this.logoutButtonClicked.bind(this);
        this.closeUserProfilePopUp = this.closeUserProfilePopUp.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.turnAllMessagesIntoRead = this.turnAllMessagesIntoRead.bind(this);
        this.getNumberOfUnreadMessagesFromEachChat = this.getNumberOfUnreadMessagesFromEachChat.bind(this);
        this.clearNumberOfUnreadMessagesFromChat = this.clearNumberOfUnreadMessagesFromChat.bind(this);
        this.stompClient = null;
    }

    componentDidMount() {

        // Get the currently logged-in user
        const currentUser = this.getCurrentUser();

        // Display all the chats
        this.searchChats(currentUser);

        // Getting the array buffer of the user's display picture
        this.getDisplayPictureArrayBufferOfCurrentUser(currentUser);

        // Register to the stomp endpoint and subscribe to paths
        this.registerAndSubscribe(currentUser);
    }

    getDisplayPictureArrayBufferOfCurrentUser( username ) {
        const args = [
            { 'key': 'username', 'value': username },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/get-display-picture-array-buffer', args, true, true);

        // Session timed out, the user has to log in again
        if (result == '') {
            this.props.userLoggedOut();
        }

        this.setState({ displayPictureArrayBufferOfCurrentUser: result });
    }

    getCurrentUser() {

        // Call to get the user who is currently logged in
        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/get-current-user', [], true, false);

        // Session timed out, the user has to log in again
        if (result == '') {
            this.props.userLoggedOut();
        }

        this.setState({ currentUser: result });
        return result;
    }

    clearNumberOfUnreadMessagesFromChat(chat) {

        const index = this.state.chats.indexOf(chat);

        // If the chat does not exist in the list displayed to the user, there is nothing to do
        if (index != -1) {

            const newNumberOfUnreadMessagesFromEachChat =
                this.state.numberOfUnreadMessagesFromEachChat.map(
                    (element) => element
                );
            newNumberOfUnreadMessagesFromEachChat[index] = 0;

            this.setState({ numberOfUnreadMessagesFromEachChat: newNumberOfUnreadMessagesFromEachChat });
        }
    }

    updateNumberOfUnreadMessagesFromChat(chat) {

        const index = this.state.chats.indexOf(chat);

        // If the chat does not exist in the list displayed to the user, there is nothing to do
        if (index != -1) {

            const newNumberOfUnreadMessagesFromEachChat =
                this.state.numberOfUnreadMessagesFromEachChat.map(
                    (element) => element
                );
            newNumberOfUnreadMessagesFromEachChat[index] += 1;

            this.setState({ numberOfUnreadMessagesFromEachChat: newNumberOfUnreadMessagesFromEachChat });
        }
    }

    handleMessage(message) {

        const fromUser = message.headers.fromUser;
        const toChat = message.headers.toChat;

        console.log(`Got message from ${fromUser} to ${toChat}`);

        // If the current user himself sent the message (As he is a subscriber of group chats too)
        if (fromUser == this.state.currentUser) {
            return;
        }

        // If the message is sent to a group chat
        if (toChat != this.state.currentUser) {
            this.updateNumberOfUnreadMessagesFromChat(toChat);
        }
        else {
            this.updateNumberOfUnreadMessagesFromChat(fromUser);
        }

        // If a message is received from the current chat
        // (1st clause is for the case of private chat, 2nd clause is for the case of group chats)
        if ((fromUser == this.state.currentChat && toChat == this.state.currentUser) ||
            (toChat == this.state.currentChat)) {
            this.chatClicked(this.state.currentChat, false);
        }
    }

    getAllGroupChats() {
        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/get-all-group-chats', [], true, true);
        return result;
    }

    // Register to a STOMP endpoint and subscribe to a destination path
    registerAndSubscribe(currentUser) {

        // Registering to the STOMP endpoint '/chat'
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/chat'
        });

        const groupChats = this.getAllGroupChats();
        const groupChatsLen = groupChats.length;

        this.stompClient.onConnect = (frame) => {

            // Subscribing to get messages from private chats
            this.stompClient.subscribe(`/topic/${currentUser}`, this.handleMessage);

            // Subscribing to get messages from group chats
            for (var i = 0; i < groupChatsLen; ++i) {
                this.stompClient.subscribe(`/topic/${groupChats[i]}`, this.handleMessage);
            }
        };
        this.stompClient.activate();
    }

    turnAllMessagesIntoRead(user, chat) {
        
        // When no chat is opened by the current user
        if (chat == null) {
            return;
        }

        const args = [
            { 'key': 'user', 'value': user },
            { 'key': 'chat', 'value': chat },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/turn-all-messages-into-read', args, true, true);

        // Session timed out, the user has to log in again
        if (result == null) {
            this.props.userLoggedOut();
        }

        this.clearNumberOfUnreadMessagesFromChat(chat);
    }

    // When a chat is clicked, display all the messages (read and unread)
    chatClicked(chat, markMessagesOfPreviousChatAsRead) {

        if (markMessagesOfPreviousChatAsRead) {
            // Before displaying the new messages, make sure the messages of the previous chat are marked read
            this.turnAllMessagesIntoRead(this.state.currentUser, this.state.currentChat);
        }

        const args = [
            { 'key': 'user', 'value': this.state.currentUser },
            { 'key': 'chat', 'value': chat },
        ];

        const readMessages = Commons.makeXhrRequest('GET', 'http://localhost:8080/get-read-messages', args, true, true);
        const unreadMessages = Commons.makeXhrRequest('GET', 'http://localhost:8080/get-unread-messages', args, true, true);

        // Session timed out, the user has to log in again
        if (readMessages == null || unreadMessages == null) {
            this.props.userLoggedOut();
        }
        // If the else block is absent, it might get executed sometimes when React takes some time to re-render
        else {
            this.setState({ readMessages: readMessages, unreadMessages: unreadMessages, currentChat: chat });
        }
    }

    // When the user attempts to send a message across
    sendButtonClicked() {

        const message = document.getElementsByClassName('message-holder')[0].value;
        // If the message is empty
        if (message == '') {
            return;
        }

        const args = [
            { 'key': 'from', 'value': this.state.currentUser },
            { 'key': 'chat', 'value': this.state.currentChat },
            { 'key': 'message', 'value': message },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/post-message', args, true, true);

        this.stompClient.publish({
            destination: `/topic/${this.state.currentChat}`,
            headers: {fromUser: `${this.state.currentUser}`, toChat: `${this.state.currentChat}`},
        });

        // Calling this method to re-render all the messages between the users
        this.chatClicked( this.state.currentChat, false );
    }

    getNumberOfUnreadMessagesFromEachChat(user, chats) {

        var len = chats.length;
        var chatsList = len > 0 ? chats[0] : '';

        for (var i = 1; i < len; ++i) {
            chatsList += `,${chats[i]}`;
        }

        const args = [
            { 'key': 'user', 'value': user },
            { 'key': 'chats', 'value': chatsList },
        ];

        return Commons.makeXhrRequest('GET', 'http://localhost:8080/get-number-of-unread-messages', args, true, true);
    }

    searchChats(currentUser) {

        var startString = document.getElementsByClassName('chat-search')[0].value;

        const args = [
            { 'key': 'username', 'value': currentUser },
            { 'key': 'searchString', 'value': startString },
            { 'key': 'includeGroupChats', 'value': true },
        ];

        // Call to get all chats with the provided start string
        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/get-all-chats', args, true, true);

        // Session timed out, the user has to log in again
        if (result == null) {
            this.props.userLoggedOut();
        }
        // If the else block is absent, it might get executed sometimes when React takes some time to re-render
        else {

            // Extracting names of chats and array buffers of each chat's display picture from the obtained result
            const chatNames = result.map((element) => element.name);
            const displayPictureArrayBuffers = result.map((element) => element.displayPictureArrayBuffer);

            const numberOfUnreadMessagesFromEachChat = this.getNumberOfUnreadMessagesFromEachChat(currentUser, chatNames);

            this.setState({
                chats: chatNames,
                numberOfUnreadMessagesFromEachChat: numberOfUnreadMessagesFromEachChat,
                displayPictureArrayBuffers: displayPictureArrayBuffers,
            });
        }
    }

    optionsButtonClicked() {
        this.setState({ displayUserProfile: true });
    }

    createGroupChatPopUpClicked() {
        this.setState({ createGroupChat: true });
    }

    closeGroupChatPopUp(event) {

        // If the background of the pop-up or the close-button is not clicked, there is nothing to do
        if (event.target.className != 'create-group-chat-pop-up-overlay' &&
            event.target.className != 'create-group-chat-pop-up-close-button') {
            return;
        }

        this.setState({ createGroupChat: false });
    }

    logoutButtonClicked() {

        const args = [
            { 'key': 'username', 'value': this.state.currentUser },
        ];

        // Call to remove the cookie
        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/logout', args, true, true);

        // Deactivating the stomp client
        this.stompClient.deactivate();

        // Notifying the parent component that the user logged out
        this.props.userLoggedOut();
    }

    closeUserProfilePopUp(event) {
        // If the background is not clicked
        if (event.target.className == 'logout-button' ||
            event.target.className == 'change-display-picture-button' ||
            event.target.className == 'display-picture-holder') {
            return;
        }
        this.setState({ displayUserProfile: false });
    }

    render() {
        return(
            <div className="chat-page">
                <div className="nav-bar">
                    <div className="logo"></div>
                    <div className="options-button-box">
                        <div className="options-button" onClick={ this.optionsButtonClicked }>
                            Options
                        </div>
                    </div>
                </div>
                <div className="body">
                    < ChatsWindow
                        chats={ this.state.chats }
                        displayPictureArrayBuffers={ this.state.displayPictureArrayBuffers }
                        numberOfUnreadMessagesFromEachChat={ this.state.numberOfUnreadMessagesFromEachChat }
                        userLoggedOut={ this.props.userLoggedOut }
                        chatClicked={ this.chatClicked }
                        searchChats={ this.searchChats }
                        createGroupChatPopUpClicked={ this.createGroupChatPopUpClicked }
                    />
                    < MessagesWindow
                        currentUser={ this.state.currentUser } currentChat={ this.state.currentChat }
                        readMessages={ this.state.readMessages } unreadMessages={ this.state.unreadMessages }
                        userLoggedOut={ this.props.userLoggedOut } sendButtonClicked={ this.sendButtonClicked }
                    />
                </div>

                < CreateGroupChatPopUp
                    currentUser={ this.state.currentUser }
                    createGroupChat={ this.state.createGroupChat }
                    closeGroupChatPopUp={ this.closeGroupChatPopUp }
                    userLoggedOut={ this.props.userLoggedOut }
                />

                < UserProfilePopUp
                    displayUserProfile = { this.state.displayUserProfile }
                    currentUser = { this.state.currentUser }
                    logoutButtonClicked = { this.logoutButtonClicked }
                    displayPictureArrayBufferOfCurrentUser = { this.state.displayPictureArrayBufferOfCurrentUser }
                    closeUserProfilePopUp = { this.closeUserProfilePopUp }
                />
            </div>
        )
    }
}