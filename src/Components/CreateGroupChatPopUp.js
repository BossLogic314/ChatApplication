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
        }

        this.searchForUsers = this.searchForUsers.bind(this);
        this.suggestedParticipantClicked = this.suggestedParticipantClicked.bind(this);
        this.removeAddedParticipant = this.removeAddedParticipant.bind(this);
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
            this.props.userLoggedOut();
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

    createButtonClicked() {

        var len = this.state.addedParticipants.length;
        var addedParticipantsList = len > 0 ? this.state.addedParticipants[0] : '';

        for (var i = 1; i < len; ++i) {
            addedParticipantsList += `,${this.state.addedParticipants[i]}`;
        }

        const args = [
            { 'key': 'name', 'value': 'anish' },
            { 'key': 'participants', 'value': addedParticipantsList },
        ];

        const result = Commons.makeXhrRequest('GET', 'http://localhost:8080/create-group-chat', args, true, true);

        // Session timed out, the user has to log in again
        if (result == null) {
            this.props.userLoggedOut();
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

                    <input className='group-chat-title' placeholder='Group name'></input>
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
                        *Atmost {Constants.MAXIMUM_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT} people can be a part of a group chat
                    </div>

                </div>
            </div>
        );
    }
}