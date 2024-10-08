import React from 'react';
import ReactDOM from 'react-dom/client';
import Constants from '../Constants';
import Commons from "../Commons";
import '../Styles/create-group-chat-pop-up.css';

export default class CreateGroupChatPopUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            suggestedParticipants: [],
            addedParticipants: [],
            errorMessage: '',
        }

        this.searchForUsers = this.searchForUsers.bind(this);
        this.suggestedParticipantClicked = this.suggestedParticipantClicked.bind(this);
        this.removeAddedParticipant = this.removeAddedParticipant.bind(this);
        this.checkIfDataIsValid = this.checkIfDataIsValid.bind(this);
        this.createButtonClicked = this.createButtonClicked.bind(this);
        this.closeGroupChatPopUp = this.closeGroupChatPopUp.bind(this);
    }

    searchForUsers() {
        var startString = document.getElementsByClassName('group-chat-participants')[0].value;

        if (startString == '') {
            this.setState({ suggestedParticipants: [] });
            return;
        }

        // Not including group chats
        const args = [
            { 'key': 'username', 'value': this.props.currentUser },
            { 'key': 'searchString', 'value': startString },
            { 'key': 'includeGroupChats', 'value': false },
        ];

        // Call to get all chats with the provided start string
        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/get-all-other-users', args, true, true);

        // Session timed out, the user has to log in again
        if (result == null) {
            this.props.displayLoginPage();
        }
        // If the else block is absent, it might get executed sometimes when React takes some time to re-render
        else {
            this.setState({ suggestedParticipants: result });
        }
    }

    suggestedParticipantClicked(event) {

        if (this.state.addedParticipants.length >= (Constants.MAXIMUM_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT - 1)) {
            return;
        }

        const newParticipant = event.target.getAttribute('value');

        var newParticipantAlreadyExists = false;

        const len = this.state.addedParticipants.length;
        for (var i = 0; i < len; ++i) {

            // If the new participant is a duplicate addition
            if (this.state.addedParticipants[i] == newParticipant) {
                newParticipantAlreadyExists = true;
                break;
            }
        }

        // If the new participant is not a duplicate addition
        if (!newParticipantAlreadyExists) {
            var newAddedParticipants = this.state.addedParticipants.map(( element ) => element);
            newAddedParticipants.push(newParticipant);
            this.setState({ addedParticipants: newAddedParticipants });
        }

        this.setState({ suggestedParticipants: [] });
    }

    removeAddedParticipant(event) {
        const username = event.target.getAttribute('value');

        var newAddedParticipants = [];

        const len = this.state.addedParticipants.length;
        for (var i = 0; i < len; ++i) {

            // Not adding the user to be removed from the added participants
            if (this.state.addedParticipants[i] == username) {
                continue;
            }

            newAddedParticipants.push(this.state.addedParticipants[i]);
        }

        this.setState({ addedParticipants: newAddedParticipants });
    }

    checkIfDataIsValid() {
        const groupChatName = document.getElementsByClassName('group-chat-name')[0].value;
        
        if (groupChatName == '') {
            this.setState({ errorMessage: Constants.GROUP_CHAT_EMPTY_MESSAGE });
            return false;
        }

        if (this.state.addedParticipants.length == 0) {
            this.setState({ errorMessage: Constants.INVALID_NUM_OF_GROUP_CHAT_PARTICIPANTS_MESSAGE });
            return false;
        }

        if (groupChatName.length < Constants.GROUP_NAME_MIN_LENGTH) {
            this.setState({ errorMessage: Constants.GROUP_NAME_MIN_LENGTH_MESSAGE });
            return false;
        }

        if (groupChatName.length > Constants.GROUP_NAME_MAX_LENGTH) {
            this.setState({ errorMessage: Constants.GROUP_NAME_MAX_LENGTH_MESSAGE });
            return false;
        }

        const isNameUnique = Commons.isNameUnique(groupChatName);

        // Session timed out, the user has to log in again
        if (isNameUnique == null) {
            this.props.displayLoginPage();
            return false;
        }

        // If the chosen name of the group chat is not unique
        if (!isNameUnique) {
            this.setState({ errorMessage: Constants.GROUP_CHAT_NAME_ALREADY_TAKEN_MESSAGE(groupChatName) });
            return false;
        }

        return true;
    }

    createButtonClicked() {

        // Checking if the name of the group chat and the number of added participants are valid
        const isDataValid = this.checkIfDataIsValid();

        const groupChatName = document.getElementsByClassName('group-chat-name')[0].value;

        // If the entered data of the group chat is invalid, there is nothing to do
        if (!isDataValid) {
            return;
        }

        const len = this.state.addedParticipants.length;
        var addedParticipantsList = len > 0 ? this.state.addedParticipants[0] : '';

        for (var i = 1; i < len; ++i) {
            addedParticipantsList += `,${this.state.addedParticipants[i]}`;
        }

        // Adding the current user in the participants list
        addedParticipantsList += `,${this.props.currentUser}`;

        const args = [
            { 'key': 'name', 'value': groupChatName },
            { 'key': 'participants', 'value': addedParticipantsList },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/create-group-chat', args, true, true);

        // Session timed out, the user has to log in again
        if (result == null) {
            this.props.displayLoginPage();
        }
    }

    closeGroupChatPopUp(event) {
        this.props.closeGroupChatPopUp(event);
        this.setState({ suggestedParticipants: [] });
    }

    render() {

        // If the user did not click to create a new group chat
        if (!this.props.createGroupChat) {
            return <></>
        }

        var suggestedParticipants = this.state.suggestedParticipants.map( (element) =>
            <div className='suggested-participant'
                key={ element }
                value={ element }
                onClick={ this.suggestedParticipantClicked }>
                    { element }
            </div>
        );

        var addedParticipants = this.state.addedParticipants.map( (element) =>
            <div className='added-participant' key={ element } value={ element } onClick={ this.removeAddedParticipant }>
                <div className='added-participant-name' value={ element }>
                    {element}
                </div>
                <div className='added-participant-remove-button' value={ element }>X</div>
            </div>
        );

        return(
            <div className='create-group-chat-pop-up-overlay' onClick={ this.closeGroupChatPopUp }>
                <div className='create-group-chat-pop-up'>

                    <div className='create-group-chat-pop-up-header'>
                        <div className='create-group-chat-pop-up-title'>Create new group chat</div>
                    </div>

                    <input className='group-chat-name' placeholder='Group name'></input>
                    <input
                        className='group-chat-participants'
                        placeholder='Add participants here'
                        onChange={ this.searchForUsers }>
                    </input>

                    <div className='suggested-participants-box'>
                        <div className='suggested-participants'>
                            { suggestedParticipants }
                        </div>
                    </div>

                    <div className='added-participants'>
                        { addedParticipants }
                    </div>

                    <button className='create-group-chat-submit-button' onClick={ this.createButtonClicked }>
                        Create
                    </button>
                    <div className='participants-number-message'>
                        Atmost { Constants.MAX_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT } people can be a part of a group chat
                    </div>

                    <div className='group-chat-error-message'>
                        { this.state.errorMessage }
                    </div>

                </div>
            </div>
        );
    }
}