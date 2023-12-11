import React from "react";
import ReactDOM from "react-dom/client";
import Commons from "../Commons";
import ChatsWindow from "./ChatsWindow";
import MessagesWindow from './MessagesWindow';
import '../Styles/chat-page.css';
import { Client } from '@stomp/stompjs';
import CreateGroupChatPopUp from "./CreateGroupChatPopUp";
import UserProfilePopUp from './UserProfilePopUp';
import DirectVideoCall from "./DirectVideoCall";

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            displayPictureArrayBufferOfCurrentUser: [],
            currentChat: null,
            chats: [],
            displayPictureArrayBuffers: [],
            readMessages: [],
            unreadMessages: [],
            createGroupChat: false,
            displayUserProfile: false,
            displayVideoCallPage: false,
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
        this.newDisplayPictureSelected = this.newDisplayPictureSelected.bind(this);
        this.closeUserProfilePopUp = this.closeUserProfilePopUp.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.turnAllMessagesIntoRead = this.turnAllMessagesIntoRead.bind(this);
        this.getNumberOfUnreadMessagesFromEachChat = this.getNumberOfUnreadMessagesFromEachChat.bind(this);
        this.clearNumberOfUnreadMessagesFromChat = this.clearNumberOfUnreadMessagesFromChat.bind(this);
        this.updateNumberOfUnreadMessagesFromChat = this.updateNumberOfUnreadMessagesFromChat.bind(this);
        this.getLatestMessageTimeOfEachChat = this.getLatestMessageTimeOfEachChat.bind(this);
        this.updateLastMessageTimeOfChat = this.updateLastMessageTimeOfChat.bind(this);
        this.videoCallButtonClicked = this.videoCallButtonClicked.bind(this);
        this.stompClient = null;

        // Get the currently logged-in user
        const currentUser = this.getCurrentUser();
        this.state.currentUser = currentUser;
    }

    componentDidMount() {
        // Display all the chats
        this.searchChats();

        // Getting the array buffer of the user's display picture
        this.getDisplayPictureArrayBufferOfCurrentUser();

        // Register to the stomp endpoint and subscribe to paths
        this.registerAndSubscribe();
    }

    getDisplayPictureArrayBufferOfCurrentUser() {
        const args = [
            { 'key': 'username', 'value': this.state.currentUser },
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
        return result;
    }

    updateLastMessageTimeOfChat(chats, chatName, time) {
        let index = -1;
        const len = chats.length;

        for (var i = 0; i < len; ++i) {
            if (chats[i].chatName == chatName) {
                index = i;
                break;
            }
        }

        // If the chat does not exist in the list displayed to the user, there is nothing to do
        if (index == -1) {
            return;
        }

        const newChats = chats.map((element) => element);
        newChats[i].latestMessageTime = time;

        // Sorting in the descending order of the latest message
        newChats.sort(function(element1, element2) {
            return element2.latestMessageTime - element1.latestMessageTime;
        });

        return newChats;
    }

    clearNumberOfUnreadMessagesFromChat(chatName) {
        let index = -1;
        const len = this.state.chats.length;

        for (var i = 0; i < len; ++i) {
            if (this.state.chats[i].chatName == chatName) {
                index = i;
                break;
            }
        }

        // If the chat does not exist in the list displayed to the user, there is nothing to do
        if (index == -1) {
            return;
        }

        const newChats = this.state.chats.map((element) => element);
        newChats[index].numberOfUnreadMessages = 0;
        this.setState({ chats: newChats });
    }

    updateNumberOfUnreadMessagesFromChat(chats, chatName) {

        let index = -1;
        const len = chats.length;

        for (var i = 0; i < len; ++i) {
            if (chats[i].chatName == chatName) {
                index = i;
                break;
            }
        }

        // If the chat does not exist in the list displayed to the user, there is nothing to do
        if (index == -1) {
            return;
        }

        const newChats = chats.map((element) => element);
        newChats[index].numberOfUnreadMessages += 1;
        return newChats;
    }

    handleMessage(message) {
        const fromUser = message.headers.fromUser;
        const toChat = message.headers.toChat;

        const year = message.headers.year;
        const month = message.headers.month;
        const date = message.headers.date;
        const hours = message.headers.hours;
        const minutes = message.headers.minutes;
        const seconds = message.headers.seconds;
        const milliseconds = message.headers.milliseconds;

        const timeString = '' + year + month + date + hours + minutes + seconds + milliseconds;

        console.log(`Got message from ${fromUser} to ${toChat}`);

        // If the current user himself sent the message (As he is a subscriber of group chats too)
        if (fromUser == this.state.currentUser) {
            return;
        }

        // Changing the order of chats displayed and the number of unread messages of each chat
        let newChats = null;
        // If the message is sent to a group chat
        if (toChat != this.state.currentUser) {
            newChats = this.updateLastMessageTimeOfChat(this.state.chats, toChat, timeString);
            newChats = this.updateNumberOfUnreadMessagesFromChat(newChats, toChat);
        }
        else {
            newChats = this.updateLastMessageTimeOfChat(this.state.chats, fromUser, timeString);
            newChats = this.updateNumberOfUnreadMessagesFromChat(newChats, fromUser);
        }
        this.setState({ chats: newChats }, () => {

            // This block needs to be executed only after the previous state update
            // If a message is received from the current chat
            // (1st clause is for the case of private chat, 2nd clause is for the case of group chats)
            if ((fromUser == this.state.currentChat && toChat == this.state.currentUser) ||
                (toChat == this.state.currentChat)) {
                this.chatClicked(this.state.currentChat, false);
            }
        });
    }

    getAllGroupChats() {
        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/get-all-group-chats', [], true, true);
        return result;
    }

    // Register to a STOMP endpoint and subscribe to a destination path
    registerAndSubscribe() {

        // Registering to the STOMP endpoint '/chat'
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/chat'
        });

        const groupChats = this.getAllGroupChats();
        const groupChatsLen = groupChats == null ? 0 : groupChats.length;

        this.stompClient.onConnect = (frame) => {

            // Subscribing to get messages from private chats
            this.stompClient.subscribe(`/topic/${this.state.currentUser}`, this.handleMessage);

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

        // Time at which the message is being sent
        const currentTime = new Date();
        const year = '' + currentTime.getFullYear();
        let month = '' + currentTime.getMonth();
        if (month.length == 1) {
            month = '0' + month;
        }
        let date = '' + currentTime.getDate();
        if (date.length == 1) {
            date = '0' + date;
        }
        let hours = '' + currentTime.getHours();
        if (hours.length == 1) {
            hours = '0' + hours;
        }
        let minutes = '' + currentTime.getMinutes();
        if (minutes.length == 1) {
            minutes = '0' + minutes;
        }
        let seconds = '' + currentTime.getSeconds();
        if (seconds.length == 1) {
            seconds = '0' + seconds;
        }
        let milliseconds = '' + currentTime.getMilliseconds();
        if (milliseconds.length == 1) {
            milliseconds = '0' + milliseconds;
        }
        else if (milliseconds.length == 2) {
            milliseconds = '00' + milliseconds;
        }

        const args = [
            { 'key': 'from', 'value': this.state.currentUser },
            { 'key': 'chat', 'value': this.state.currentChat },
            { 'key': 'message', 'value': message },
            { 'key': 'year', 'value': year },
            { 'key': 'month', 'value': month },
            { 'key': 'date', 'value': date },
            { 'key': 'hours', 'value': hours },
            { 'key': 'minutes', 'value': minutes },
            { 'key': 'seconds', 'value': seconds },
            { 'key': 'milliseconds', 'value': milliseconds },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/post-message', args, true, true);
        // Session timed out, the user has to log in again
        if (result == null) {
            this.props.userLoggedOut();
        }

        const currentTimeString = '' + year + month + date + hours + minutes + seconds + milliseconds;
        const newChats = this.updateLastMessageTimeOfChat(this.state.chats, this.state.currentChat, currentTimeString);

        this.stompClient.publish({
            destination: `/topic/${this.state.currentChat}`,
            headers: {
                fromUser: `${this.state.currentUser}`,
                toChat: `${this.state.currentChat}`,
                year: `${year}`,
                month: `${month}`,
                date: `${date}`,
                hours: `${hours}`,
                minutes: `${minutes}`,
                seconds: `${seconds}`,
                milliseconds: `${milliseconds}`,
            },
        });

        this.setState({ chats: newChats }, () => {
            // Calling the method only after the previous state update
            // Calling this method to re-render all the messages between the users
            this.chatClicked( this.state.currentChat, true );
        });
    }

    getNumberOfUnreadMessagesFromEachChat(user, chats) {
        const len = chats.length;
        var chatsList = len > 0 ? chats[0] : '';

        for (var i = 1; i < len; ++i) {
            chatsList += `,${chats[i]}`;
        }

        const args = [
            { 'key': 'user', 'value': user },
            { 'key': 'chats', 'value': chatsList },
        ];

        return Commons.makeXhrRequest('GET', 'http://localhost:8080/get-number-of-unread-messages-from-each-chat', args, true, true);
    }

    getLatestMessageTimeOfEachChat(user, chats) {
        const len = chats.length;
        var chatsList = len > 0 ? chats[0] : '';

        for (var i = 1; i < len; ++i) {
            chatsList += `,${chats[i]}`;
        }

        const args = [
            { 'key': 'user', 'value': user },
            { 'key': 'chats', 'value': chatsList },
        ];

        return Commons.makeXhrRequest('GET', 'http://localhost:8080/get-latest-message-time-of-each-chat', args, true, true);
    }

    searchChats() {
        const startString = document.getElementsByClassName('chat-search')[0].value;

        const args = [
            { 'key': 'username', 'value': this.state.currentUser },
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

            const numberOfUnreadMessagesFromEachChat = this.getNumberOfUnreadMessagesFromEachChat(this.state.currentUser, chatNames);

            const latestMessageTimeFromEachChat = this.getLatestMessageTimeOfEachChat(this.state.currentUser, chatNames);

            let chats = chatNames.map(function(element, index) {
                return {
                    chatName: chatNames[index],
                    displayPictureArrayBuffer: displayPictureArrayBuffers[index],
                    numberOfUnreadMessages: numberOfUnreadMessagesFromEachChat[index],
                    latestMessageTime: latestMessageTimeFromEachChat[index],
                }
            });

            // Sorting in the descending order of the latest message
            chats.sort(function(element1, element2) {
                return element2.latestMessageTime - element1.latestMessageTime;
            });

            this.setState({
                chats: chats,
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

        // If the background of the pop-up is not clicked, there is nothing to do
        if (event.target.className != 'create-group-chat-pop-up-overlay') {
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

    newDisplayPictureSelected(displayPictureArrayBufferOfCurrentUser) {
        this.setState({ displayPictureArrayBufferOfCurrentUser : displayPictureArrayBufferOfCurrentUser });
    }

    closeUserProfilePopUp(event) {
        // If the background is not clicked
        if (event.target.className == 'logout-button' ||
            event.target.className == 'change-display-picture-button' ||
            event.target.className == 'display-picture-holder' ||
            event.target.className == 'select-new-display-picture-button') {
            return;
        }
        this.setState({ displayUserProfile: false });
    }

    videoCallButtonClicked(chat) {
        this.setState({ displayVideoCallPage: true, currentChat: chat });
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
                <div className="chat-page-body">
                    < ChatsWindow
                        chats={ this.state.chats }
                        userLoggedOut={ this.props.userLoggedOut }
                        chatClicked={ this.chatClicked }
                        searchChats={ this.searchChats }
                        createGroupChatPopUpClicked={ this.createGroupChatPopUpClicked }
                        videoCallButtonClicked={ this.videoCallButtonClicked }
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
                    newDisplayPictureSelected = { this.newDisplayPictureSelected }
                    userLoggedOut={ this.props.userLoggedOut }
                />

                < DirectVideoCall
                    displayVideoCallPage = { this.state.displayVideoCallPage }
                    currentUser = { this.state.currentUser }
                    currentChat = { this.state.currentChat }
                />
            </div>
        )
    }
}