import React from 'react'
import ReactDOM from 'react-dom/client'
import Constants from '../Constants'
import '../Styles/message.css'

export default class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ this.props.currentUser == this.props.username ? 'message-sent' : 'message-received' }>

                <div className='from'>
                    { this.props.username }
                </div>

                <div className={ this.props.currentUser == this.props.username ? 'message-sent-text' : 'message-received-text' }>
                    { this.props.message }
                </div>

                <div className='message-date-time'>
                {
                    `${ this.props.hours }:${ this.props.minutes }:${ this.props.seconds }, ` +
                    `${ this.props.date }-${ this.props.month + Constants.BASE_MONTH }-${ this.props.year }`
                }
                </div>

            </div>
        )
    }
}